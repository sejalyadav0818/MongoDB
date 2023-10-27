const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/userModels");
const PORT = 3000;
require("dotenv").config();

// Connect to MongoDB Atlas
console.log(process.env.DB_URI);
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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
