# DeliVue

[Video Démonstratif](https://youtu.be/Ymxd6ics00g)

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

Importer la base de données ([lien](https://www.digitalocean.com/community/tutorials/how-to-import-and-export-a-mongodb-database-on-ubuntu-20-04-fr)):
```bash
$ mongoimport --db test -c restaurants --file primer-dataset.json
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

## Fonctionnalités livrées

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

#### [Modifcation](https://youtu.be/Ymxd6ics00g?t=42)

Dans l'onglet "Modifier" si on coche "Parametres Avancés", le formulaire s'agrandit avec des champs supplémentaires. L'utilisateur peut modifier tous les champs, tels que longitude, latitude, Code postal, Quartier, etc. 
Pour faire cela j'ai modifé dans le fichier [crud-mongo.js](serveur/app_modules/crud-mongo.js) la fonction updateRestaurant. Cette fonction accueile desormais les modifcations à toutes les colonnes de la base de données.

#### [Carte](https://youtu.be/Ymxd6ics00g?t=156)

Dans l'onglet "Carte", l'utilisateur peut voir la carte du restaurant. Il peut ajouter des plats dans son panier. Il peut ensuite consulter son panier et supprimer des plats. Enfin il doit saisir les informations necessaire au paiement et valider le paiement.

#### [Avis](https://youtu.be/Ymxd6ics00g?t=87)

Dans l'onglet "Avis", l'utilisateur peut consulter les avis existants, les avis existants ont une image pris au hasard. Si le restaurant n'a pas d'avis c'est indiqué.
L'utilisateur peut ajouter un avis, il doit selectionner la date de son avis, sa note, et son score.
Ceci a été possible en créant la fonction "addReview" dans [crud-mongo.js](serveur/app_modules/crud-mongo.js). Cette fonction utilise la méthode [updateOne](https://docs.mongodb.com/manual/reference/method/db.collection.updateOne/) pour modifier le restaurant.

N.B Dans les avis j'ai voulu faire des étoiles pour la note. Mais j'ai remarqué que dans la base de données que le score va de 0 à 70 donc j'ai decidé de rester sur un score brute



