const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // ?is this validator correct?
    validate: {
      validator: function (value) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value);
      },
      message: "Invalid email format",
    },
  },
  thoughts: {
    type: Schema.Types.ObjectId,
    ref: "thought",
    // TODO: Array of _id values referencing the Thought model
  },
  friends: {
    type: Schema.Types.ObjectId,
    ref: "user",
    // TODO: Array of _id values referencing the User model (self-reference)
  },
});

// FRIEND COUNTER:
// this virtual getter is using this userSchema and named it 'friendCount' the .get function
// is returning the number of friends by using this.friends.length
// TODO:FIND INFO ON THIS
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

module.exports = user;
