const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
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
      message: 'Invalid email format',
    },
  },
  thoughts: {
    type: Schema.Types.ObjectId,
    ref: 'Thought',
    // TODO: Array of _id values referencing the Thought model
    // get explanation on how these are working
  },
  friends: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    // TODO: Array of _id values referencing the User model (self-reference)
  },
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
}
);

// FRIEND COUNTER:
// this virtual getter is using this userSchema and named it 'friendCount' the .get function
// is returning the number of friends by using this.friends.length
UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', UserSchema);
module.exports = User;
