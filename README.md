# JSQuizStarter
## Présentation

Ce projet est une application web de quiz développée en JavaScript.  

L'application permet aux utilisateurs de :  
- Choisir un thème et répondre à des questions.  
- Voir leurs résultats en temps réel avec un feedback détaillé par question.  
- Suivre leur score total, le temps passé et les réponses correctes/incorrectes.  
- Télécharger un rapport complet du quiz pour référence ultérieure.  

### Thèmes disponibles
- JavaScript Basics  
- DOM & Events  
- Objects & Arrays  

### Objectifs du projet
- Fournir une expérience de quiz interactive et intuitive.  
- Offrir un suivi détaillé des performances de l'utilisateur.  
- Permettre l'export du rapport pour une consultation ou impression.  

### Technologies utilisées
- **HTML, CSS et JavaScript** pour la structure et l'interactivité.  
- **LocalStorage** pour sauvegarder les réponses, scores et temps.  
- **html2canvas** et **jsPDF** pour la génération et téléchargement de rapports (optionnel). 

## Installation

Le projet étant une application front-end simple (HTML, CSS, JavaScript), l'installation est très rapide.

### Étapes :

1. **Cloner le dépôt GitHub** :  
```bash
git clone https://github.com/ElFirdaous28/JSQuizStarter.git
```
Le projet est également déployé sur GitHub Pages et peut être consulté directement ici :  
[Voir le projet en ligne](https://elfirdaous28.github.io/JSQuizStarter/)

## Utilisation

1. **Ouvrir le projet :**  
   - Si vous avez cloné le dépôt, ouvrez le fichier `index.html`

2. **Choisir un nom d'utilisateur :**  
   - Avant de commencer le quiz, saisissez un nom d'utilisateur unique qui sera utilisé pour enregistrer vos résultats.

3. **Sélectionner un thème :**  
   - Après avoir choisi votre nom d'utilisateur, sélectionnez un thème parmi : **JavaScript Basics**, **DOM & Events**, **Objects & Arrays**.

4. **Naviguer dans le quiz :**  
   - Répondez aux questions en cochant les options correctes.  
   - Cliquez sur **Next** pour passer à la question suivante.  
   - Une fois toutes les questions terminées, cliquez sur **See Results** pour afficher vos résultats.

5. **Interpréter les résultats :**  
   - Vos réponses correctes apparaissent en vert, incorrectes en rouge.  
   - Si certaines réponses sont partiellement correctes, elles sont indiquées comme **Partiellement correct**.  
   - Vous pouvez télécharger le rapport complet au format PDF en cliquant sur **Download Report**.