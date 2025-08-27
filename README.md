# Entretien Pistache — Mini-projet Frontend (Angular)

## Bienvenue 👋
Ce dépôt contient un mini-projet Angular destiné à évaluer votre capacité à livrer deux fonctionnalités simples mais soignées autour d’une liste d’événements.

---

## Objectif

Au minimum, vous devez :

- Afficher la liste des événements.
- Permettre la création d’un nouvel événement (formulaire + écriture côté API factice).

L’évaluation porte sur la qualité, pas sur la quantité :

- **Accessibilité**
- **UX**
- **Qualité du code**
- **Respect des standards Angular**
- **Performance**

Des fonctionnalités bonus sont possibles si vous le souhaitez (édition/suppression, recherche/tri...), mais elles ne sont pas requises.

---

## Stack fournie

- **Angular 20**
- **json-server** (API factice persistée dans `db.json`) + proxy Angular (`/api` → `:4300`)


---

## Ce qu’on attend concrètement

- La page principale affiche la liste des événements via l’API (`GET /api/events`)
- Un formulaire permet de créer un événement (`POST /api/events`) et la liste se met à jour
---

## Pré-requis

- Node.js ≥ 18 (recommandé 20.x)
- npm ≥ 9
- Accès réseau local (pour json-server)

---

## Installation

### 1) Installer les dépendances
```bash
npm install
```

Le projet inclut déjà `concurrently` et `json-server` en devDependencies.

---

## Lancement

Une seule commande démarre Angular et l’API en parallèle :

```bash
npm start
```

- **Frontend** : http://localhost:4200  
- **API factice (via proxy)** : requêtes à `/api/events` → proxifiées vers http://localhost:4300/events  
- Données persistées dans `db.json` à la racine.

---

## Endpoints utiles (json-server) - des fonctions sont déjà créées dans events.service.ts

- `GET /api/events` — liste des événements  
- `POST /api/events` — crée un événement  
- `PATCH /api/events/:id` — met à jour partiellement  
- `DELETE /api/events/:id` — suppression  

---

## UI
Libre. Le style fourni (`styles.scss`) est un point de départ ; vous pouvez l’améliorer si vous le souhaitez.  
L’UI n’est pas notée prioritairement, mais une **UX propre** est attendue.

---

Bon code !
