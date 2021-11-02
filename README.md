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

## Fonctionnalités livrés

### Basique

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



### Avancé

#### Modifcation

Dans l'onglet "Modifier" si on coche "Parametres Avancés", le formulaire s'agrandit avec des champs supplémentaires. L'utilisateur peut modifier tous les champs, tels que longitude, latitude, Code postal, Quartier, etc. 
Pour faire cela j'ai modifé dans le fichier [crud-mongo.js](serveur/app_modules/crud-mongo.js) la fonction updateRestaurant. Cette fonction accueile desormais les modifcations à toutes les colonnes de la base de données.

#### Carte

Dans l'onglet "Carte", l'utilisateur peut voir la carte du restaurant. Il peut ajouter des plats dans son panier. Il peut ensuite consulter son panier et supprimer des plats. Enfin il doit saisir les informations necessaire au paiement et valider le paiement.

#### Avis

Dans l'onglet "Avis", l'utilisateur peut consulter les avis existants, les avis existants ont une image pris au hasard. Si le restaurant n'a pas d'avis c'est indiqué.
L'utilisateur peut ajouter un avis, il doit selectionner la date de son avis, sa note, et son score.
Ceci a été possible en créant la fonction "addReview" dans [crud-mongo.js](serveur/app_modules/crud-mongo.js). Cette fonction utilise la méthode [updateOne](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/) pour modifier le restaurant.



