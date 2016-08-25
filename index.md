---
title: Emil Varga
description: Emil Varga - A personal blog
---

<ul class="latest">
  {% for post in site.posts limit:5 %}
    <li>
      <h1>{{ post.title }}</h1>
      <div class="excerpt">
        {% if post.show_thumbnail and post.image %}
          <img src="{{post.image}}">
        {% endif %}
        <div class="content">{{ post.excerpt }}</div>
        {% if post.content contains '<!--break-->' %}
          <a class="latest" href="{{ post.url }}">Read more</a>
        {% endif %}
      </div>
    </li>
  {% endfor %}
</ul>


