const router = require('express').Router();
const { User } = require('../models');

// Get all users
router.get('/', async (req, res) => {
    try {
      const UserData = await User.findAll();
      res.json(UserData);
    } catch (err) {
        res.status(500).json(err);
    }
  });
  
// Get one User
  router.get('/:id', async (req, res) => {
    try {
      const UserData = await Tag.findOne({ 
        where: {
          id:req.params.id
        },
      });
  
      res.status(200).json(UserData);
  
    } catch (error) {
      console.error('Error fetching Comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//update a user
router.put('/:id', async(req, res) => {
    const UserData = await User.update(
        req.body,
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
  
    return res.json(UserData);
  });

//Delete user
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
    res.status(500).json(err);
  }
});

module.exports = router;
