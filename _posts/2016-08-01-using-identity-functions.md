---
title: Using Identity Functions
date: 2016-08-01
tags: [scala, higher order functions, map, flatmap, identity]
image: /assets/identity.jpg
layout: post
description: An Identity function is a very basic function that takes one argument and the only thing it does is return the argument value. It's important in mathematics, but is it useful in everyday programming?
---

An [Identity function](https://en.wikipedia.org/wiki/Identity_function) is a very basic function that takes one argument and the only thing it does is return the argument value. Pretty simple: `f(x) = x`. This function is important in mathematics e.g in the [Category theory](https://en.wikipedia.org/wiki/Category_theory), but is it useful in everyday programming?

<!--break-->

{% include responsive_image.html name="identity" alt="Identity" %}

As explained by [Bartosz Milewski](https://bartoszmilewski.com/2014/11/04/category-the-essence-of-composition/), the identity function is a neutral value in functional composition. Just like zero is a neutral value for addition, an identity function is a neutral value for some [higher order functions](/posts/2016/03/28/a-story-of-higher-order-functions). This means that if we pass an identity function `f(x)` into a higher order function (which as an argument expects a function that takes a single argument of type `x` and returns a value of type `x`), it would essentially have the same result as passing the value `x` into a regular function that takes an argument of type `x`.

{% capture my_include %}
// here is a higher order function (HOF) that takes an array of bytes 
// and a transformation function so that i.e. we can return the size in KBs 
// if we pass in something like (size => size / 1024)
def getSize(data: Array[Byte], transform: (Double => Double)): Double = {
    transform(data.length)
}

// and here is a simple function that takes an array of bytes 
// and just returns its length as Double
def getSize(data: Array[Byte]): Double = {
    data.length
}

// for a sample byte array
val dataArray = new Array[Byte](1024)

// we can call the HOF with converting of the size to KBs
getSize(dataArray, size => size / 1024) // returns 1

// or we can call it with just an identity function x => x
// for which, in Scala, there is a shorthand function "identity"
getSize(dataArray, x => x) // returns 1024
getSize(dataArray, identity) // returns 1024 as well

// it renders the same value as just calling
// the simple getSize function
getSize(dataArray) // returns 1024

// Of course, for this simple case we would have
// not needed a higher order function, as we could've
// just called the transformation on the result
// of the the simple getSize e.g. getSize(dataArray) / 1024
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

## Identity functions vs map and flatMap

I've written about map and flatMap in [my previous post](/posts/2016/04/10/map-and-flatmap). They are two very useful higher order functions, implemented, for instance, in the Scala collections. Let's see how they work with identity functions:

{% capture my_include %}
// if we call the map function of a collection with an identity function, 
// it returns the same collection unchanged
List(1, 5, 7).map(identity) // returns List(1, 5, 7)

// if we call a flatMap of a collection of collections with the identity function,
// it returns effectively the same result as calling .flatten
List(List(1, 2), List(3), List(4, 5)).flatMap(identity) // returns List(1, 2, 3, 4, 5)
List(List(1, 2), List(3), List(4, 5)).flatten // also returns List(1, 2, 3, 4, 5)

// but if we want a neutral function for flatMap, 
// we would need the function x => List(x)
List(List(1, 2), List(3), List(4, 5)).flatMap(x => List(x)) // returns List(List(1, 2), List(3), List(4, 5)) unchanged
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

How come the identity function is not the neutral value for flatMap? Well, to answer this, we should probably check a simpler implementation of map and flatMap, the one in the [Options](/posts/2016/03/08/know-your-options):

{% capture my_include %}
// the map function of the Options can also be called with the identity function
// and it will return the same value
Option(3).map(identity) // returns Some(3)
Some(3).map(identity) // returns Some(3)
None.map(identity) // returns None

// but the flatMap function of Options is defined as
// def flatMap[B](f: A => Option[B]): Option[B],
// so you cannot pass an identity function to it.
// you can, on the other hand, use an Option-specific neutral function
Some(3).flatMap(x => Option(x)) // returns Some(3)
None.flatMap(x => Option(x)) // returns None
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

The collections flatMap function is more flexible than the one for Options, so it allows us to pass the identity function as an argument, but it does not represent the neutral value for it. Just as the neutral value for flatMap of Options is the function `x => Option(x)`, the neutral value of the flatMap of Lists should be `x => List(x)`.

## A bit of theory

As mentioned before, the identity function is a neutral value for some higher order functions, namely for those that accept a function that takes a single argument of type `x` and return a value of type `x`. And the most notable of these functions is the map function.

The relationship between the map and identity functions is defined in the Category Theory. [Functors](https://bartoszmilewski.com/2015/01/20/functors/), which are an important abstraction in functional programming, are defined by a map function and the identity function, so that the identity function is the neutral value for the map function. There are some quite good explanations of Functors [here](http://adit.io/posts/2013-04-17-functors,_applicatives,_and_monads_in_pictures.html) and [here](http://www.russbishop.net/monoids-monads-and-functors), so I won't spend more time elaborating on them.

The relationship between the flatMap function and its neutral value, which is called the unit function, is also defined in the Category Theory, this time for [Monads](https://en.wikipedia.org/wiki/Monad_(functional_programming)).

## A more realistic use case

Although they are very simple, there are some [interesting use cases](http://benjiweber.co.uk/blog/2015/01/14/implicit-conversions-with-identity-functions/) of the identity functions. For instance, they can be useful as a default argument for transformation functions, so that if the argument is passed, the transformation would be executed.

One example is parsing and converting a JSON string into a Scala object using the [Play JSON library](https://www.playframework.com/documentation/2.5.x/ScalaJson).

Let's define a function for parsing and converting a JSON string:

{% capture my_include %}
import play.api.libs.json._
import scala.util.Try

// parse a string into an instance of type T, 
// using an implicit JSON read converter
def parse[T](string: String)(implicit reads: Reads[T]): Try[T] = {
  for {
    // parse the String into a JsValue 
    parsed <- Try(Json.parse(string))
    // validate if the JsValue can be converted into T
    // return an instance of JsResult
    validated <- Try(parsed.validate[T])
    // extract the value from JsResult to T or throw exception.
    // we use the fold method of JsResult here, which takes
    // two transformation methods - for the valid and invalid cases,
    // we throw an exception if the JSON is not valid, 
    // or just return the result (by utilising an identity function)
    converted <- Try(validated.fold(
      error => throw new Exception("Failed to convert JSON"),
      identity
    ))
  } yield converted
}

// if we define a List[Long] read converter
implicit val listReads: Reads[List[Long]] = Reads.list(Reads.LongReads)

// we can convert a JSON array into a List[Long]
parse("[5, 6, 7]").get // returns List(5, 6, 7)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

This works well in this one particular case, but what if we want to reuse this function for extracting any list of values from a JSON object, which could be in any place in different JSON objects?

We could add an optional function as an argument, so that if the function exists, it's being used to find the list in the JSON object:

{% capture my_include %}
import play.api.libs.json._
import scala.util.Try

// the pickElement argument is a function that chooses a value in the JSON tree,
// which defaults to the identity function, so that if no function is passed
// the whole JSON tree will be used
def parse[T](string: String, pickElement: JsValue => JsValue = identity)(implicit reads: Reads[T]): Try[T] = {
    for {
    parsed <- Try(Json.parse(string))

    // pick a JsValue element
    // validate if it can be converted into T
    // returns an instance of JsResult
    validated <- Try(pickElement(parsed).validate[T])
    
    converted <- Try(validated.fold(
      error => throw new Exception("Failed to convert JSON"),
      identity
    ))
  } yield converted
}

// we should use the same List[Long] read converter
implicit val listReads: Reads[List[Long]] = Reads.list(Reads.LongReads)

// we can convert a JSON array into a List[Long]
parse("[5, 6, 7]").get // returns List(5, 6, 7)

// but we can also parse a JSON array from different parts of a JSON object
parse("""{"array":[1, 2, 3]}""", value => value \ "array").get // returns List(1, 2, 5)
parse("""{"ids":[1, 2, 5]}""", value => value \ "ids").get // returns List(1, 2, 5)
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}