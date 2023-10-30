// Select Multiple Cars Associated with the Same User
const UserCar = require("../models/userCars");

//show all users associated with the given car
exports.readcartoUsers = async (req, res) => {
  const carId = req.query.carId;
  try {
    const userCars = await UserCar.find({ carId: carId })
      .populate("userId")
      .exec();

    const users = userCars.map((uc) => uc.userId);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// show all cars associated with the given user
exports.readuserToCars = async (req, res) => {
  const userId = req.query.userId;
  try {
    const CarWithAllUsers = await UserCar.find({ userId: userId })
      .populate("carId")
      .exec();
      const users = CarWithAllUsers.map((uc) => uc.userId);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error);
    }
  };
