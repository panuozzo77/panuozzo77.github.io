---
layout: blog
title: "Il mio Hub"
permalink: /feed/
---

<div class="dashboard-grid">
  <div class="col">
    {% include custom-feed.html topic="leetcode" %}
  </div>

  <div class="col">
    {% include custom-feed.html topic="updates" %}
  </div>
</div>

<style>
  .dashboard-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
</style>