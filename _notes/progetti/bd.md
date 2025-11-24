---
layout: note
title: 'BookingAgency'
date: 2023-10-04
subject: progetti
tags: [Università, Database, Modellazione, ER]
---

## Descrizione  
Questo progetto consiste nella **progettazione logica e concettuale di un database** per la gestione delle prenotazioni di soggiorni presso Strutture Ricettive tramite diverse Agenzie di Viaggi.  
Il sistema è pensato per uso interno alle agenzie, non per i clienti finali, ed è progettato per evitare **overbooking**, migliorare la gestione delle prenotazioni e tenere traccia storica di clienti, strutture e soggiorni.

Il database gestisce:
- Strutture ricettive (Hotel, Ostelli, Appartamenti)
- Clienti e tessere fedeltà
- Prenotazioni e loro stato
- Agenzie di viaggio
- Punti d’interesse nelle vicinanze delle strutture
- Relazioni (Prenotazione–Struttura, Cliente–Tessera, Struttura–Punto d’interesse, ecc.)

La documentazione completa è disponibile nel file PDF fornito in fondo.

## Tecnologie utilizzate
- MySQL
- Java Connector/J

---

## Funzionalità principali
### ✔ Gestione Clienti  
- Registrazione anagrafica  
- Gestione contatti  
- Numero prenotazioni effettuate  
- Assegnazione automatica di una **tessera fedeltà** (standard/premium/scaduta)  
- Controllo integrità: max **due prenotazioni attive** contemporaneamente  

### ✔ Gestione Tessere  
- Periodo di validità  
- Sconto applicabile (solo per tessere premium)  
- Tracciamento del denaro speso  
- Rinnovo automatico alla scadenza 

### ✔ Gestione Prenotazioni  
- Inserimento prenotazione  
- Check-in / Check-out  
- Numero ospiti  
- Stato (Inviata, Confermata, Rifiutata, Eliminata, Soddisfatta)  
- Assegnazione a Struttura e Agenzia  
- Note opzionali  

### ✔ Gestione Strutture Ricettive  
- Hotel, Ostelli, Appartamenti  
- Prezzi, servizi, anno d’iscrizione  
- Indirizzo e coordinate geografiche  
- Ricerca per:
  - capacità ospiti  
  - distanza da punti d’interesse (entro 100km)
  - tipologia struttura  

### ✔ Gestione Stanze (solo Hotel)  
- Tipologia stanza  
- Disponibilità  
- Prezzo stanza  

### ✔ Punti d’interesse  
- Luoghi rilevanti entro 100 km  
- Descrizione e posizione geolocalizzata  

---

## Stato del progetto
Completato

## Documentazione
🔗 https://github.com/panuozzo77/BookingAgency/blob/main/Italian_Documentation.pdf