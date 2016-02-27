---
title: Let's get it working!
date: 2016-02-27
tags: [jekyll, github-pages]
---

Here we go! Coming late to the game but I'm finally diving into setting up a website on Github Pages. It's super fun and pretty simple to set up.

The [Github Pages documentation](https://pages.github.com/) is a really well written, the [Jenkyll](http://jekyllrb.com/) too. Reading up on a couple of guides like [Jonathan McGlone's](http://jmcglone.com/guides/github-pages/).. So far so good.

I would like to start by building a simple, minimalistic web page usic a static site generator. As in Simple is Better. 

I like the ideas of the [Jekyll Bootstrap](http://jekyllbootstrap.com/), and I can see there are definitelly [a few alternatives out there](https://www.staticgen.com/) but I'm thinking of experimenting with the basics first as a learing experience. So, pure Jenkyll it is.

It's fun to see a basic "Hello World" rendering as soon as you have an index.html and _config.yaml.
With adding a 404 page and a css file, one can start adding some style and content. 

Having at least one default layout file allows you to keep the reusable html components separated in one single file. Beside being highly reusable, this can be utilised to try and write content pages completely in markdown. If you fancy markdown. I didn't make up my mind about it yet.

### An example layout file: default.html

```
<!DOCTYPE html>
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
</head>
```

### An example markdown file: index.md

```
---
title: My Website
layout: default
---
{{"{{ page.title "}}}}