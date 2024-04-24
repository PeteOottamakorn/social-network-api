const { Schema, model } = require("mongoose");

// Schema to create Thoughts model
const thoughtSchema = new Schema();

// thoughtText must be string, required, and be between 1 to 280 characters

// createdAt must have a date with a default value of the current timestamp and formatted on query using a getter method

// username must be a string and required. This will be the user that created the thought

// reactions are like replies and will be an array of nested documents created with the reactionSchema

// Create virtual called reactionCount to retrive length of the thought's reactions array field on query

// Create reactionSchema

// Need reactionId that will use Mongoose's ObjectId data type and default to a new ObjectId

// Need reactionBody that will be a string, required, and have a 280 character maximum

// Need username that will be a string and required

// Need createdAt that will have a date with a default value of the current timestamp and formatted on query using a getter method

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
