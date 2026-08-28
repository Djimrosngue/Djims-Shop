# 🛒 DJIM'S SHOP

**DJIM'S SHOP** est une plateforme e-commerce full-stack moderne conçue pour permettre aux clients de découvrir des produits, gérer leur panier et passer des commandes en ligne.

Le projet est développé avec **React** pour le frontend et **Django REST Framework** pour le backend, avec une architecture API REST permettant de séparer clairement l'interface utilisateur et la logique métier.

---

## 🚀 Fonctionnalités

### 👤 Authentification

* Inscription utilisateur
* Connexion / déconnexion
* Gestion du profil utilisateur
* Authentification sécurisée
* Gestion des sessions et/ou tokens

### 🛍️ Catalogue produits

* Affichage des produits
* Recherche de produits
* Filtrage par catégorie
* Affichage des détails d'un produit
* Gestion des prix
* Gestion des images
* Gestion du stock

### 🛒 Panier

* Ajouter un produit au panier
* Modifier les quantités
* Supprimer un produit
* Calcul automatique du total
* Vérification de la disponibilité des produits

### 📦 Commandes

* Création de commandes
* Historique des commandes
* Suivi du statut des commandes
* Gestion des informations de livraison
* Détails des commandes

### 💳 Paiements

Le projet est conçu pour permettre l'intégration de différentes solutions de paiement, notamment :

* Stripe
* PayPal
* Mobile Money
* Autres solutions de paiement adaptées au marché tchadien

> Les intégrations de paiement dépendent de la configuration de l'environnement et des API disponibles.

### 🔐 Administration

Le backend Django permet la gestion de :

* Produits
* Catégories
* Stocks
* Utilisateurs
* Commandes
* Paiements
* Clients
* Statistiques

---

# 🏗️ Architecture du projet

```text
DJIM-SHOP/
│
├── backend/
│   ├── manage.py
│   ├── config/
│   ├── apps/
│   ├── requirements.txt
│   └── ...
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── context/
│   │   └── ...
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 💻 Technologies utilisées

## Frontend

* React
* JavaScript / JSX
* React Router
* Axios
* HTML5
* CSS3
* Bootstrap / CSS personnalisé

## Backend

* Python
* Django
* Django REST Framework
* PostgreSQL
* JWT Authentication

## Outils

* Git
* GitHub
* Visual Studio Code
* Postman

---

# ⚙️ Installation

## 1. Cloner le projet

```bash
git clone https://github.com/Djimrosngue/Djims-Shop.git
```

Puis :

```bash
cd Djims-Shop
```

---

# 🔧 Installation du backend

Accéder au dossier backend :

```bash
cd backend
```

Créer un environnement virtuel :

### Windows

```bash
python -m venv venv
```

Activer l'environnement :

```bash
venv\Scripts\activate
```

Installer les dépendances :

```bash
pip install -r requirements.txt
```

Configurer les variables d'environnement dans un fichier `.env`.

Exemple :

```env
SECRET_KEY=your-secret-key
DEBUG=True

DATABASE_NAME=djims_shop
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5432
```

Appliquer les migrations :

```bash
python manage.py migrate
```

Créer un administrateur :

```bash
python manage.py createsuperuser
```

Lancer le serveur Django :

```bash
python manage.py runserver
```

Le backend sera disponible sur :

```text
http://127.0.0.1:8000/
```

---

# ⚛️ Installation du frontend

Ouvrir un nouveau terminal puis :

```bash
cd frontend
```

Installer les dépendances :

```bash
npm install
```

Lancer React :

```bash
npm start
```

Si ton projet utilise Vite :

```bash
npm run dev
```

Le frontend sera généralement disponible sur :

```text
http://localhost:3000/
```

ou :

```text
http://localhost:5173/
```

---

# 🔗 Communication Frontend / Backend

L'application React communique avec Django REST Framework à travers des API REST.

Exemple :

```text
React
  │
  │ HTTP / Axios
  ▼
Django REST Framework
  │
  ▼
PostgreSQL
```

Exemples d'API :

```text
/api/products/
/api/categories/
/api/auth/
/api/orders/
/api/cart/
/api/payments/
```

Les endpoints exacts dépendent de la configuration actuelle du projet.

---

# 🔐 Sécurité

Le projet utilise un fichier `.env` pour les variables sensibles.

Exemple :

```text
.env
```

est exclu du dépôt grâce au `.gitignore`.


---

# 📱 Objectif du projet

DJIM'S SHOP a pour objectif de fournir une solution e-commerce moderne pouvant être adaptée aux besoins des entreprises et commerçants, notamment dans le contexte du marché tchadien.

Le projet peut évoluer vers une plateforme complète intégrant :

* Paiement Mobile Money
* Livraison locale
* Notifications SMS
* Notifications WhatsApp
* Gestion avancée des stocks
* Tableau de bord analytique
* Gestion des fournisseurs
* Facturation
* Système de promotions
* Avis clients
* Programme de fidélité

---

# 🌍 Adaptation au contexte tchadien

Le projet est pensé pour pouvoir répondre aux réalités du commerce numérique au Tchad.

Les évolutions envisagées comprennent notamment :

* Paiement Mobile Money
* Gestion des commandes par téléphone
* Livraison à N'Djaména
* Notifications SMS
* Notifications WhatsApp
* Fonctionnement avec des connexions internet limitées
* Interface simple et adaptée aux smartphones
* Gestion des prix en FCFA

---

# 📊 Évolutions futures

### Version actuelle

* [x] Catalogue produits
* [x] Authentification
* [x] Panier
* [x] API REST
* [x] Gestion des produits
* [x] Gestion des commandes

### Roadmap

* [ ] Paiement Mobile Money
* [ ] Stripe
* [ ] PayPal
* [ ] Notifications SMS
* [ ] Notifications WhatsApp
* [ ] Système de livraison
* [ ] Dashboard analytique avancé
* [ ] Application mobile Flutter
* [ ] PWA
* [ ] Déploiement cloud
* [ ] CI/CD
* [ ] Tests automatisés

---

# 🧪 Tests

Backend :

```bash
python manage.py test
```

Frontend :

```bash
npm test
```

Les commandes peuvent varier selon la configuration du projet.

---

# 📸 Screenshots
Voici les captures d'écran de l'application :

```text
docs/
└── screenshots/
    ├── home.png
    ├── products.png
    ├── product-details.png
    ├── cart.png
    ├── checkout.png
    └── dashboard.png
```

---

# 🤝 Contribution

Les contributions sont les bienvenues.

1. Forker le projet
2. Créer une branche :

```bash
git checkout -b feature/nouvelle-fonctionnalite
```

3. Effectuer les modifications
4. Faire un commit :

```bash
git commit -m "Add nouvelle fonctionnalité"
```

5. Pousser la branche :

```bash
git push origin feature/nouvelle-fonctionnalite
```

6. Créer une Pull Request

---

# 📄 Licence

Ce projet est actuellement destiné à un usage de développement et de démonstration.

La licence pourra être définie ultérieurement selon les conditions de distribution du projet.

---

# 👨‍💻 Auteur

**Djimrosngue Justin**

Full-Stack Developer
React • Django • Django REST Framework • Flutter • PostgreSQL

📍 Chad

---

## ⭐ Projet

Si ce projet vous intéresse, n'hésitez pas à lui attribuer une ⭐ sur GitHub.

**DJIM'S SHOP — Building digital commerce solutions for the future.**
