---
layout: default
title: Certificazioni ed Autodidatta
---

<div class="hero" style="border-bottom:none; padding-bottom:0;">
    <h1>Learning Path</h1>
    <p>Qui c'è quello che studio in autonomia.</p>
</div>

<div class="container" style="max-width:1000px; margin:0 auto; padding-bottom:64px;">

    <!-- 4. Completed -->
    <h2 style="margin-top:64px; margin-bottom:32px;">Certificazioni Completate</h2>
    <div class="bento-card" style="padding:0; background:#f5f5f7;">
        <ul style="list-style:none; padding:0; margin:0;">
            {% for cert in site.data.studying.certifications.completed %}
            <li style="padding:20px 24px; border-bottom:1px solid rgba(0,0,0,0.05); display:flex; align-items:center; gap:12px;">
                <i class="fas fa-check-circle" style="color:#34c759;"></i>
                <span style="font-size:15px; color:var(--text-primary);">{{ cert.name }}</span>
            </li>
            {% endfor %}
        </ul>
    </div>

    <!-- 1. In Progress -->
    <h2 style="margin-bottom:32px;">In Corso</h2>
    <div class="grid-2">
        {% for cert in site.data.studying.certifications.in_progress %}
        <div class="bento-card" style="padding:24px;">
            <div style="display:flex; justify-content:space-between; align-items:start; margin-bottom:16px;">
                <h3 style="font-size:18px; margin:0; line-height:1.4;">{{ cert.name }}</h3>
                <span style="font-size:13px; font-weight:600; color:var(--accent); background:rgba(0,113,227,0.1); padding:4px 8px; border-radius:6px;">{{ cert.progress }}%</span>
            </div>
            <div class="progress-container">
                <div class="progress-bar" style="width: {{ cert.progress }}%;"></div>
            </div>
        </div>
        {% endfor %}
    </div>

    <!-- 2. Tools & Skills -->
    <h2 style="margin-top:64px; margin-bottom:32px;">Strumenti</h2>
    <div class="bento-card" style="padding:0;">
        <details class="tools-toggle">
            <summary class="tools-summary">
                <span class="summary-text">Visualizza lista completa</span>
                <span class="hover-text">Tocca per espandere</span>
                <i class="fas fa-chevron-down summary-icon"></i>
            </summary>
            <ul class="rich-list">
                {% for tool in site.data.studying.tools %}
                <li class="rich-list-item">
                    <i class="{{ tool.icon }} rich-list-icon"></i>
                    <div class="rich-list-content">
                        <span class="rich-list-title">{{ tool.name }}</span>
                        <span class="rich-list-desc">{{ tool.description }}</span>
                    </div>
                </li>
                {% endfor %}
            </ul>
            <div class="tools-close-area" onclick="this.parentElement.removeAttribute('open')">
                <span style="font-size:14px; font-weight:600; color:var(--accent);">Chiudi lista</span>
                <i class="fas fa-chevron-up" style="color:var(--accent);"></i>
            </div>
        </details>
    </div>

    <!-- 3. Available Certifications -->
    <h2 style="margin-top:64px; margin-bottom:32px;">Certificazioni in Attesa</h2>
    <div class="bento-card" style="padding:0;">
        <ul style="list-style:none; padding:0; margin:0;">
            {% for cert in site.data.studying.certifications.available %}
            <li style="padding:20px 24px; border-bottom:1px solid rgba(0,0,0,0.05); display:flex; align-items:center; gap:12px;">
                <i class="fas fa-certificate" style="color:#ffcc00;"></i>
                <span style="font-size:15px; color:var(--text-primary);">{{ cert.name }}</span>
            </li>
            {% endfor %}
        </ul>
    </div>



</div>