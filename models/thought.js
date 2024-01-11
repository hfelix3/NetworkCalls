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
    // TODO:USE GETTER METHOD FOR TIME STAMP
    // ?IS THIS CORRECT?
    get: function () {
      return Date.now();
    },
  },
  username: {
    type: String,
    required: true,
  },
  //TODO: Array of nested documents created with the reactionSchema
  // ?IS THIS CORRECT?
  reactions: [reactionSchema],
});

// REACTIONS COUNTER
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

module.exports = thought;
