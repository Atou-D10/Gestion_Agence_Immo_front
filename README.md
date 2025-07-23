# 🏡 Agence Immo – Application de Gestion Immobilière

Projet full-stack réalisé avec **React (frontend)** et **Laravel (backend)** permettant la gestion complète d'une agence immobilière : ajout de biens, planification de visites, contrats de location/vente, gestion des utilisateurs, etc.

---

## 🚀 Fonctionnalités

### Frontend (React + Vite)
- 🏠 Page d’accueil responsive
- 🔍 Liste des biens immobiliers
- 🔐 Authentification (login, register)
- 📄 Page de détails d’un bien (à venir)
- 💬 Contact via formulaire
- ⚙️ Intégration avec une API Laravel REST

### Backend (Laravel)
- ✅ CRUD complet pour :
  - Propriétés (`properties`)
  - Visites (`visits`)
  - Contrats (`contracts`)
  - Messages de contact (`messages`)
  - Utilisateurs (`users`)
- 🖼️ Upload d'images pour les biens (local storage)
- 🔐 Authentification API via Laravel Sanctum
- 🧾 Génération de PDF de contrats (à venir)

---

## 🛠️ Technologies utilisées

- **Frontend** :
  - React
  - Vite
  - Axios
  - React Router DOM
  - Bootstrap

- **Backend** :
  - Laravel 11
  - Sanctum
  - MySQL
  - Laravel Storage

---

## 📦 Installation

### 🔧 Backend (Laravel)

```bash
cd agence-immo-api
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
php artisan serve

🌐 Frontend (React)
cd agence-immo-react
npm install
npm run dev


🙋 Auteur
👤 Atou Diagne

🎓 Étudiant en Informatique Appliquée à la Gestion (ISI / UNCHK)

✉️ atoudiagne01@gmail.com

📝 Licence
Ce projet est open-source, libre d’adaptation et d’amélioration.
