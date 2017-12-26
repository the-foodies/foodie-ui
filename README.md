# Foodez
Use https://foodez.life to save, view, or submit restaurant reviews or recipes. Foodez is the one-stop shop for social media food discussions around cooking or dining out with followers you select and trust.

## Overview
Foodez is a web app dedicated to solving your food solutions whenever you wish to dine out or cook up a recipe at home. With over 600 recipes and a database stored with user submitted restaurants, you'll have plenty of options for deciding what to cook or where to dine out. Additionally, users have the ability to subscribe to each other and follow users you trust. With this feature, you have the ability to see followers posts regarding restaurant and recipe reviews that you personally follow.

To get started using Foodez, visit https://foodez.life and create an account using email, Facebook, or Google login. Good eating!

## Features for Future Releases
* **TBD**: TBD next features.

### Tool Stack
* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Axios](https://github.com/axios/axios)
* [D3](https://d3js.org/)
* [MySQL](https://www.mysql.com/)
* [Sequelize](http://docs.sequelizejs.com/) as Object-Relational Mapper (ORM)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](http://mongoosejs.com/) as Object-Relational Mapper (ORM)

#### Server
Main RESTful server is deployed on Amazon Web Services Elastic Compute Cloud (AWS EC2) and uses NGINX to reverse proxy traffic to appropriate servers (MySQL DB, MongoDB, static files). Cacheing is employed and reduces page load time by more than 90% after initial page rendering.

#### Database
Foodez database is constructed in MySQL using Sequelize. Additionally, Foodez has a worker function that indexes queries and stores trending recipe and restaurant information in a Mongo database for faster retrieval.
```
Foodez-UI
├── package.json
├── README.md
├── webpack.config.js
├── webpack.production.config.js
│
├── build
│   ├── bundle.min.js
│   ├── bundle.min.js.map
│   ├── style.css
│   ├── index.html
│   └── assets
│       ├── facebook.png
│       ├── flavorTown.png
│       └── google.png
│
├── src
│   ├── auth.js
│   ├── index.jsx
│   ├── actions
│   │   ├── testApi.js
│   │   ├── apiRequests
│   │   │   ├── getRecipeById.js
│   │   │   ├── getRestaurantById.js
│   │   │   ├── getUserByDisplayName.js
│   │   │   ├── getUserById.js
│   │   │   ├── getUserPosts.js
│   │   │   ├── getUserSubscriptions.js
│   │   │   ├── login.js
│   │   │   └── index.js
│   │   │
│   │   ├── auth
│   │   │   ├── authFirebase.js
│   │   │   └── index.js
│   │   │
│   │   └── modal
│   │       ├── hideModal.js
│   │       ├── showLoginModal.js
│   │       └── index.js
│   │
│   ├── assets
│   │   ├── facebook.png
│   │   ├── flavorTown.png
│   │   └── google.png
│   │
│   ├── components
│   │   ├── App.jsx
│   │   ├── dataDisplay
│   │   │   ├── BubbleChart.jsx
│   │   │   ├── Bubbles.jsx
│   │   │   ├── constants.js
│   │   │   ├── DataDisplay.css
│   │   │   ├── DataDisplay.jsx
│   │   │   ├── GroupingPicker.css
│   │   │   ├── GroupingPicker.jsx
│   │   │   ├── Tooltip.css
│   │   │   ├── Tooltip.jsx
│   │   │   └── utils.js
│   │   │
│   │   ├── displays
│   │   │   ├── AddComment.jsx
│   │   │   ├── Comment.jsx
│   │   │   ├── ListRecommendedItems.jsx
│   │   │   ├── ListThumbnails.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── Tags.jsx
│   │   │   ├── TrendingCarousel.jsx
│   │   │   └── TrendingRecipesList.jsx
│   │   │
│   │   ├── home
│   │   │   ├── Home.jsx
│   │   │   └── HomeFilterThumbnails.jsx
│   │   │
│   │   ├── modals
│   │   │   ├── LoginModal.jsx
│   │   │   └── ModalRoot.jsx
│   │   │
│   │   ├── posts
│   │   │   ├── PostEntry.jsx
│   │   │   ├── PostView.jsx
│   │   │   └── Trending.jsx
│   │   │
│   │   ├── profile
│   │   │   ├── FollowerEntry.jsx
│   │   │   ├── UserComponent.jsx
│   │   │   └── UserProfile.jsx
│   │   │
│   │   ├── recipe
│   │   │   ├── RecipeDetailsPage.jsx
│   │   │   ├── RecipeFilterInstructions.jsx
│   │   │   ├── RecipeHomePage.jsx
│   │   │   └── RecipeSubmissionForm.jsx
│   │   │
│   │   ├── restaurant
│   │   │   ├── RestaurantDetailsPage.jsx
│   │   │   ├── RestaurantHomePage.jsx
│   │   │   └── RestaurantSubmissionForm.jsx
│   │   │
│   │   └── testData
│   │       ├── bubble.css
│   │       ├── cookingQuotes.json
│   │       ├── diningQuotes.json
│   │       ├── testRestaurants.json
│   │       ├── testUser.json
│   │       └── us.json
│   │
│   ├── containers
│   │   ├── app.js
│   │   ├── loginModal.js
│   │   ├── recipe.js
│   │   └── restaurant.js
│   │
│   ├── reducers
│   │   ├── allReducers.js
│   │   ├── app
│   │   │   └── appReducer.js
│   │   │
│   │   ├── auth
│   │   │   └── authFirebaseReducer.js
│   │   │
│   │   └── modal
│   │       └── modalReducer.js
│   │
│   └── utils
│       ├── detailsPage.js
│       ├── formValidation.js
│       ├── googleRestaurant.js
│       ├── parseSlashes.js
│       ├── postComment.js
│       └── uploadImage.js
│
└── tests
    └── App.test.jsx
```

### The Developers
* [Zac St Louis](https://github.com/mrstlouis)
* [Max Lavicka](https://github.com/maxlavicka)
* [Adrian Meza](https://github.com/adrianme213)
