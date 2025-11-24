---
layout: note
title: dbt-challenge
date: 2025-11-04
subject: progetti
tags: [Data, DataEngineering, DBT, DuckDB, Challenge, Personale, Completato]

---

## Descrizione  
Questo progetto rappresenta una **challenge di Data Engineering** focalizzata sull’uso combinato di **DuckDB** e **DBT** per costruire una pipeline di data modeling completa: dai dati raw, ai modelli di staging, fino alla creazione di data marts analitici.

La sfida simula un task reale tipico delle pipeline moderne utilizzate in DSCOVR e ha lo scopo di valutare la capacità di:  
- pulire e modellare dati grezzi,  
- organizzare un progetto DBT ben strutturato,  
- creare metriche solide per analisi e decision-making,  
- ottimizzare query su DuckDB,
- testing dei modelli.

## Funzionalità principali  
### ✔ Staging Models  
- Normalizzazione e pulizia della tabella dei taxi ride di NYC  
- Formattazione timestamp e calcolo:
  - durata del viaggio  
- Rimozione dei record non validi  
- Classificazione dei viaggi (short / medium / long distance)  
- Flag per individuare pagamenti “prepaid”  

### ✔ Data Marts  
- **Trips by Time of Day**: numero di viaggi e revenue per fascia oraria  
- **Top 5 Pickup Zones**: zone con più corse e maggiore revenue  
- **Driver/Rate Performance**: analisi percentuale delle tips per VendorID  
- **Distance Analysis**: durata media e revenue per classe distanza 

# Repository
https://github.com/panuozzo77/duckdb-dbt-challenge