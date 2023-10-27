const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/userModels");
const PORT = 3000;

// MongoDB Atlas connection string
const DB_URI =
  "mongodb+srv://sejalyadav122:0VUM0yQN0XSxlL97@cluster0.b9eybdu.mongodb.net/?retryWrites=true&w=majority";

// Connect to MongoDB Atlas
mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });

async function insertUser() {
  await User.create({
    name: "sejal",
    email: "sejal@gmail.com",
    age: 21,
  });
}
app.get("/", (req, res) => {
  insertUser();
  res.send("User Inserted successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
