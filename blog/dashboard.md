---
layout: blog
title: "Dashboard"
permalink: /feed/
---

<div class="topic-selector">
  {% for topic in site.data.topics %}
    <button class="topic-button" data-topic="{{ topic.id }}">
      {{ topic.emoji }} {{ topic.name }}
    </button>
  {% endfor %}
</div>

<div class="feeds-container">
  {% for topic in site.data.topics %}
    <div class="feed-wrapper" id="feed-{{ topic.id }}" style="display: none;">
      {% include custom-feed.html topic=topic.id %}
    </div>
  {% endfor %}
</div>