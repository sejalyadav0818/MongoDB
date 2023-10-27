const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/User");
const PORT = 3000;
require("dotenv").config();
const userRoute = require("./routes/userRoutes");
const bodyPareser = require("body-parser");
app.use(bodyPareser.json());

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).send({ error: "Invalid JSON" });
  }
  next(err);
});

// Connect to MongoDB Atlas
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

app.use(express.json());
app.use(userRoute);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
