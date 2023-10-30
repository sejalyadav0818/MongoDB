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

![folder strucrire](https://github.com/sejalyadav0818/mongodb/assets/130818890/f6b21812-0ba6-4c1d-9eb0-b1f4317be896)


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


## `.env` file:

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

### In login To call a HOme API endpoint ( `/home` or any other endpoint you've protected using the `authenticateJWT` middleware) after logging in and obtaining a JWT token, follow these steps:

### Using Postman:

1. **Login First**:
    - Send a `POST` request to your `/login` endpoint with the necessary credentials to obtain a JWT.
    - In the response section, you should see a JWT token. Copy this token.

2. **Setup Request for Protected Endpoint**:
    - Create a new request in Postman or select an existing one that targets your protected endpoint (e.g., `http://localhost:3000/home`).
    - Set the HTTP method appropriately (`GET`, `POST`, etc.), depending on what the endpoint expects.

3. **Add Authorization Header**:
    - Go to the `Headers` tab in Postman.
    - Add a new header with the `Key` as `Authorization`.
    - For the `Value`, enter `Bearer ` followed by the token value you copied from the login response. It should look something like:
      ```
      Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
      ```

4. **Send the Request**:
    - Click the `Send` button to send the request to the protected endpoint.
    - If the token is valid and not expired, you should receive the expected data/response from the server. If the token is invalid or expired, you should receive an error, such as "Unauthorized".

# Most commonly used HTTP status codes and when to use them:

### 1xx: Informational
These are informational status codes. They indicate that the request was received and is being processed.

- `100 Continue`: The server has received the request headers and the client should proceed to send the request body.
- `101 Switching Protocols`: The requester has asked the server to switch protocols.

### 2xx: Success
These indicate that the request was successfully received, understood, and accepted.

- `200 OK`: Standard response for successful HTTP requests.
- `201 Created`: The request has been fulfilled and a new resource has been created.
- `202 Accepted`: The request has been accepted for processing, but processing is not complete.
- `204 No Content`: The server has successfully processed the request, but there's no content to send in the response.

### 3xx: Redirection
These indicate that further action needs to be taken by the user agent to fulfill the request.

- `301 Moved Permanently`: The URL of the requested resource has changed permanently.
- `302 Found`: Temporary redirection.
- `304 Not Modified`: The resource hasn't been modified since the last request.

### 4xx: Client Errors
These indicate that the client seems to have made an error.

- `400 Bad Request`: The server cannot or will not process the request due to something perceived to be a client error.
- `401 Unauthorized`: The client must authenticate itself to get the requested response.
- `403 Forbidden`: The client does not have access rights to the content.
- `404 Not Found`: The server can't find the requested resource.
- `405 Method Not Allowed`: The request method is not supported for the requested resource.
- `429 Too Many Requests`: The user has sent too many requests in a given amount of time ("rate limiting").

### 5xx: Server Errors
These indicate that the server failed to fulfill a valid request.

- `500 Internal Server Error`: A generic error message when an unexpected condition was encountered.
- `501 Not Implemented`: The server does not have the functionality to fulfill the request.
- `502 Bad Gateway`: The server, while working as a gateway, got an invalid response from the upstream server.
- `503 Service Unavailable`: The server cannot handle the request, usually due to maintenance or overloading.
- 
```javaScript
      app.get('/success', (req, res) => {
          res.status(200).json({ message: "Request was successful" });
});
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
     
 #[Check My postman collections](https://documenter.getpostman.com/view/26990240/2s9YRGypPi)
 
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


