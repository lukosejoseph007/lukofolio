---
layout: page
title: Blog Section
permalink: /blog/
---

![Blog Cover Image]({{ site.baseurl }}/images/illustrations/blog.svg)

Welcome to the Blog section. Here you will find insightful articles that are aimed for your organizational learning & development initiatives and transformations.

{% assign sorted_blogs = site.blog   sort: 'date' | reverse %}
{% for blog in sorted_blogs %}
<div class="post">
  <h2><a href="{{ site.baseurl }}{{ blog.url }}">{{ blog.title }}</a></h2>
  {% if blog.author %}
    <p class="post-meta">By {{ blog.author }} • {{ blog.date | date: "%B %d, %Y" }}</p>
  {% endif %}
  {{ blog.excerpt }}
</div>
{% endfor %}