---
layout: page
title: Blog Section
permalink: /blog/
---

![Blog Cover Image]({{ site.baseurl }}/images/illustrations/blog.svg)

Welcome to the Blog section. Here you will find insightful articles that are aimed for your organizational learning & development initiatives and transformations.

<div class="container mt-4">
  <form class="d-flex mb-4" id="blogControls">
    <div class="input-group">
      <input type="text" class="form-control" placeholder="Search articles..." id="searchInput">
      <select class="form-select" style="max-width: 150px;" id="sortSelect">
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  </form>

  <div id="postsContainer">
      {%- if site.blog.size > 0 -%}
        {% for post in site.blog %}
          <div class="post-item" data-date="{{ post.date | date: '%s' }}" data-keywords="{{ post.title | downcase }} {{ post.excerpt | strip_html | downcase }}">
            <a href="{{ post.url | relative_url }}" class="text-decoration-none">
              <h3 class="post-title">{{ post.title | escape }}</h3>
            </a>
            <div class="post-meta">
              <i class="far fa-calendar-alt me-1"></i>
              {{ post.date | date: "%B %d, %Y" }}
            </div>
            {%- if post.excerpt -%}
              <p class="post-excerpt">{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
            {%- endif -%}
          </div>
        {% endfor %}
      {%- else -%}
        <div class="text-center text-muted py-5">
          <i class="fas fa-inbox fa-3x mb-3"></i>
          <p>No posts available yet.</p>
        </div>
      {%- endif -%}
  </div>

  <!-- Pagination -->
  <nav aria-label="Blog pagination" class="mt-4">
    <ul class="pagination justify-content-center" id="pagination"></ul>
  </nav>
  <p id="postCount" class="text-center text-muted"></p>
</div>