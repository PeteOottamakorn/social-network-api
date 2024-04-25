const { Schema, model } = require("mongoose");

// Schema to create User model
const userSchema = new Schema(
  {
    // username must be string, unique, required, and trimmed
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // email must be string, unique, required, and must match a valid email address
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i.test(v);
        },
        message: (input) => `${input.value} is not a valid email address!`,
      },
    },
    // thoughts should be array reference to Thought model
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    // friends should be array reference to User model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Create a virtual called friendCount that retrieves the length of the user's friends array field on query
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const User = model("user", userSchema);

module.exports = User;
