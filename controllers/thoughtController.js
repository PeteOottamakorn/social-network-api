const { User, Thought, Reaction } = require("../models");

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const allThoughts = await Thought.find();
      console.log(allThoughts);
      res.status(200).json(allThoughts);
    } catch (err) {
      console.log("We hit the error");
      res.status(500).json(err);
    }
  },
  // Get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        res.status(404).json({ message: `There is no thought with that ID!` });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a new thought (need to push created thought's _id to the associated user's thoughts array)
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const userThought = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!userThought) {
        return res
          .status(404)
          .json({ message: "There is no user with that ID!" });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought by its _id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: `There is no thought with that ID!` });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a thought by its _id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: `There is no thought with that ID!` });
      }

      res.status(200).json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a reaction stored in the associated thought's reactions array
  async createReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: `There is no thought with that ID!` });
      }

      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a reaction by its reactionId value
  async deleteReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );

      if (!reaction) {
        res.status(404).json({ message: `There is no reaction with that ID!` });
      }

      res.status(200).json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
