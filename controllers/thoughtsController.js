const { ObjectId } = require('mongoose').Types;
const { User, Thought, Reaction } = require('../models');

module.exports = {
  //GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const getAllThoughts = await Thought.find({});
      res.json(getAllThoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const getThought = await Thought.findOne({ _id: req.params.thoughtId })
      
      if (!getThought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(getThought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      const newThought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }
      res.json(newThought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // TODO:CHECK ON THIS SAYING WRONG ROUTE IN INSOMNIA
  //PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const ThoughtUpdate = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      )

      if (!ThoughtUpdate) {
        console.log(err);
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(ThoughtUpdate);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const deleteThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deleteThought) {
        console.log(err);
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({ message: 'Thought successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
  },

  // REACTIONS SECTION:
  // POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const userReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!userReaction) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID' });
      }

      res.json(userReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // TODO: CHECK ON THIS NOT DELETING REACTION
  // DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const deleteReaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true },
      );

      if (!deleteReaction) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }

      res.json(deleteReaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
