const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
//GET all users
async getUsers(req, res) {
  try {
    const getAllUsers = await User.find({});
    res.json(getAllUsers);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

//GET a single user by its _id and populated thought and friend data
async getSingleUser(req, res) {
  try {
    const getUser = await User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('thoughts')
      .populate('friends');

    if (!getUser) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    res.json(getUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
},

//POST a new user:.
async createUser(req, res) {
  try {
    const createUser = await User.create(
      req.body
    );
    res.json(createUser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

//PUT to update a user by its _id
async updateUser(req, res) {
  try {
    const userUpdate = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: { username: req.body.username } },
      { new: true }
      )

    if (!userUpdate) {
      res.status(404).json({ message: 'No user with this id!' });
    }

    res.json(userUpdate);
  } catch (err) {
    res.status(500).json(err);
  }
},

//DELETE to remove user by its _id
async deleteUser(req, res) {
  try {
    const deleteUser = await User.findOneAndDelete({ _id: req.params.userId });

    if (!deleteUser) {
      return res.status(404).json({ message: 'No such user exists' })
    }

    res.json({ message: 'user successfully deleted' });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

// FRIEND COUNTER SECTION:
// TODO: POST to add a new friend to a user's friend list
// TODO: ADD ERROR CATCH AND CONSOLE
async addFriend(req, res) {
  console.log('You are adding a new friend');
  console.log(req.body);

  try {
    const addAFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body.friendId || req.body.friendId } },
      { new: true },
    );

    if (!addAFriend) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(addAFriend);
  } catch (err) {
    res.status(500).json(err);
  }
},

// TODO: DELETE to remove a friend from a user's friend list
async removeFriend(req, res) {
  try {
    // ?CHANGE TO findOneAndDelete()?
    const deleteFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: params.friendId } },
      { new: true },
    );

    if (!deleteFriend) {
      return res
        .status(404)
        .json({ message: 'No user found with that ID :(' });
    }

    res.json(deleteFriend);
  } catch (err) {
    res.status(500).json(err);
  }
},

};
