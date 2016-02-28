---
title: Emil Varga
---
# {{ page.title }}

A personal blog hosted at [GitHub Pages](https://github.com/cogitor/cogitor.github.io)

<ul class="latest">
  {% for post in site.posts limit 5 %}
    <li>
      <h2>{{ post.title }}</h2>
      {{ post.content | split:'<!--break-->' | first }}
      {% if post.content contains '<!--break-->' %}
        <a class="latest" href="{{ post.url }}">Read more</a>
      {% endif %}
    </li>
  {% endfor %}
</ul>


