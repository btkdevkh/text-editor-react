# Text Editor React App Test Technique

Text Editor est une application React qui contient un mini éditeur de text.

## Bref Déscriptions & Fonctionalités

Appeler une API de modération pour évaluer des contributions d'un utilisateur.

- Faire un appel à une API quand l'utilisateur clique sur le bouton `Send`
- L'API renvoie une prédiction entre 0 et 1
- Si la réponse est supérieur de 0.5, c'est rejetée, sinon c'est acceptée
- UI doit afficher l'historique des contributions avec une couleur différente en fonction du résultat

Bonus: Afficher en plus la pertinence qui estime la qualité de la contribution d'un autre appel API.

## Scripts Disponible

Dans la raçine du dossier, vous pouvez tapez:

### `npm install`

Pour installer toutes les dépendances nécessaires.

### `npm start`

Pour tourner l'application en développement mode.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour le visualiser dans le navigateur.

### `npm run build`

Pour construire le dossier `build` de l'application en production mode.\

## Apprendre React

Pour apprendre React, allez vers [React documentation](https://reactjs.org/).
