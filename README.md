<h1 align="center">Post-It App</h1>

## Introduction

Post-It is a social media app that allows you to post anything (text, images, video, and/or audio) on a single post-it. A post-it is a single post on the post-it app, just like a tweet. Other users can reply to a post-it. Replying to a post-it is like adding a comment to a post (post-it). Although currently, this app will only accept texts as replies.

## Project Requirements Satisfied

- [x] Users can signup and login to their accounts.
- [x] Users can access all causes as well as create a new cause, edit their created cause and also delete what they've created.
- [x] A user cannot delete posts and comments made by another user.
- [x] Soft delete was implemented on all resources; when resources are deleted, its still stored on the database collection but it ceases to be returned if fetched.
- [x] All Avatar requirements were satisfied.

```json
{
    "message": "User fetched successfully",
    "fetchedUser": {
        "imgTag": "<img src=\"https://api.dicebear.com/5.x/bottts/svg?seed=james-g5xm5-gmail-z3orx-com&size=200&radius=50\" alt=\"james's avatar\">",
        "avatar": "https://api.dicebear.com/5.x/bottts/svg?seed=james-g5xm5-gmail-z3orx-com&size=200&radius=50",
        "username": "james",
        "email": "james@gmail.com"
    }
}
```

### Links

- [Entity Relationship Diagram Link](https://dbdesigner.page.link/14Twuq7fN25yGjNP6)

- [API Documentation](https://justpostit-2v8i.onrender.com/api/v1/docs)

- [Post-It API Live Link](https://justpostit-2v8i.onrender.com/api/v1/)

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
│   ├── server.route.js
│   ├── post.route.js
│   ├── user.route.js
├── utils
│   ├── avatar.js
│   ├── greeting.js
│   ├── imgTag.js
├── .gitignore
├── app.js
├── package.json
└── README.md
```

### Explanations

- Soft delete was implemented by setting the `delete` default property of each resources to `false`, and only converting them to `true` after it has been updated through the **DELETE** endpoint.

```js
{
    deleted: {
      type: Boolean,
      default: false,
    }
}
```

- I used the mongoose method of `.findOneAndUpdate()` on the **DELETE** endpoints to update the `deleted` property on each resource.

```js
{
    await Resource.findOneAndUpdate(
        { _id: req.params.commentId },
        { deleted: true },
        { new: true }
    )
}
```

- As previously stated above, the _deleted resources_ are not returned because their properties have been changed to `true`. However, they're still stored on the linked MONGODB database.

### Avatar API

Dicebear API was used for the generation of avatars.

![avatar image](https://api.dicebear.com/5.x/avataaars/svg?seed=king-g5xm5-gmail-z3orx-com&size=200&radius=50)

### Author

[Kingsley CJ](https://github.com/kingsleycj)
