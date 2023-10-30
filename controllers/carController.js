const Cars = require("../models/Cars");

exports.readAllCarandUsers = async (req, res) => {
  try {
    const cars = await Cars.find({});

    return res.status(400).json(cars);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createAllCarandUsers = async (req, res) => {
  try {
    const cars = new Cars({
      title: req.body.title,
      year: req.body.year,
    });

    await cars.save();
    res.json(cars);
  } catch (error) {
    res.status(500).send(error); // This would be an array of author IDs
  }
};
