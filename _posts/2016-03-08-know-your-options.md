---
title: Know Your Options
date: 2016-03-08
tags: [java, scala, options]
---

Are you having troubles with Null Pointer Exceptions (NPEs)? Do you find it cumbersome to defend against them every few lines of code? If you're not doing it already, you should probably try using Optionals in Java. Also known as Options in Scala.

<!--break-->

## What are Options?

It's a concept that originates from the [type theory](https://en.wikipedia.org/wiki/Type_theory) in mathematics, and also known in various languages as Nullable or Maybe types. You can basically think of them as collections like a set but with either exactly one value or none - `[ value ]` or `[ ]`.

We will start with a use case in Java and the native [java.util.Optionals in Java 8](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html). There are other versions widely available such as [Guava Optionals](https://google.github.io/guava/releases/19.0/api/docs/com/google/common/base/Optional.html) that existed for a while longer, and also available for older versions of Java - but we will stick to the java.util version here.

Say we have a defined interface we are supplied with, which returns some result value. But it may return a null value if no results.

{% capture my_include %}interface Calculation {
  Result getResult();
}
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

If we were to just naively call this in our code, it could result it an exception:

{% capture my_include %}Result result = calculation.getResult();
result.doSomeWork(); // are you sure this is not null?
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

To make sure we are safe we would need to write some extra code, which is not obvious from the interface declaration:

{% capture my_include %}Result result = calculation.getResult();
if (result == null) {
  // log and raise metrics
  // or throw an exception
} else {
  result.doSomeWork();
}
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

This can easily escalate as the system grows, I've seen a few examples where it feels like most of the code is there to catch NPEs. But don't get me wrong, it is still better than a missed edge case which breaks the system in unforeseen scenarios.

Now let's change our interface to use java.util.Optional:

{% capture my_include %}interface Calculation {
  Optional<Result> getResult();
}
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

This defines a clear expectation that the returned value may not exist, and if it does, it is of type Result.
It's also quite simple to wrap the implementation code into Optionals:

{% capture my_include %}class SomeCalculation implements Calculation {
  ...
  Optional<Result> getResult() {
    if (hasResult) {
      return Optional.of(new Result());
    } else {
      return Optional.empty();
    }
  }
}
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

So now when we're calling the new getResult() method the picture is a bit clearer and it's much harder to forget to defend against NPEs:

{% capture my_include %}Optional<Result> result = calculation.getResult();
if (result.isPresent()) {
  result.get().doSomeWork();
} else {
  // log and raise metrics
  // or throw an exception
}
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

Of course this is still verbose. But luckily there are some nice helper methods that can make your code more readable:

{% capture my_include %}// return a result or throw an exception
Result result = calculation
  .getResult()
  .orElseThrow(new MissingResultException());

or

// return a result or a default value
Result result = calculation
  .getResult()
  .orElse(new DefaultResult());
{% endcapture %}
{% include code_snippet.html class="java" code=my_include %}

## How is this done in Scala?

Scala has [Options](http://www.scala-lang.org/api/current/#scala.Option) built in most if not all libraries, so it's practically unavoidable to use them. A big thumbs up for Scala! There are some small differences in the syntax compared to Java Optionals:

{% capture my_include %}def getResult: Option[Result] = {
  if (hasResult) {
    Option(new Result()) // or Some(new Result())
  } else {
    Option.empty // or None
  }
}

...

val result: Option[Result] = calculation.getResult
if (result.nonEmpty) {
  result.get.doSomeWork()
} else {
  // log and raise metrics
  // or throw an exception
}
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

In the Scala implementation there are actually two types that inherit from Option: Some and None. Calling Option(value) is actually checking if the value is null and instantiating Some(value). So it's slightly safer to use Option instead of Some, but in this particular case it wouldn't make a difference.

Edit: As mentioned in the comments, Scala offers [many more idiomatic ways](http://blog.originate.com/blog/2014/06/15/idiomatic-scala-your-options-do-not-match/) of using Options, and I recommend you to explore them. For instance, one way to write the same code as above would be using the fold method:

{% capture my_include %}// let's extract the handling of the missing value for better readability
def handleMissingValue() {
  // log and raise metrics
  // or throw an exception
}

val result: Option[Result] = calculation.getResult
// the first argument is an expression that evaluates in case of None (usually a default value)
// the second argument is an expression that should be executed if there is a value
result.fold( handleMissingValue() )( res => res.doSomeWork() )
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

## When should I not use Options?

There is a definite (albeit mostly small) overhead in wrapping your results with an extra object instance. In memory footprint, immediate performance hits and more work for the Garbage Collector. So if your work is really performance critical, it always makes sense to keep things lean - but for most use cases I suggest using your Options.
