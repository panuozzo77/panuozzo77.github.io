#!/bin/bash

DIR="_posts/2025/12"


mkdir -p "$DIR"

# Data fissa come richiesto
DATE="2025-12-10"

# Array dei Titoli (15 elementi)
TITLES=(
  "Benvenuto nel Blog!"
  "Introduzione a Linux e Bash"
  "Perché imparare Python nel 2025"
  "I 10 Comandi Docker Fondamentali"
  "Guida al Minimalismo Digitale"
  "Come configurare un server Web"
  "Frontend vs Backend: Le differenze"
  "Il futuro dell'Intelligenza Artificiale"
  "Recensione: I migliori editor di codice"
  "Sicurezza Informatica per Principianti"
  "Git e GitHub: Primi Passi"
  "Automatizzare i task con Cron"
  "Smart Working: Consigli per la produttività"
  "Database SQL vs NoSQL"
  "Roadmap per diventare Full Stack Developer"
)

# Array dei Tag corrispondenti (separati da spazio)
TAGS_LIST=(
  "jekyll blog benvenuto"
  "linux bash terminale"
  "python coding tutorial"
  "docker devops container"
  "lifestyle produttività focus"
  "server nginx apache"
  "webdev carriera coding"
  "ai tech futuro"
  "tools vscode vim"
  "security privacy cyber"
  "git vcs open-source"
  "automazione linux scripting"
  "lavoro remoto carriera"
  "database data sql"
  "carriera studio fullstack"
)

# Loop per creare i 15 file
for i in {0..14}; do
    # Preleva il titolo e i tag correnti
    CURRENT_TITLE="${TITLES[$i]}"
    CURRENT_TAGS_STRING="${TAGS_LIST[$i]}"
    
    # Crea un nome file "slug" (sostituisce spazi con trattini, tutto minuscolo)
    # Esempio: 2025-11-18-benvenuto-nel-blog.md
    SLUG=$(echo "$CURRENT_TITLE" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9]/-/g' | sed 's/-\+/-/g')
    FILENAME="${DIR}/${DATE}-${SLUG}.md"

    # Inizia a scrivere il file
    cat <<EOF > "$FILENAME"
---
layout: post
title: "$CURRENT_TITLE"
date: $DATE
excerpt: "Questo è un post di esempio generato automaticamente numero $((i+1))."
tags:
EOF

    # Loop interno per formattare i tag come lista YAML
    for tag in $CURRENT_TAGS_STRING; do
        echo "  - $tag" >> "$FILENAME"
    done

    # Chiude il Front Matter
    echo "---" >> "$FILENAME"
    
    # Aggiunge un contenuto di prova
    echo "" >> "$FILENAME"
    echo "## $CURRENT_TITLE" >> "$FILENAME"
    echo "" >> "$FILENAME"
    echo "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." >> "$FILENAME"

    echo "Creato: $FILENAME"
done

echo "------------------------------------------------"
echo "Fatto! 15 file creati nella cartella '$DIR'."