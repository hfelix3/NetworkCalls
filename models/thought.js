const { Schema, model } = require('mongoose');
// line 3 appeared when I typed thought on line 29.
const { thought } = require('.');
const reactionSchema = require('./reaction');

// Schema to create thought model
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280,
  },
  createdAt: {
    type: Date,
    // TODO:MAKE SURE THIS DEFAULT IS CORRECT.
    default: Date.now,
    get: function () {
      return Date.now();
    },
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema],
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);

// REACTIONS COUNTER
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = thought;
