# MongoDB & Node :

### 1. Setup:

First, initialize a new Node.js project if you haven't already:

```bash
mkdir mongo-api
cd mongo-api
npm init -y
```

Install the necessary libraries:

```bash
npm install express mongoose
```

### 2. Connect to MongoDB Atlas:

Ensure you have your MongoDB Atlas connection string.

Create a file `server.js`:

```javascript
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = 3000;

const DB_URI = "YOUR_MONGODB_ATLAS_CONNECTION_STRING";

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

### 3. Define a Model and Routes:

Define a simple schema for a "Todo" model:

```javascript
const todoSchema = new mongoose.Schema({
  task: String,
  completed: { type: Boolean, default: false },
});

const Todo = mongoose.model("Todo", todoSchema);
```

### 4.Folder Structure:

/myapp
|-- /node_modules
|-- /src
| |-- /config
| | |-- index.js
| | |-- db.js
| |-- /models
| | |-- User.js
| | |-- Post.js
| |-- /routes
| | |-- index.js
| | |-- userRoutes.js
| | |-- postRoutes.js
| |-- /controllers
| | |-- userController.js
| | |-- postController.js
| |-- /middlewares
| | |-- authMiddleware.js
| | |-- errorMiddleware.js
| |-- /public
| | |-- /images
| | |-- /css
| | |-- /js
| |-- /views
| |-- app.js
|-- /tests
| |-- user.test.js
| |-- post.test.js
|-- package.json
|-- .gitignore
|-- .env (to store environment variables, like the database connection string)

# How to use routes, controllers, middleware in Node js ?

### Routes:

Routes in Express define endpoints at which requests can be made. Routes specify how an application should respond to client requests to specific endpoints like URIs (or paths) and specific HTTP request methods (GET, POST, etc.).

For example:

```javascript
app.get('/users', usersController.getAll);
app.post('/users', usersController.create);
```

### Controllers:

Controllers take in a client request (from a route) and return a suitable response to the client. They contain the logic that gets executed when a specific route is hit. By separating routes and controllers, you can achieve a clear separation of concerns, making your code more organized and modular.

For instance, a basic `usersController` could look like:

```javascript
const User = require('../models/User');

exports.getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

exports.create = async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};
```

### Middleware:

Middleware functions are functions that have access to the request (`req`), the response (`res`), and the next function in the application’s request-response cycle (`next`). They can execute any code, make changes to the request and response objects, or end the request-response cycle.

Middleware functions can:

- Execute any code.
- Make changes to the request and the response objects.
- End the request-response cycle.
- Call the next middleware in the stack.

For instance, to check if a user is authenticated:

```javascript
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}
```

You would use this middleware like so:

```javascript
app.post('/post', isAuthenticated, postController.create);
```

The `isAuthenticated` middleware will run before the `postController.create` function. If the user is authenticated, it will move to the next function in line (which is the controller function). If not, it will redirect the user to the login page.

### Tips:

1. **Separation of Concerns**: Always try to separate your logic. Routes should only handle routing, controllers should handle logic, and models should handle data.
2. **Use Middleware Wisely**: Middleware can be incredibly powerful but can also make debugging tricky if you're not careful. Always ensure you call `next()` in your middleware to avoid getting stuck.
3. **Modularity**: Try to make your middleware reusable. This means you can apply them to any route you want without repeating code.
4. **Error Handling**: It's a good idea to have centralized error handling. This can be achieved using middleware that catches errors and sends appropriate responses.


# `.env` file:

### 1. Install dotenv:

First, you need to install the `dotenv` package:

```bash
npm install dotenv
```

### 2. Create an .env file:

In the root directory of your project, create a file named `.env`.

Inside the `.env` file, set your environment-specific variables:

```env
DB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/your_db?retryWrites=true&w=majority
```

Remember to replace the above URI with your actual MongoDB Atlas connection string.

### 3. Load `.env` values in your Node.js application:

At the very top of your main application file (usually `app.js` or `server.js`), add the following:

```javascript
require('dotenv').config();
```

This line loads the variables from the `.env` file and makes them available via `process.env`.

### 4. Use the DB_URI in your application:

Now, wherever you need to connect to the database, use the `DB_URI` environment variable:

```javascript
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
```

### 5. Keep .env confidential:

Make sure not to commit your `.env` file to version control (e.g., Git). You should keep it confidential, especially when it contains sensitive information such as database credentials.

To do this, add `.env` to your `.gitignore` file:

```plaintext
# .gitignore
node_modules/
.env
```




### Simple Tasks:

1. **Initial Setup**:

   - Set up a new Node.js project using `npm init`.
   - Install necessary libraries (`express`, `mongoose`).
   - Connect to MongoDB Atlas using `mongoose`.

2. **Basic CRUD for Single Model (e.g., User)**:

   - Define a simple schema for a User model with fields: `username`, `email`, and `password`.
   - Implement routes to:
     - Create a new user (`POST` request).
     - Retrieve all users (`GET` request).
     - Retrieve a single user by `id` (`GET` request).
     - Update a user by `id` (`PUT` request).
     - Delete a user by `id` (`DELETE` request).

3. **Test with Postman**:
   - Use Postman to make requests to your API for each of the above routes.
   - Ensure you can successfully create, retrieve, update, and delete users.

### Intermediate Tasks:

4. **Data Validation**:

   - Implement validation for your User model (e.g., email format, password length).
   - Handle validation errors and send appropriate error messages as responses.

5. **Pagination**:

   - Modify the "retrieve all users" route to support pagination.
   - Accept `page` and `limit` parameters in the request to control the number of users returned.

6. **Authentication**:

   - Implement user authentication using JWT (JSON Web Tokens).
   - Add signup (`POST /signup`) and login (`POST /login`) routes.
   - Protect certain routes to ensure they can only be accessed by authenticated users.

7. **Advanced Queries**:
   - Add a route to search for users based on username or email.
   - Implement sorting users by date created or username.

### Advanced Tasks:

8. **Relationships**:

   - Create a second model, e.g., `Post` with fields: `title`, `content`, and `author`.
   - Establish a relationship between `User` and `Post` (each user can have multiple posts).
   - Implement routes to:
     - Create a new post for a user.
     - Retrieve all posts for a specific user.
     - Update and delete posts.

9. **Middleware**:

   - Implement Express middleware to handle repetitive tasks, such as logging every request or checking authentication status.

10. **Error Handling**:

- Implement centralized error handling in Express to catch and handle all types of errors, sending appropriate responses to the client.

11. **Rate Limiting**:

- Implement rate limiting to prevent abuse of your API. Limit the number of requests a single IP can make in a specific time frame.
