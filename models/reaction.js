const { Schema, model } = require('mongoose');

const ReactionSchema = new Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    get: function () {
      return Date.now();
    },
  },
},
{
  toJSON: {
    getters: true,
  },
  id: false,
}
);

const Reaction = model('Reaction', ReactionSchema);
module.exports = Reaction;
