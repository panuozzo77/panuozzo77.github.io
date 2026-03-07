#!/bin/bash

# ==============================================================================
# Guida all'Installazione dell'Ambiente di Sviluppo Locale per il Sito Jekyll
# ==============================================================================
#
# Questo script ti guiderà attraverso l'installazione di tutte le dipendenze
# necessarie per eseguire questo sito Jekyll in locale.
# È pensato per un ambiente basato su Arch Linux.
#
# Esegui questo script con: bash install.sh
#

echo "### Inizio della configurazione dell'ambiente di sviluppo Jekyll ###"
echo ""

# --- PASSO 1: Aggiornamento del sistema ---
# È una buona pratica assicurarsi che il sistema sia aggiornato prima di installare nuovi pacchetti.
echo "--- PASSO 1: Aggiornamento del sistema (richiede privilegi di sudo) ---"
sudo pacman -Syu --noconfirm
echo "Sistema aggiornato."
echo ""

# --- PASSO 2: Installazione di Ruby e strumenti di compilazione ---
# Jekyll è un generatore di siti statici basato su Ruby.
# 'base-devel' è un gruppo di pacchetti che include strumenti essenziali per la compilazione,
# necessari per alcune gemme (le librerie di Ruby) che hanno estensioni native.
echo "--- PASSO 2: Controllo e installazione di Ruby e strumenti di compilazione ---"
if ! command -v ruby &> /dev/null
then
    echo "Ruby non trovato. Installazione in corso..."
    sudo pacman -S ruby base-devel --noconfirm
    echo "Ruby e base-devel installati."
else
    echo "Ruby è già installato."
fi
echo ""

# --- PASSO 3: Installazione di Bundler ---
# Bundler è un gestore di dipendenze per Ruby. Legge il file 'Gemfile'
# per installare le versioni corrette di tutte le gemme necessarie al progetto.
echo "--- PASSO 3: Controllo e installazione di Bundler ---"
if ! command -v bundle &> /dev/null
then
    echo "Bundler non trovato. Installazione in corso..."
    # Su Arch Linux, è consigliabile installare bundler tramite pacman per una migliore integrazione con il sistema.
    sudo pacman -S ruby-bundler --noconfirm
    echo "Bundler installato."
else
    echo "Bundler è già installato."
fi
echo ""

# --- PASSO 4: Installazione delle dipendenze del progetto (Gem) ---
# Questo comando legge il file 'Gemfile' e installa tutte le gemme specificate.
# L'opzione --path 'vendor/bundle' assicura che le gemme vengano installate
# in una cartella locale al progetto, evitando conflitti con le gemme di sistema.
echo "--- PASSO 4: Installazione delle dipendenze Ruby (Gem) dal Gemfile ---"
echo "Questo comando installerà le gemme nella cartella 'vendor/bundle' locale al progetto."
bundle config set path 'vendor/bundle'
bundle install
echo "Dipendenze installate con successo."
echo ""

# --- PASSO 5: Avvio del server di sviluppo Jekyll ---
# Una volta completata l'installazione, puoi avviare il server locale.
echo "--- PASSO 5: Avvio del server di sviluppo Jekyll ---"
echo "Tutto è pronto! Per avviare il server locale, esegui il seguente comando dalla directory del progetto:"
echo ""
echo "  bundle exec jekyll serve"
echo ""
echo "Spiegazione del comando:"
echo "  - 'bundle exec': Esegue il comando seguente (jekyll) nel contesto delle gemme installate tramite Bundler."
echo "                   Questo garantisce che vengano usate le versioni corrette delle dipendenze."
echo "  - 'jekyll serve': È il comando di Jekyll per avviare il server di sviluppo."
echo ""
echo "Una volta avviato, il tuo sito sarà visibile all'indirizzo http://localhost:4000"
echo "Il server si aggiornerà automaticamente ogni volta che modifichi un file di contenuto."
echo ""
echo "### Configurazione completata! ###"