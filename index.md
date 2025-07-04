---
title: Emil Varga - A personal blog.
description: Posts on various topics including Scala, functional programming and writing blogs with Jekyll.
sitemap:
  lastmod: 2022-03-06
  priority: 0.8
  changefreq: 'monthly'
---

<ul class="latest">
  {% for post in site.posts limit:5 %}
    <li>
      <h1 id="{{ post.date | date: '%s' }}">{{ post.title }}</h1>
      {{ post.excerpt }}
      {% if post.content contains '<!--break-->' %}
        <a class="latest" href="{{ post.url }}" aria-labelledby="{{ post.date | date: '%s' }}">Read more</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>


