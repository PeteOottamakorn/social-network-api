const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a single user by its _id populated with thought and friend data
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId }).populate([
        "thoughts",
        "friends",
      ]);

      if (!user) {
        res.status(404).json({ message: `There is no user with that ID!` });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Post a new user
  // Update a user by its _id
  // Delete a user by its _id
  // Add a new friend to a user's friend list
  // Delete a friend from a user's friend list
};
