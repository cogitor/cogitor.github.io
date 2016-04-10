---
title: Map and flatMap
date: 2016-04-10
tags: [scala, higher order functions, map, flatmap, for comprehension]
image: /assets/scala_code.jpg
---

I've been talking about higher order functions in my [last post](/posts/2016/03/28/a-story-of-higher-order-functions) and I've mentioned their importance in Scala, but I didn't want to digress too much. Now it's time to introduce two great examples of higher order functions, [map and flatMap](http://www.brunton-spall.co.uk/post/2011/12/02/map-map-and-flatmap-in-scala/). Map and flatMap are implemented for all collection types in the Scala collection library. They are quite significant functions in Scala, and functional programming in general, so they rightfully deserve their own post.

<!--break-->

## Map

Let's recall the foreach function mentioned in the [previous post](/posts/2016/03/28/a-story-of-higher-order-functions): `list.foreach(print)`. It is used to execute a function for each element of a collection.

Map is applying a function on each element of a collection similar to foreach, with the difference that map returns a new collection as a result. So we can think of the function supplied to map as a transformation function, which we can use to transform a collection of `N` elements into a new collection of `N` transformed elements.

{% capture my_include %}// let's introduce a list of integers
val list = List(1, 2, 4, 8)

// and use a simple increment function
def increment(value: Int): Int = value + 1

// map will call the increment function on each element of the list
// and return a new list with the incremented values
val result = list.map(increment)
// returns: List(2, 3, 5, 9)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

## FlatMap

[FlatMap](http://alvinalexander.com/scala/collection-scala-flatmap-examples-map-flatten) is similar to map, with the requirement that the elements of the collection are collections as well, and with an additional step of [flattening](http://alvinalexander.com/scala/how-to-flatten-list-lists-in-scala-with-flatten-method) the elements of a collection after executing the transformation function.

Flatten is a standard operation of converting a lists of lists into one list with all the elements. For all collection types.

{% capture my_include %}// if we have a list of lists of integers named, creatively, listOfLists
val listOfLists: List[List[Int]] = List(List(1, 2), List(4, 8), List())

// we can convert it into a list of integers which maintains all the elements of the sublists
val result: List[Int] = listOfLists.flatten
// returns: List(1, 2, 4, 8)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

Therefore, flatmap would execute the transformation function on each list element of the listOfLists and return a single flattened list with all the transformed elements.

{% capture my_include %}// if we have the same list of lists of integers
val list = List(List(1, 2), List(4, 8), List())

// let us use the previously defined increment function again
def increment(value: Int): Int = value + 1

// calling flatMap should result in the map functions executed on the sublists List(1, 2) and List(4, 8)
// followed by a flatten
val result = list.flatMap(subList => subList.map(increment))
// returns: List(2, 3, 5, 9)

// if we were to call a map instead of flatMap we would instead increments the integer values
// in the list of lists, without flattening it
// list.map(subList => subList.map(increment))
// returns: List(List(2, 3), List(4, 8), List())
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

I wouldn't dive deeper into the theory as I have only started scratching the surface myself, but I was constantly coming across the importance of the flatMap function for defining [monads](https://en.wikipedia.org/wiki/Monad_(functional_programming)) in functional programming. One thing I've learned so far is that not every construct that has a flatMap function is a monad, and that Scala has more flexible monad-like types. If interested, you can find more in [this Stack Overflow discussion](http://stackoverflow.com/questions/27750046/is-a-collection-with-flatmap-a-monad).

## More than collections

Map and flatMap functions exist in other classes as well, not just collections. A good example are container classes like [Option](http://www.scala-lang.org/api/current/index.html#scala.Option), [Future](http://www.scala-lang.org/api/current/#scala.concurrent.Future) and [Try](http://www.scala-lang.org/api/current/index.html#scala.util.Try). And we can implement them for our own classes as well.

I talked about Scala Options [before](/posts/2016/03/08/know-your-options) but I didn't mention how useful map and flatMap functions are with the Option container.

Take, for instance, the map function. Calling the map function on a Option instance (which can be either a `Some(value)` or `None`) will execute the function only if the value is an instance of `Some`. So we can use this to conditionally execute a function without handling the None instance.

{% capture my_include %}// let's re-introduce an optional result with the type of Option[Result]
// which can either have the value of Some(Result) or None
val result: Option[Result] = ...

// a doSomeWork function will only be executed if there is Some(Result)
result.map( res => res.doSomeWork() )
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

On the other hand, the flatMap function can be even more useful with Options, as flattening a list of `Option(value)` returns a list of values, with only the values which exist, filtering out the `None` values.

{% capture my_include %}// let's use a list of integers
val list = List(1, 2, 4, 8)

// and let's introduce a function that returns Option[Int]
// such that for any value smaller than or equal 3, it returns None
// otherwise it returns Some(value)
def isBigEnough(value: Int): Option[Int] = if (value > 3) Some(value) else None

// if we call this in a map function
// we will get a list of Option[Int]
val result: List[Option[Int]] = list.map(elem => isBigEnough(elem))
// it returns: List(None, None, Some(4), Some(8))

// but we can call this function in flatMap to return a filtered list of integers
// with only the existing values
val result: List[Int] = list.flatMap(elem => isBigEnough(elem))
// returns: List(4, 8)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

I will not get into [Try](http://danielwestheide.com/blog/2012/12/26/the-neophytes-guide-to-scala-part-6-error-handling-with-try.html) and [Futures](http://docs.scala-lang.org/overviews/core/futures.html) for now, as they would deserve more than just a few setences each, but I urge you to read more about both them if you're interested.

## The for comprehension

There is a nice syntactic sugar in Scala that allows us to combine map and flatMap functions in a more readable way, using [for comprehensions](http://debasishg.blogspot.ie/2008/03/monads-another-way-to-abstract.html).

We can explain it using the above example and Options:

{% capture my_include %}// let's use a list of integers from the example above
val list = List(1, 2, 4, 8)

// and let's also use the function defined in the example above
def isBigEnough(value: Int): Option[Int] = ...

// we can call the map function from the above example
list.map(elem => isBigEnough(elem))

// but we can also write the same using the for comprehension
for {
  elem <- list  // iterate through the elements
} yield isBigEnough(elem)
// returns: List(None, None, Some(4), Some(8))

// we can call the flatMap function from the above example
list.flatMap(elem => isBigEnough(elem))

// or we can write it using the for comprehension
for {
  elem <- list // iterate through the elements
  option <- isBigEnough(elem) // call isBigEnough for each element
} yield option
// returns: List(4, 8)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

So executing a statement on elements inside the for sections is equal to calling it in flatMap, and executing a statement in the yield section is equal to calling the statement in map. Let's see a more complex example combining everything we've seen before.

{% capture my_include %}// let's use the previously introduced list of lists of integers
val listOfLists = List(List(1, 2), List(4, 8), List())

// let's also use the increment function we already know
def increment(value: Int): Int = value + 1

// we can use the for comprehension to write the flatMap execution
// from the beginning of the post: list.flatMap(subList => subList.map(increment))
val transformedList = for {
  subList <- listOfLists
  converted <- subList.map(increment)
} yield converted
// transformedList = List(2, 3, 5, 9)

// and we can also call the isBigEnough function to take only the elements > 3
for {
  converted <- transformedList
  option <- isBigEnough(converted)
} yield option
// returns: List(5, 9)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

## Parallel execution

Map and flatMap allow for easily processing collections in parallel. One can simply parallelise map and flatMap executions in Scala, by utilising [parallel collections](http://docs.scala-lang.org/overviews/parallel-collections/overview.html). It's as simple as adding `.par` to a collection to convert it to a parallel collection. Calling map or flatMap on the newly created parallel collection will now execute in parallel, utilising the number of cores available in the executing machine.

It's not a surprise that the map function is the key building block of the [MapReduce](https://en.wikipedia.org/wiki/MapReduce) programming model used for batch processing enormous amount of data in parallel in Google and in [Apache Hadoop](https://en.wikipedia.org/wiki/Apache_Hadoop). And both map and flatMap are  heavily utilised in [Apache Spark](https://en.wikipedia.org/wiki/Apache_Spark) as well.