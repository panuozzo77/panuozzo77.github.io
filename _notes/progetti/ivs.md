---
layout: note
title: iliadbox-voip-scheduler
date: 2025-11-11
subject: progetti
tags: [Personale, Software, Networking, Completato]
---

## Descrizione
**iliadbox-voip-scheduler** è una raccolta di script che consente di:
- autorizzare un'applicazione sulla Iliadbox per ottenere un `app_token`
- ottenere un token di sessione (`session_token`)
- attivare o disattivare la linea telefonica tramite API locali

La Iliadbox WiFi 6 permette l’attivazione/disattivazione del telefono solo tramite interfaccia web, senza funzionalità programmatica. Questo progetto abilita l’automazione e la possibilità di schedulare l’orario di funzionamento del telefono senza usare smart-plug o timer esterni.

## Tecnologie utilizzate
- **Shell script (bash)**
- **curl**, **jq**
- **HTTPS client-side certificate validation**
- **HMAC-SHA1 per autenticazione**


## Repository
https://github.com/panuozzo77/iliadbox-voip-scheduler

