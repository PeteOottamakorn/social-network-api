const { Schema, Types } = require("mongoose");

// Create reactionSchema
const reactionSchema = new Schema(
  {
    // Need reactionId that will use Mongoose's ObjectId data type and default to a new ObjectId
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
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
      default: function () {
        const timestamp = Date.now();
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleString();

        return formattedDate;
      },
    },
  },

  {
    // Create virtual called reactionCount to retrive length of the thought's reactions array field on query
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
