---
title: Emil Varga - Software Engineering Musings
---
# {{ page.title }}

<ul class="latest">
  {% for post in site.posts limit 4 %}
    <li>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content | truncatewords:80}}</p>
      <a class="latest" href="{{ post.url }}">Read more</a>
    </li>
  {% endfor %}
</ul>


