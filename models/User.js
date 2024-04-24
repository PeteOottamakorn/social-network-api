const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema();
// username must be string, unique, required, and trimmed

// email must be string, unique, required, and must match a valid email address

// thoughts should be array reference to Thought model

// friends should be array reference to User model (self-reference)

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query

const User = model("user", userSchema);

module.exports = User;
