---
title: Let's Get It Working!
date: 2016-02-27
tags: [jekyll, github pages]
layout: post
---

Here we go! Coming late to the game but I'm finally diving into setting up a website on Github Pages. It's super fun and pretty simple to set up.

The [Github Pages documentation](https://pages.github.com/) is a really well written, the [Jekyll](http://jekyllrb.com/) too. Reading up on a couple of guides like [Jonathan McGlone's](http://jmcglone.com/guides/github-pages/).. So far so good.

<!--break-->

I would like to start by building a simple, minimalistic web page using a static site generator. As in Simple is Better. 

I like the ideas of the [Jekyll Bootstrap](http://jekyllbootstrap.com/), and I can see there are definitely [a few alternatives out there](https://www.staticgen.com/) but I'm thinking of experimenting with the basics first as a learning experience. So, pure Jekyll it is.

It's fun to see a basic "Hello World" rendering as soon as you have an *index.html* and *_config.yaml*.
With adding a 404 page and a css file, one can start adding some style and content.

Having at least one default layout file allows you to keep the reusable html components separated in one single file. Beside being highly reusable, this can be utilised to try and write content pages completely in [markdown](http://kramdown.gettalong.org/index.html). If you fancy markdown. I didn't make up my mind about it yet.

### An example markdown file: index.md

{% capture my_include %}---
title: My Website
layout: default
---
{{"{{ page.title "}}}}
{% endcapture %}
{% include code_snippet.html class="xml" code=my_include %}


### An example layout file: default.html

{% capture my_include %}<!DOCTYPE html>
<html>
  {{"{% include head.html "}}%}
  <body>
    <div class="container">
      <div class="header">
        {{"{% include header.html "}}%}
      </div>
      <div class="body">
        {{"{{ content "}}}} <!-- the content generated from the markup file -->
      </div>
      <div class="footer">
        {{"{% include footer.html "}}%}
      </div>
    </div>
  </body>
</html>
{% endcapture %}
{% include code_snippet.html class="html" code=my_include %}

The include tags you can see in the example are pretty handy too - you can separate common snippets into their own files and maintain structure and readability.

Now I'm off to build [this website](https://github.com/cogitor/cogitor.github.io)..
