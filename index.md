---
title: Emil Varga
description: A personal blog. Posts on various topics including Scala, functional programming and writing blogs with Jekyll.
sitemap:
  lastmod: 2022-03-03
  priority: 0.8
  changefreq: 'monthly'
---

<ul class="latest">
  {% for post in site.posts limit:5 %}
    <li>
      <h1>{{ post.title }}</h1>
      {{ post.excerpt }}
      {% if post.content contains '<!--break-->' %}
        <a class="latest" href="{{ post.url }}">Read more</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>


