const { Schema, model } = require('mongoose');
const ReactionSchema = require('./Reaction');

// Schema to create thought model
const ThoughtSchema = new Schema(
  {
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
  reactions: [ReactionSchema],
},
{
  toJSON: {
    getters: true,
    virtuals: true,
  },
  id: false,
}
);

// REACTIONS COUNTER
ThoughtSchema.virtual('ReactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;
