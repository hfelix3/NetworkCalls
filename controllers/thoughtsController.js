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
    const Thought = await Thought.findOne({ _id: req.params.courseId })
      .select('-__v');

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
      { runValidators: true, new: true }
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
    const Thought = await Thought.findOneAndDelete({ _id: req.params.ThoughtId });

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

// // TODO: POST to create a reaction stored in a single thought's reactions array field
// router.put('/:id', async (req, res) => {
//   const ThoughtData = await Thought.update(req.body, {
//     where: {
//       id: req.params.id,
//       user_id: req.session.user_id,
//     },
//   });

//   return res.json(ThoughtData);
// }),

// // TODO: DELETE to pull and remove a reaction by the reaction's reactionId value
// router.delete('/:id', async (req, res) => {
//   try {
//     const ThoughtData = await Thought.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!ThoughtData) {
//       res.status(404).json({ message: 'No thought found with this id!' });
//       return;
//     }

//     res.status(200).json(ThoughtData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// }),

};
