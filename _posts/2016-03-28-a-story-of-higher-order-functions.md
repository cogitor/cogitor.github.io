---
title: A Story Of Higher Order Functions
date: 2016-03-28
tags: [c, javascript, scala, higher order functions]
image: /assets/scala_code.jpg
layout: post
description: I find higher order functions to be one of the key properties of functional programming languages, as they enable functions to be first class values in a language. This is how I learned about them.
sitemap:
  lastmod: 2022-03-03
  priority: 0.5
  changefreq: 'yearly'
---

I find higher order functions to be one of the key properties of functional programming languages, as they enable functions to be first class values in a language. Per [definition](https://en.wikipedia.org/wiki/Higher-order_function), every function that takes functions as arguments and/or returns functions as results is a higher order function.

<!--break-->

## Function pointers in C

I first came across higher order functions while still at university, through the usage of [function pointers](http://www.cprogramming.com/tutorial/function-pointers.html) in C. I have to admit that at the time I didn’t realise the full potential of passing functions as arguments to other functions. We used function pointers for the most common use case I know of - [callback functions](https://en.wikipedia.org/wiki/Callback_(computer_programming)).

Callback functions are useful when working with asynchronously executing operations like UI events, HTTP requests etc. You can specify a function that will be called when the asynchronous execution is finished, and pass it as an argument to the asynchronous execution call. In the meantime, you can continue executing other code, without the need to block the main execution while waiting for results.

{% capture my_include %}#include <stdio.h>
#include <string.h>

// the function pointer type definition for the expected callback function
typedef int (*callback_fp)(char * result, int result_size);

// the asynchronous execution is a higher order function 
// that takes a callback function as an argument
int async_exec(char * data, int data_size, callback_fp callback) {
  ...
}

// there can be multiple implementations that match the callback function definition
int save_result(char* result, int result_size) {
 ...
}

int print_result(char* result, int result_size) {
  printf("data returned is %s\n", result);
  return 0;
}

char input[9] = "some input data";
int started = async_exec(input, strlen(input), print_result); // or save_result
if (started > 0) {
  some_other_code(..);
}
{% endcapture %}
{% include code_snippet.html class="c" code=my_include %}

Looking back, it really makes sense that such a versatile language as C has the ability to implement both [object-oriented](http://www.planetpdf.com/codecuts/pdfs/ooc.pdf) and [functional](http://blog.charlescary.com/?p=95) paradigms, even tho this would be a bit impractical. You can find quite a few articles on function pointers in C and I urge you to read more if interested (e.g. [here](http://c.learncodethehardway.org/book/ex18.html)).

On the other hand, higher order functions have been around from the dawn of functional programming so it’s not really unexpected to find them in all the usual suspects like Lisp, Haskell, Erlang, Clojure, Scala etc. 

It may come as a surprise to some, however, that JavaScript, the language people love to hate, has higher order functions as well. As for me, it's the second language in which I've encountered higher order functions.

## JavaScript functions

JavaScript has some really interesting concepts explained remarkably well by [Douglas Crockford](http://www.crockford.com/). All objects in JavaScript are essentially maps of key-value pairs, where the values can be functions as well as other [objects](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects):

{% capture my_include %}var obj = new Object();
obj.a = 1;
obj.b = 2;
obj.c = new Object(); // a nested object
obj.sum = function() { return this.a + this.b; };

obj.sum(); // result: 3


// while you can just specify the same object as a map
var obj = {
  a: 1,
  b: 2,
  c: {},
  sum: function() { return this.a + this.b; }
}

obj.sum(); // result: 3
{% endcapture %}
{% include code_snippet.html class="javascript" code=my_include %}

And essentially, functions are implemented as objects too. So one can assign key-value pairs to functions as well. But more importantly, functions can be stored as variables, used as arguments to other functions, returned from functions etc.

{% capture my_include %}// you can specify a function
function sum(a,b) { return a+b; };
sum(1, 2); // result: 3

// you can store a function as a variable
var sum = function(a, b) {  return a+b; };
sum(1, 2); // result: 3

// and you can actually specify a function like an object call
var sum = new Function("a", "b", "return a+b;");
sum(1, 2); // result: 3
{% endcapture %}
{% include code_snippet.html class="javascript" code=my_include %}

This gives JavaScript some real power when used as a functional language, which has been utilised by libraries like jQuery. Again, the most common use case is callback functions - which are essential for handling UI events in JavaScript.

{% capture my_include %}// let’s specify a simple callback function e.g. an alert box
function registerClick() {
  window.alert("callbacks are great!");
}

// next, let's take a DOM element
var link = document.getElementById("myLink");

// the DOM API specifies the addEventListener function.
// the addEventListener function is a higher order function 
// that takes a callback function as an argument
// and adds it to the event listener of the DOM element
link.addEventListener("click", registerClick);

// this would execute the alert once we click on the link
{% endcapture %}
{% include code_snippet.html class="javascript" code=my_include %}

This is normally used to add custom functionality to mouse or touch events on different areas of a web page. On the other hand, callback functions are also utilised when reading data from the server using [Ajax](https://en.wikipedia.org/wiki/Ajax_(programming)) calls:

{% capture my_include %}// let's specify a simple ajax request function
// that takes a callback function argument 
// (therefore it's a higher order function).
// if there is a valid response from the server, 
// the callback is executed with the returned data
function ajax_request(url, callback) {
  var httpRequest = new XMLHttpRequest(); // doesn't work for IE6
  httpRequest.onreadystatechange = function() {
    if (httpRequest.status === 200) callback(httpRequest.response);
  }
  httpRequest.open("GET", url);
  httpRequest.send();
}

// let's use a simple callback function
// that prints to the developer console
function response_callback(data) {
  console.log(data);
}

// finally, executing the requests should print the result in the console 
ajax_request("/", response_callback);
{% endcapture %}
{% include code_snippet.html class="javascript" code=my_include %}

All of these examples showcase higher order functions that take functions as arguments. But higher order functions can also return functions. This is pretty simple to do in JavaScript:

{% capture my_include %}// a higher order function that creates an increment function
var buildIncrementFunction = function(incrementBy) {
  return function(x) { 
   return x + incrementBy; // the body of the returned function
  };
}

// by passing different arguments one can have different
// increment functions e.g. to increment by one or any other value
var incrementByOne = buildIncrementFunction(1);
incrementByOne(2); // return: 3

var incrementByThree = buildIncrementFunction(3);
incrementByThree(2); // return: 5
{% endcapture %}
{% include code_snippet.html class="javascript" code=my_include %}

Knowing the properties of JavaScript functions, I had a déjà vu while learning Scala, because Scala functions are implemented as [objects as well](https://gleichmann.wordpress.com/2010/11/08/functional-scala-functions-as-objects-as-functions/). This is one of the key properties of the language that allows for both object-oriented and functional programming styles.

{% include responsive_image.html name="scala_code" alt="Scala code" %}

## Scala functions

As Scala functions are treated as objects, we can pass function references like any other object references as arguments into functions. It is also possible to store functions as variables and return function references from functions.

{% capture my_include %}// we can specify an increment function the usual way
def increment(value: Int): Int = value + 1

// but it is also possible to specify a function as an object,
// with the apply function containing the function body
val increment = new Function1[Int,Int] {
  // the apply function will be executed if we call e.g. increment(3)
  override def apply(value: Int): Int = value + 1
}

// the type of the increment object is Function1[Int,Int] 
// i.e. a function with one argument of type Int and a return value of type Int
// the usual shorthand notation is (Int => Int)

// we can also use a shorthand notation to define the increment function
val increment = (value: Int) => value + 1

// and just for fun, we can also use an even more cryptic notation
// where we would need to specify the function type (Int => Int) for the compiler
val increment: (Int => Int) = _ + 1 // the underscore operator is a placeholder for the argument, as the argument name hasn't been specified
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

There are many use cases of higher order functions in Scala. One of them is to execute a function for each element of a collection:

{% capture my_include %}// let's introduce a list of integers
val list = List(1,2,4,8)

// we could specify a function to print an integer value
def print(element: Int) = System.out.print(element + " ")

// collections like lists have a foreach function
// which is a nice example of higher order functions.
// we can use it to print out all the values of a list
list.foreach(print) // prints: 1 2 4 8

// of course, we don't need to specify a separate print function. 
// we can simplify things by calling the foreach function
// with an anonymous function that does the same
list.foreach(element => System.out.print(element + " ")) // prints: 1 2 4 8

// Note: the foreach function is great example of a higher order function,
// and we used printing to showcase a simle use case
// however, there are better ways to print elements of a function e.g.
// System.out.print(" ".join(list)) where we print a string value created 
// by joining all the elements of the list
{% endcapture %}
{% include code_snippet.html class="scala" code=my_include %}

**Edit**: Some other, more notable, higher order functions would be [map and flatMap](http://www.brunton-spall.co.uk/post/2011/12/02/map-map-and-flatmap-in-scala/). There is a lot written about them already and I've decided to dedicate them a [separate blog post](/posts/2016/04/10/map-and-flatmap) as well.

Higher order functions are an integral part of Scala, baked into some of the most important features. I believe they are essential for understanding not only Scala, but functional programming in general. They can be utilised to implement an asynchronous programming model (like what we've seen with callback functions in C and JavaScript), as well as used for many other use cases.

Together with other functional paradigms, they can improve code reliability and parallelizability by enabling you to write a more stateless and side-effect-free code.