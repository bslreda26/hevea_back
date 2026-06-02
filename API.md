# Hevea API - Guide complet (backend)

**Base URL:** `http://localhost:3333/api/v1`  
**Format:** JSON (`snake_case`), montants en FCFA

---

## 1) Auth & roles

### Header

```http
Authorization: Bearer <token>
```

### Login

`POST /auth/login`

```json
{
  "email": "admin@hevea.local",
  "password": "HeveaAdmin2024!"
}
```

### Signup

`POST /auth/signup`

| Situation            | Qui peut appeler | Role cree                              |
| -------------------- | ---------------- | -------------------------------------- |
| Aucun user en base   | public           | `admin` (force)                        |
| User(s) deja en base | admin connecte   | `user` par defaut, ou `admin` si passe |

```json
{
  "fullName": "Operateur",
  "email": "user@example.com",
  "password": "motdepasse8",
  "passwordConfirmation": "motdepasse8",
  "role": "user",
  "point_of_sale_id": 1
}
```

`point_of_sale_id` est obligatoire (sauf tout premier compte: attribution auto au point principal).

### Profil / logout

- `GET /account/profile`
- `POST /account/logout`

### Points de vente

- `GET /points-of-sale` (admin: tous, user: son point uniquement)
- `GET /points-of-sale/:id` (admin: n'importe lequel, user: seulement le sien)
- `POST /points-of-sale` (admin uniquement)
- `PUT /points-of-sale/:id` (admin uniquement)
- `DELETE /points-of-sale/:id` (admin uniquement)

```json
{
  "name": "Boutique Cocody"
}
```

Update exemple:

```json
{
  "name": "Boutique Cocody Centre"
}
```

Suppression:

`DELETE /points-of-sale/:id` retourne erreur `422` si le point est deja lie a des utilisateurs/achats/ventes/depenses.

### Utilisateurs (admin CRUD)

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `PUT /users/:id`
- `DELETE /users/:id`

Create exemple:

```json
{
  "fullName": "Caissier 1",
  "email": "caissier1@example.com",
  "password": "motdepasse8",
  "passwordConfirmation": "motdepasse8",
  "role": "user",
  "point_of_sale_id": 1
}
```

Update exemple:

```json
{
  "fullName": "Caissier principal",
  "role": "admin",
  "point_of_sale_id": 2
}
```

Notes:

- Seul un admin peut faire CRUD utilisateurs.
- Un admin ne peut pas supprimer son propre compte.

### Permissions

| Role    | Autorise                                             | Interdit                                   |
| ------- | ---------------------------------------------------- | ------------------------------------------ |
| `admin` | CRUD complet + rapports + DELETE                     | -                                          |
| `user`  | Lire/creer achats, ventes, depenses; modifier achats | `reports/*`, `DELETE`, champs marge/profit |

---

## 2) Depenses generales

### Categories supportees

- `investissement`
- `salaire`
- `loyer`
- `electricity`
- `wifi`
- `other`

### Create

`POST /depenses-generales` (alias: `POST /general-expenses`)

```json
{
  "label": "Salaire equipe",
  "category": "salaire",
  "amount": 800000,
  "date": "2026-06-01",
  "notes": "Mensuel"
}
```

### List (GET)

- `GET /depenses-generales`
- `GET /depenses-generales?year=2026`
- `GET /depenses-generales?month=2026-06`
- `GET /depenses-generales?category=salaire`
- `GET /depenses-generales?start_date=2026-06-01&end_date=2026-06-30`
- `GET /depenses-generales?point_of_sale_id=2` (admin)

### Search (POST payload)

`POST /depenses-generales/search` (alias: `POST /general-expenses/search`)

```json
{
  "category": "loyer",
  "start_date": "2026-01-01",
  "end_date": "2026-06-30"
}
```

### Delete

`DELETE /depenses-generales/:id` (alias: `DELETE /general-expenses/:id`)

---

## 3) Achats

### Create

`POST /purchases`

```json
{
  "date": "2026-05-01",
  "supplier": "Fournisseur A",
  "quantity_kg": 2000,
  "buy_price_per_kg": 435
}
```

### List / detail

- `GET /purchases`
- `GET /purchases/:id`

### Date criteria (GET)

`GET /purchases?start_date=2026-01-01&end_date=2026-06-30`

Admin peut filtrer un point de vente:
`GET /purchases?point_of_sale_id=2`

### Search (POST payload)

`POST /purchases/search`

```json
{
  "start_date": "2026-01-01",
  "end_date": "2026-06-30"
}
```

### Update / delete

- `PUT /purchases/:id`
- `DELETE /purchases/:id`

---

## 4) Ventes

### Create

`POST /ventes` (alias: `POST /sales`)

```json
{
  "quantity_kg": 14000,
  "sell_price_per_kg": 470,
  "date": "2026-06-20",
  "buyer": "Fabricant"
}
```

FIFO est applique automatiquement sur le stock disponible.

### List / detail

- `GET /ventes` (alias: `GET /sales`)
- `GET /ventes/:id` (alias: `GET /sales/:id`)

Filtres possibles:

- `purchase_id`
- `start_date`
- `end_date`
- `point_of_sale_id` (admin)

Exemple GET:
`GET /ventes?purchase_id=1&start_date=2026-06-01&end_date=2026-06-30`

### Search (POST payload)

- `POST /ventes/search`
- `POST /sales/search`

```json
{
  "purchase_id": 1,
  "start_date": "2026-06-01",
  "end_date": "2026-06-30"
}
```

### Delete

- `DELETE /ventes/:id`
- `DELETE /sales/:id`

---

## 5) Depenses sur vente

### Create

`POST /expenses`

```json
{
  "sale_id": 1,
  "label": "Transport + dechargement",
  "amount": 150000,
  "date": "2026-06-20"
}
```

Optionnel pour multi-achats:

```json
{
  "sale_id": 1,
  "purchase_id": 1,
  "label": "Transport lot A",
  "amount": 80000,
  "date": "2026-06-20"
}
```

### List (GET)

- `GET /expenses`
- `GET /expenses?sale_id=1`
- `GET /expenses?start_date=2026-06-01&end_date=2026-06-30`
- `GET /expenses?sale_id=1&start_date=2026-06-01&end_date=2026-06-30`
- `GET /expenses?point_of_sale_id=2` (admin)

### Search (POST payload)

`POST /expenses/search`

```json
{
  "sale_id": 1,
  "start_date": "2026-06-01",
  "end_date": "2026-06-30"
}
```

### Delete

`DELETE /expenses/:id`

---

## 6) Rapports (admin)

## Formules metier

- `profit_on_sales = total_revenue - total_cogs - vente_expenses`
- `depenses = vente_expenses + general_expenses`
- `real_margin = total_revenue - total_cogs - depenses` (profit final apres toutes depenses)

### 6.1 Overview / Dashboard API

#### GET

`GET /reports/overview`

Date criteria supportee:
`GET /reports/overview?start_date=2026-01-01&end_date=2026-06-30`

Filtre point de vente (admin):
`GET /reports/overview?point_of_sale_id=2`

#### POST (payload criteria)

`POST /reports/overview`

```json
{
  "start_date": "2026-01-01",
  "end_date": "2026-06-30"
}
```

Exemple reponse:

```json
{
  "total_kg_bought": 15000,
  "total_kg_sold": 14000,
  "total_kg_remaining": 1000,
  "total_revenue": 6580000,
  "total_buy_cost": 6525000,
  "total_cogs": 6097000,
  "vente_expenses": 150000,
  "general_expenses": 800000,
  "depenses": 950000,
  "profit_on_sales": 333000,
  "global_cost_per_kg": 67.86,
  "real_margin": -467000,
  "investissement_total": 4500000
}
```

### 6.2 Monthly report

#### GET

`GET /reports/monthly?year=2026`

Date criteria supportee:
`GET /reports/monthly?start_date=2026-01-01&end_date=2026-06-30`

Filtre point de vente (admin):
`GET /reports/monthly?point_of_sale_id=2`

#### POST (payload criteria)

`POST /reports/monthly`

```json
{
  "year": 2026,
  "start_date": "2026-01-01",
  "end_date": "2026-06-30"
}
```

Exemple reponse:

```json
[
  {
    "month": "2026-06",
    "label": "Juin 2026",
    "kg_bought": 15000,
    "kg_sold": 14000,
    "total_revenue": 6580000,
    "total_cogs": 6097000,
    "vente_expenses": 150000,
    "general_expenses": 800000,
    "depenses": 950000,
    "profit_on_sales": 333000,
    "global_cost_per_kg": 67.86,
    "real_margin": -467000
  }
]
```

---

## 7) Erreurs frequentes

| Code  | Exemple                                                                           |
| ----- | --------------------------------------------------------------------------------- |
| `401` | Non connecte / token invalide                                                     |
| `403` | Acces refuse (role `user` sur rapports, signup sans admin apres 1er compte, etc.) |
| `422` | Validation metier (stock, schema)                                                 |
| `400` | Parametre invalide ou manquant                                                    |

---

## 8) Resume routes (avec search POST)

| Domaine            | Route(s) principales                                                                                                              |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| Auth               | `POST /auth/login`, `POST /auth/signup`, `GET /account/profile`, `POST /account/logout`                                           |
| Points de vente    | `GET /points-of-sale`, `GET /points-of-sale/:id`, `POST /points-of-sale`, `PUT /points-of-sale/:id`, `DELETE /points-of-sale/:id` |
| Utilisateurs       | `GET /users`, `GET /users/:id`, `POST /users`, `PUT /users/:id`, `DELETE /users/:id`                                              |
| Depenses generales | `GET/POST /depenses-generales`, `POST /depenses-generales/search`, `DELETE /depenses-generales/:id`                               |
| Achats             | `GET/POST /purchases`, `POST /purchases/search`, `GET /purchases/:id`, `PUT /purchases/:id`, `DELETE /purchases/:id`              |
| Ventes             | `GET/POST /ventes`, `POST /ventes/search`, `GET /ventes/:id`, `DELETE /ventes/:id`                                                |
| Expenses vente     | `GET/POST /expenses`, `POST /expenses/search`, `DELETE /expenses/:id`                                                             |
| Rapports admin     | `GET/POST /reports/overview`, `GET/POST /reports/monthly`                                                                         |

Aliases anglais disponibles:

- `/general-expenses` (depenses generales)
- `/sales` (ventes)

---

## 9) Compte admin par defaut

Apres `node ace migration:run` puis `node ace db:seed`:

| Variable `.env`  | Defaut              |
| ---------------- | ------------------- |
| `ADMIN_EMAIL`    | `admin@hevea.local` |
| `ADMIN_PASSWORD` | `HeveaAdmin2024!`   |
| `ADMIN_NAME`     | `Administrateur`    |

Changez le mot de passe en production.
