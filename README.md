# Post-It App : Introduction

 Post-It is a social media app that allows you to post anything (text, images, video, and/or audio) on a single post-it.  A post-it is a single post on the post-it app, just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment to a post (post-it). Although currently, this app will only accept texts as replies.

## Project Requirements Satisfied

- [x] Users can signup and login to their accounts.
- [x] Users can access all causes as well as create a new cause, edit their created cause and also delete what they've created.
- [x] Other users cannot delete posts and comments made by another user.
- [x] Soft delete was implemented on all resources; when resources are deleted, its still stored on the database collection but it ceases to be returned if fetched.
- [x] All Avatar requirements were satisfied.

### Entity Relationship Diagram And Live Link

> 🔗   [Entity Relationship Diagram Link](https://dbdesigner.page.link/14Twuq7fN25yGjNP6)

> 🔗    [Live Link]()

### API Documentation

### Installation Guide

- Clone this repository `https://github.com/kingsleycj/post-it-app`

- The `develop` branch is the most stable branch at any given time, ensure you're working from it.

- Run`npm install` to install all dependencies

- Create an .env file in your project root folder and add your variables.

### Usage

> Run `npm start` to start the application.

> Connect to the API using Postman on port `5000`.

### Tech Stack Used

- NodeJS (LTS version)
- ExpressJS
- JavaScript
- MongoDB Database
- Mongoose ODM (Object Data Mapper)
- Dotenv
- Bcrypt
- Joi
- Jsonwebtoken
- Body-parser
- Nodemon

## App Architecture and Folder Structure

 A clean architecture was implemented during the process of building this app.

### Folder Structure

```
├── controllers
│   ├── comment.controller.js
│   ├── post.controller.js
│   ├── user.controller.js
├── middlewares
│   ├── validator.js
├── models
│   ├── comment.model.js
│   ├── post.model.js
│   ├── user.model.js
├── routes
│   ├── auth.route.js
│   ├── comment.route.js
│   ├── index.js
│   ├── post.route.js
│   ├── user.route.js
├── utils
│   ├── avatar.js
│   ├── imgTag.js
├── .gitignore
├── app.js
├── package.json
└── README.md
```

### Author
 [Kingsley CJ](https://github.com/kingsleycj)