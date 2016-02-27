---
title: Emil Varga
tagline: Software Engineering Musings
---
# {{ page.title }}

A personal blog hosted at [Github Pages](https://github.com/cogitor/cogitor.github.io)

</br>


<ul class="latest">
  {% for post in site.posts limit 4 %}
    <li>
      <h2>{{ post.title }}</h2>
      <p>{{ post.content | truncatewords:80}}</p>
      <a class="latest" href="{{ post.url }}">Read more</a>
    </li>
  {% endfor %}
</ul>


