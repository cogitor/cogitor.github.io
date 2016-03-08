---
title: Know Your Options
date: 2016-03-08
tags: [java, scala, options]
---

Are you having troubles with Null Pointer Exceptions (NPEs)? Do you find it cumbersome to defend against them every few lines of code? If you're not doing it already, you should probably try using Optionals in Java. Also known as Options in Scala.

<!--break-->

## What are Options?

It's a concept that originates from the [type theory](https://en.wikipedia.org/wiki/Type_theory) in mathematics, and also known in various languages as Nullable or Maybe types. You can basically think of them as collections like a set but with either exactly one value or none - <i>[ value ]</i> or <i>[ ]</i>.

We will start with a use case in Java and the native java.util.Optionals in Java 8. There are other versions widely available such as [Guava Optionals](https://google.github.io/guava/releases/19.0/api/docs/com/google/common/base/Optional.html) that existed for a while longer, and also available for older versions of Java - but we will stick to the java.util version here.

Say we have a defined interface we are supplied with, which returns some result value. But it may return a null value if no results.

<pre><code class="java">{% capture my_include %}
interface Calculation {
  Result getResult();
}
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

If we were to just naively call this in our code, it could result it an exception:

<pre><code class="java">{% capture my_include %}
Result result = calculation.getResult();
result.doSomeWork(); // are you sure this is not null?
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

To make sure we are safe we would need to write some extra code, which is not obvious from the interface declaration:

<pre><code class="java">{% capture my_include %}
Result result = calculation.getResult();
if (result == null) {
  // log and raise metrics
  // or throw an exception
} else {
  result.doSomeWork();
}
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

This can easily escalate as the system grows, I've seen a few examples where it feels like most of the code is there to catch NPEs. But don't get me wrong, it is still better than a missed edge case which breaks the system in unforeseen scenarios.

Now let's change our interface to use java.util.Optional:

<pre><code class="java">{% capture my_include %}
interface Calculation {
  Optional<Result> getResult();
}
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

This defines a clear expectation that the returned value may not exist, and if it does, it is of type Result.
It's also quite simple to wrap the implementation code into Optionals:

<pre><code class="java">{% capture my_include %}
class SomeCalculation implements Calculation {
  ...
  Optional<Result> getResult() {
    if (hasResult) {
      return Optional.of(new Result());
    } else {
      return Optional.empty();
    }
  }
}
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

So now when we're calling the new getResult() method the picture is a bit clearer and it's much harder to forget to defend against NPEs:

<pre><code class="java">{% capture my_include %}
Optional<Result> result = calculation.getResult();
if (result.isPresent()) {
  result.get().doSomeWork();
} else {
  // log and raise metrics
  // or throw an exception
}
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

Of course this is still verbose. But luckily there are some nice helper methods that can make your code more readable:

<pre><code class="java">{% capture my_include %}
// return a result or throw an exception
Result result = calculation
  .getResult()
  .orElseThrow(new MissingResultException());

or

// return a result or a default value
Result result = calculation
  .getResult()
  .orElse(new DefaultResult());
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

## How is this done in Scala?

Scala had Options built in most if not all libraries, so it's practically unavoidable to use them. A big thumbs up for Scala! There are some small differences in the syntax compared to Java Optionals:

<pre><code class="scala">{% capture my_include %}
def getResult: Option[Result] = {
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
{% endcapture %}{{ my_include | xml_escape }}</code></pre>

In the Scala implementation there are actually two types that inherit from Option: Some and None. Calling Option(value) is actually checking if the value is null and instantiating Some(value). So it's more less a matter of style if you prefer calling the Option methods or directly instantiating Some and None.

## When should I not use Options?

There is a definite (albeit mostly small) overhead in wrapping your results with an extra object instance. In memory footprint, immediate performance hits and more work for the Garbage Collector. So if your work is really performance critical, it always makes sense to keep things lean - but for most use cases I suggest using your Options.
