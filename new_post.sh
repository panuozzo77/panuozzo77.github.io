#!/bin/bash

# Prompt per il titolo
read -p "Inserisci il titolo del post: " TITLE

if [ -z "$TITLE" ]; then
    echo "Errore: Il titolo non può essere vuoto."
    exit 1
fi

# Formatta il titolo per l'URL (lowercase, converte spazi in trattini, rimuove caratteri speciali)
SLUG=$(echo "$TITLE" | tr '[:upper:]' '[:lower:]' | tr -cd '[:alnum:] ' | tr -s ' ' '-')

# Ottieni le date correnti
DATE_PREFIX=$(date +'%Y-%m-%d')
DATETIME=$(date +'%Y-%m-%d %H:%M:%S %z')
YEAR=$(date +'%Y')
MONTH=$(date +'%m')

# Crea la directory di destinazione se non esiste (YYYY/MM)
TARGET_DIR="_posts/$YEAR/$MONTH"
mkdir -p "$TARGET_DIR"

# Definisci il percorso del nuovo file
FILENAME="$TARGET_DIR/$DATE_PREFIX-$SLUG.md"

if [ -f "$FILENAME" ]; then
    echo "Errore: Il file $FILENAME esiste già!"
    exit 1
fi

# Crea il nuovo post con le informazioni di default (TODO)
cat <<EOF > "$FILENAME"
---
layout: post
title: "$TITLE"
date: $DATETIME
excerpt: "TODO: excerpt"
tags: TODO
---

TODO: Start writing your post here...
EOF

echo "✓ Post creato con successo: $FILENAME"
