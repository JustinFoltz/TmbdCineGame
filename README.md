# TmbdCineGame

**Réalisé par :** Justin Foltz

**Date :** 12.2018

## Projet

TmbdCineGame est application web sous la forme d’un quizz cinématographique. Le jeu s’organise autour de questions constituées du résumé d’un film et de plusieurs propositions de titres. Le but étant de retrouver le titre correspondant au résumé affiché. Quatre indices relatifs au contexte du film peuvent être révélées par l’utilisateur s’il en éprouve le besoin. A chaque bonne réponse, le score est incrémenté de 1 à 5 points en fonction du nombre d’indices révélés (-1 point par indice révélé). La partie s’arrête au bout de 10 questions ou après 2 mauvaises réponses. Pour varier les parties, l’utilisateur peut, en début de jeu, filtrer par genre, années, ou langage, les films qui lui seront présentés. Il a de plus le choix entre trois modes de difficulté croissant : figurant, assistant ou réalisateur, directement liés au nombre de propositions qui lui seront faites (respectivement 2, 4 ou aucune). 

![](./illustration.jpg)

## Technologies

Réalisé avec [Angular CLI](https://github.com/angular/angular-cli) version 7.0.2. Les donnés sur les films sont fournies par l'[API TMBD](https://developers.themoviedb.org/3/getting-started/introduction).

## Lancement du projet

Lancez la commande ci-dessous dans le répertoire racine du projet :

```bash
ng serve --open
```
