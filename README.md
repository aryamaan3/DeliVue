# Site de commande de nourriture en ligne

## Deploiement du projet sur votre machine

### Prerequis

- [Node.js](https://nodejs.org/en/)
- [Vue.js](https://vuejs.org/)
- [MongoDB](https://www.mongodb.com/)

Cloner le projet sur votre machine.
Se diriger vers le dossier du projet.

Ouvrez trois terminals

### Terminal 1

Lancer MongoDB sur votre machine:

Sur Mac (si vous avez telechargé MongoDB avec [brew](https://brew.sh/)):
```bash
$ brew services start mongodb-community@5.0
```

### Terminal 2

```bash
$ cd serveur
$ npm install
$ node serverCrudWithMongo.js 
```

### Terminal 3

```bash
$ cd client
$ npm install
$ npm run serve

```

## Description

L'interface graphique du site a été faite à l'aide de Vue-Material.

### Fonctionnalités livrés

#### Basique

- [x] Ajout d'un restaurant dans la base de données
- [x] Recherche d'un restaurant
- [x] Determiner le nombre de restaurant affichés par page
- [x] Recherche d'un restaurant par nom
- [x] Affichage du nombre total de restaurants dans la base de données
- [x] Supprimer un restaurant
- [x] Derouler les pages
- [x] Details d'un restaurant
- [x] Affichage des informations d'un restaurant
- [x] Galerie comportant une image et une video
- [x] Localisation du restaurant dans une carte
- [x] Retourner à la page d'accueil



#### Avancé



