---
title: Let's Get It Working!
date: 2016-02-27
tags: [jekyll, github pages]
layout: post
description: Here we go! Coming late to the game but I'm finally diving into setting up a website on GitHub Pages. It's super fun and pretty simple to set up.
sitemap:
  lastmod: 2022-03-03
  priority: 0.3
  changefreq: 'yearly'
---

Here we go! Coming late to the game, but I'm finally diving into setting up a website on GitHub Pages. It's super fun and pretty simple to set up.

The [GitHub Pages documentation](https://pages.github.com/) is really well written, as is [Jekyll](http://jekyllrb.com/). Reading up on a couple of guides like [Jonathan McGlone's](http://jmcglone.com/guides/github-pages/)... So far, so good.

<!--break-->

I would like to start by building a simple, minimalistic web page using a static site generator. As in, Simple is Better.

I like the ideas behind [Jekyll Bootstrap](http://jekyllbootstrap.com/), and I can see there are definitely [a few alternatives out there](https://www.staticgen.com/), but I'm thinking of experimenting with the basics first as a learning experience. So, pure Jekyll it is.

It's fun to see a basic "Hello World" rendering as soon as you have an *index.html* and *_config.yml*.
By adding a 404 page and a CSS file, you can start adding some style and content.

Having at least one default layout file allows you to keep the reusable HTML components separated in a single file. Besides being highly reusable, this can be utilized to try and write content pages completely in [Markdown](http://kramdown.gettalong.org/index.html) — if you fancy Markdown. I haven't made up my mind about it yet.

### An example Markdown file: index.md

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

The include tags you can see in the example are pretty handy too — you can separate common snippets into their own files and maintain structure and readability.

Now I'm off to build [this website](https://github.com/cogitor/cogitor.github.io)...
