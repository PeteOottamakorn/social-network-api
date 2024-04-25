const { Schema, model } = require("mongoose");

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
      default: Date.now(),
    },
    // username must be a string and required. This will be the user that created the thought
    username: {
      type: String,
      required: true,
    },
    // reactions are like replies and will be an array of nested documents created with the reactionSchema
    reactions: [],
  },
  {
    // Create virtual called reactionCount to retrive length of the thought's reactions array field on query
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
// Create reactionSchema
const reactionSchema = new Schema({
  // Need reactionId that will use Mongoose's ObjectId data type and default to a new ObjectId
  reactionId: {
    type: Schema.Types.ObjectId,
    default: new ObjectId(),
  },
  // Need reactionBody that will be a string, required, and have a 280 character maximum
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  // Need username that will be a string and required
  username: {
    type: String,
    required: true,
  },
  // Need createdAt that will have a date with a default value of the current timestamp and formatted on query using a getter method
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
