const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const key = process.env.KEY;

exports.createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "A user with this email already exists." });
    }

    const user = new User(req.body);
    await user.save();
    exports.readUser = async (req, res) => {
      try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send();
        res.send(user);
      } catch (error) {
        res.status(500).send(error);
      }
    };

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Invalid user data.", details: error.errors });
    }

    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.readAllUserwithSearcPaging = async (req, res) => {
  const pageNumber = parseInt(req.query.page) || 1; // Ensure it's a number
  const pageSize = 1; // Number of items per page
  const searchQuery = req.query.search || {};
  const sortBy = req.query.sortBy || "username";
  const order = req.query.order === "desc" ? -1 : 1;

  if (!pageNumber || pageNumber < 1) {
    return res.status(400).json({ message: "Invalid page number." });
  }

  let query = {};
  if (searchQuery) {
    query = {
      $or: [
        { username: new RegExp(searchQuery, "gi") },
        { email: new RegExp(searchQuery, "gi") },
        { password: new RegExp(searchQuery, "gi") },
      ],
    };
  }
  try {
    User.paginate(
      query,
      { page: pageNumber, limit: pageSize, sort: { [sortBy]: order } },
      (err, result) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error occurred while fetching users." });
        }
        const { docs, total, limit, page, pages } = result;
        res.json({ users: docs, total, limit, page, pages });
      }
    );
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.readUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("ehwiief");
  console.log(req.body.username, req.body.email, req.body.password);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).send({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error registering user" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, key, {
      expiresIn: "1d",
    });
    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in" });
  }
};

exports.home = (req, res) => {
  res.status(200).json({ message: "Hello, this is the home page" });
};

// exports.readAllUser = async (req, res) => {
//   try {
//     const user = await User.find({});
//     if (!user) return res.status(404).send();
//     res.send(user);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };

//check : http://localhost:3000/users/?serch=sejal&page=1&sortby=username&order=desc

////check : http://localhost:3000/users/?serch=sejal&page=1&sortby=username&order=desc