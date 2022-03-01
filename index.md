---
title: Emil Varga
description: A personal blog. Posts on various topics including Scala, functional programming and writing blogs with Jekyll. 
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


