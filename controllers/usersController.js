const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
//GET all users
async getUsers(req, res) {
  try {
    const users = await User.find();

    res.json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

//GET a single user by its _id and populated thought and friend data
async getSingleUser(req, res) {
  try {
    const user = await user.findOne({ _id: req.params.userId })
      .select('-__v');

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    res.json(userData);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

//POST a new user:
async createUser(req, res) {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

//PUT to update a user by its _id
async updateUser(req, res) {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.userId })
    .select('-__v');

    if (!user) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
},

//DELETE to remove user by its _id
async deleteUser(req, res) {
  try {
    const user = await User.findOneAndRemove({ _id: req.params.userId });

    if (!user) {
      return res.status(404).json({ message: 'No such user exists' })
    }

    res.json({ message: 'user successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// // TODO: POST to add a new friend to a user's friend list
// // TODO: ADD ERROR CATCH AND CONSOLE
// router.put('/:id', async (req, res) => {
//   const UserData = await User.update(req.body, {
//     where: {
//       id: req.params.id,
//       user_id: req.session.user_id,
//     },
//   });

//   return res.json(UserData);
// });

// // TODO: DELETE to remove a friend from a user's friend list
// router.delete('/:id', async (req, res) => {
//   try {
//     const UserData = await User.destroy({
//       where: {
//         id: req.params.id,
//         user_id: req.session.user_id,
//       },
//     });

//     if (!UserData) {
//       res.status(404).json({ message: 'No User found with this id!' });
//       return;
//     }

//     res.status(200).json(UserData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

};
