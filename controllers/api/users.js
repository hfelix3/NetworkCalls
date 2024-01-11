const router = require('express').Router();
const { User } = require('../models');

//GET all users
router.get('/', async (req, res) => {
  try {
    const UserData = await User.findAll();
    res.json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//GET a single user by its _id and populated thought and friend data
router.get('/:id', async (req, res) => {
  try {
    const UserData = await Tag.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(UserData);
  } catch (error) {
    console.error('Error fetching Comment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//POST a new user:
router.post('/', async (req, res) => {
  try {
    const newUser = await User.create({
// TODO: CHANGE TO SHOW USERNAME AND EMAIL?
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//PUT to update a user by its _id
router.put('/:id', async (req, res) => {
  const UserData = await User.update(req.body, {
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  });

  return res.json(UserData);
});

//DELETE to remove user by its _id
router.delete('/:id', async (req, res) => {
  try {
    const UserData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!UserData) {
      res.status(404).json({ message: 'No User found with this id!' });
      return;
    }

    res.status(200).json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: POST to add a new friend to a user's friend list
// TODO: ADD ERROR CATCH AND CONSOLE
router.put('/:id', async (req, res) => {
  const UserData = await User.update(req.body, {
    where: {
      id: req.params.id,
      user_id: req.session.user_id,
    },
  });

  return res.json(UserData);
});

// TODO: DELETE to remove a friend from a user's friend list
router.delete('/:id', async (req, res) => {
  try {
    const UserData = await User.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!UserData) {
      res.status(404).json({ message: 'No User found with this id!' });
      return;
    }

    res.status(200).json(UserData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
