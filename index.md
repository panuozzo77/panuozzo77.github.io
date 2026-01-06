---
layout: default
title: Landing Page
---

<div class="bento-grid">
    
    <!-- 1. Profile Card (Large) -->
    <div class="bento-card col-span-2 row-span-2 profile-card">
        <img src="{{ '/assets/img/propic/myself.jpg' | relative_url }}" alt="Cristian Porzio" class="profile-image">
        <div class="profile-info">
            <!--<div class="status-badge"><div class="status-dot"></div>Open to Work</div>-->
            <h1>Cristian Porzio</h1>
            <p>Software Developer nato nel 2002. Appassionato di Machine Learning, Ingegneria del Software e Design Pattern.</p>
            <div style="margin-top: 24px; display: flex; align-items: center; gap: 16px;">
                <a href="mailto:c.porzio02@gmail.com" class="btn-primary" style="background:#1d1d1f; color:white; padding: 12px 24px; border-radius: 100px;">Contattami</a>
                <div style="display: flex; gap: 16px;">
                    <a href="https://github.com/panuozzo77" style="color:var(--text-primary); font-size: 28px; transition: color 0.2s;"><i class="fab fa-github"></i></a>
                    <a href="https://www.linkedin.com/in/cristian-porzio/" style="color:#0077b5; font-size: 28px; transition: color 0.2s;"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
        </div>
    </div>

    <!-- 2. Bio / Story (New) -->
    <div class="bento-card col-span-2 row-span-1">
        <h3 class="card-title">Chi Sono</h3>
        <p class="card-desc" style="-webkit-line-clamp: unset;">
            Coltivo la passione per l'informatica fin dall'età di 14 anni. Il mio percorso accademico e i miei progetti personali si sono concentrati su aree chiave come il <strong>Machine Learning</strong>, l'<strong>Ingegneria del Software</strong> e la <strong>Programmazione Concorrente</strong>.
            <br><br>
            Sempre alla ricerca di nuove sfide per applicare od ampliare le mie conoscenze e crescere professionalmente.
        </p>
    </div>

    <!-- 3. Employment (New) -->
    <a href="https://www.comune.roma.it/web/it/scheda-servizi.page?contentId=INF765005" class="bento-card col-span-2 row-span-2" style="background:#fff;">
        <div class="card-content">
            <h3 class="card-subtitle" style="color:#ff3b30">IMPIEGO ATTUALE (da Dic 2025)</h3>
            <h2 class="card-title">SIS - Roma Capitale</h2>
            <p class="card-subtitle" style="margin-bottom: 8px; font-weight: 600;">Java BackEnd Developer</p>
            <p class="card-desc">Sistema informativo del sottosuolo per la gestione delle pratiche amministrative e delle attività di manutenzione e supporto a cittadini e imprese, inerenti il rilascio di concessioni di suolo per l’esecuzione di scavi.</p>
            <div class="tech-stack">
                <span class="tech-tag">Java Spring</span>
                <span class="tech-tag">Hibernate</span>
                <span class="tech-tag">JSPX</span>
                <span class="tech-tag">Legacy MVC</span>
                <span class="tech-tag">MySQL</span>
                <span class="tech-tag">Git Flow</span>
            </div>
        </div>
    </a>

    <!-- 3. Featured Project (Thesis) -->
    <a href="https://github.com/panuozzo77/internship-book-recommending-system/blob/main/Tesi_Cristian_Porzio.pdf" class="bento-card col-span-2 row-span-2" style="background: #fff;">
        <div class="card-content">
            <h3 class="card-subtitle" style="color:#0071e3">TESI DI LAUREA (2025)</h3>
            <h2 class="card-title">Data Enrichment & RecSys</h2>
            <p class="card-desc">Progettazione e implementazione di un'architettura modulare per l'arricchimento di dataset librari e di un motore di raccomandazione ibrido basato su ricerca vettoriale.</p>
            <div class="tech-stack">
                <span class="tech-tag">Python</span>
                <span class="tech-tag">Machine Learning</span>
                <span class="tech-tag">Vector Search</span>
            </div>
        </div>
    </a>

    <!-- 5. Skills / Tech Stack -->
    <div class="bento-card col-span-2 row-span-1">
        <h3 class="card-title">Competenze Tecniche</h3>
        <div class="tech-stack" style="margin-top:16px;">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">Java</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">C/C++</span>
            <span class="tech-tag">Spring Boot</span>
            <span class="tech-tag">SciKit-Learn</span>
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">SQL</span>
            <span class="tech-tag">Git</span>
            <span class="tech-tag">Agile/TDD</span>
        </div>
    </div>

    <!-- 6. Teaching / Sharing (New) -->
    <div class="bento-card col-span-2 row-span-1">
        <h3 class="card-title">Condivisione</h3>
        <p class="card-desc">Credo fortemente nella condivisione del sapere ed all'accesso gratuito alle conoscenze. Ho raccolto appunti, esami ed esercizi in repository pubbliche.</p>
        <div style="margin-top:16px; display:flex; gap:12px; flex-wrap:wrap;">
            <a href="https://github.com/panuozzo77/AdvancedProgramming" class="tag">Prog. Avanzata</a>
            <a href="https://github.com/panuozzo77/DistributedProgramming" class="tag">Prog. Distribuita</a>
            <a href="https://github.com/panuozzo77/ObjectOrientedProgramming" class="tag">OOP</a>
        </div>
    </div>

    <!-- 7. Studying (New) -->
    <a href="{{ '/studying' | relative_url }}" class="bento-card col-span-2 row-span-1" style="background:#f0f0f5;">
        <div style="display:flex; align-items:center; justify-content:space-between;">
            <div>
                <h3 class="card-title">Cosa sto studiando</h3>
                <p class="card-desc">I miei percorsi di studio attuali e certificazioni.</p>
            </div>
            <i class="fas fa-graduation-cap" style="font-size:32px; color:#5856d6;"></i>
        </div>
    </a>

    <!-- 8. Projects Grid -->
    <a href="https://github.com/pastore99/TalkAId" class="bento-card col-span-1 row-span-1">
        <h2 class="card-title">TalkAid</h2>
        <p class="card-desc">Supporto logopedico remoto.</p>
        <div class="tech-stack">
            <span class="tech-tag">Java</span>
            <span class="tech-tag">Azure AI</span>
        </div>
    </a>

    <a href="https://github.com/panuozzo77/NibInk" class="bento-card col-span-1 row-span-1">
        <h2 class="card-title">NibInk</h2>
        <p class="card-desc">E-commerce stilografiche MVC.</p>
        <div class="tech-stack">
            <span class="tech-tag">JSP</span>
            <span class="tech-tag">MySQL</span>
        </div>
    </a>

    <a href="https://github.com/r-monti/AIvsHuman/tree/main" class="bento-card col-span-2 row-span-1">
        <h2 class="card-title">AIvsHuman</h2>
        <p class="card-desc">Rilevamento testo generato da IA.</p>
        <div class="tech-stack">
            <span class="tech-tag">Python</span>
            <span class="tech-tag">SciKit-Learn</span>
        </div>
    </a>

    <!-- 9. Hobbies (New) -->
    <div class="bento-card col-span-2 row-span-1">
        <h3 class="card-title">Hobby</h3>
        <ul class="card-list">
            <li>🖋️ Scrivo con stilografiche</li>
            <li>📚 Leggo principalmente sci-fi</li>
            <li>🃏 Gioco a carte e videogiochi singleplayer</li>
            <li>🌱 Coltivo piantine ed alberelli</li>
            <li>👃 Appassionato di profumi (Prada Luna Rossa Black)</li>
            <li>💈 Appassionato rasatura tradizionale, rasoi di sicurezza</li>
        </ul>
    </div>

    <!-- 10. Thoughts (New) -->
    <div class="bento-card col-span-2 row-span-1" style="background:#1d1d1f; color:white;">
        <h3 class="card-title" style="color:white;">Pensieri</h3>
        <ul class="card-list">
            <li>"Le arti sono una delle poche cose per cui vale la pena impegnarsi al massimo nella vita."</li>
            <li>"La programmazione è arte, se fatta in determinati modi."</li>
            <li>"L'intelligenza artificiale ridisegnerà completamente... [qualcosa]"</li>
        </ul>
    </div>

    <!-- 11. LiteraryLog & Blog -->
    <a href="https://panuozzo77.github.io/LiteraryLog/" class="bento-card col-span-2 row-span-1" style="background:#fff9f0; border:1px solid #ffeebb;">
        <div style="display:flex; align-items:center; gap:16px;">
            <i class="fas fa-book" style="font-size:24px; color:#ff9500;"></i>
            <div>
                <h3 class="card-title" style="font-size:18px; margin:0;">LiteraryLog</h3>
                <p class="card-desc" style="margin:0;">Le mie letture.</p>
            </div>
        </div>
    </a>

    <a href="{{ '/blog' | relative_url }}" class="bento-card col-span-2 row-span-1" style="background:#fbf0ff; border:1px solid #ebdcfc;">
        <div style="display:flex; align-items:center; gap:16px;">
            <i class="fas fa-pen-nib" style="font-size:24px; color:#af52de;"></i>
            <div>
                <h3 class="card-title" style="font-size:18px; margin:0;">Blog</h3>
                <p class="card-desc" style="margin:0;">I miei pensieri.</p>
            </div>
        </div>
    </a>

    <!-- Footer Note -->
    <div class="bento-card col-span-4 row-span-1" style="background:transparent; border:none; box-shadow:none; padding:0; min-height:auto; text-align:center;">
        <p style="font-size:14px; color:var(--text-tertiary);">Odio la programmazione web.</p>
    </div>

</div>