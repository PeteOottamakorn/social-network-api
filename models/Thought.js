const { Schema, model } = require("mongoose");
const reactionSchema = require("./Reaction");

// Schema to create Thoughts model
const thoughtSchema = new Schema(
  {
    // thoughtText must be string, required, and be between 1 to 280 characters
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxLength: 280,
    },
    // createdAt must have a date with a default value of the current timestamp and formatted on query using a getter method
    createdAt: {
      type: Date,
      default: function () {
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString();

        return formattedDate;
      },
    },
    // username must be a string and required. This will be the user that created the thought
    username: {
      type: String,
      required: true,
    },
    // reactions are like replies and will be an array of nested documents created with the reactionSchema
    reactions: [reactionSchema],
  },
  {
    // Create virtual called reactionCount to retrive length of the thought's reactions array field on query
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);
// const Reaction = model("reaction", reactionSchema);

module.exports = Thought;
