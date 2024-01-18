const { User, Thought } = require('../models');

module.exports = {
  //GET to get all thoughts
  async getThoughts(req, res) {
    try {
      const Thoughts = await Thought.find();
      res.json(Thoughts);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //GET to get a single thought by its _id
  async getSingleThought(req, res) {
    try {
      const Thought = await Thought.findOne({
        _id: req.params.courseId,
      }).select('-__v');

      if (!Thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(Thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
  async createThought(req, res) {
    try {
      const Thought = await Thought.create(req.body);
      res.json(Thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  //PUT to update a thought by its _id
  async updateThought(req, res) {
    try {
      const Thought = await Thought.findOneAndUpdate(
        { _id: req.params.ThoughtId },
        { $set: req.body },
        { runValidators: true, new: true },
      );

      if (!Thought) {
        console.log(err);
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(Thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  //DELETE to remove a thought by its _id
  async deleteThought(req, res) {
    try {
      const Thought = await Thought.findOneAndDelete({
        _id: req.params.ThoughtId,
      });

      if (!Thought) {
        console.log(err);
        res.status(404).json({ message: 'No thought with that ID' });
      }

      await User.deleteMany({ _id: { $in: course.Users } });
      res.json({ message: 'thought and users deleted!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // TODO: POST to create a reaction stored in a single thought's reactions array field
  async addReaction(req, res) {
    console.log('You are adding a reaction');
    console.log(req.body);

    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // TODO: DELETE to pull and remove a reaction by the reaction's reactionId value
  async removeReaction(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { Reaction: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true },
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
