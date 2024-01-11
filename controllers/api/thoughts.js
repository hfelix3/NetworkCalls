const router = require('express').Router();
const { Thought } = require('../models');

//GET to get all thoughts
router.get('/', async (req, res) => {
    try {
      const ThoughtData = await thought.findAll();
      res.json(ThoughtData);
    } catch (err) {
      console.log(err);
        res.status(500).json(err);
    }
  });
  
//GET to get a single thought by its _id
  router.get('/:id', async (req, res) => {
    try {
      const ThoughtData = await Tag.findOne({ 
        where: {
          id:req.params.id
        },
      });
  
      res.status(200).json(ThoughtData);
  
    } catch (error) {
      console.error('Error fetching Comment:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)
// ?NOT SURE HOW TO DO THIS ONE
router.post('/', async (req, res) => {
    try {
      const newThought = await Thought.create({
        ...req.body,
        user_id: req.session.user_id,
      });
  
      res.status(200).json(newThought);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  });

//PUT to update a thought by its _id
// ? DO I NEED TO CHANGE THE USER ID TO THOUGHT ID?
router.put('/:id', async(req, res) => {
    const ThoughtData = await Thought.update(
        req.body,
      {
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      }
    );
  
    return res.json(ThoughtData);
  });

//DELETE to remove a thought by its _id
// ?DOES THIS ONE ALSO NEED TO CHANGE
router.delete('/:id', async (req, res) => {
  try {
    const ThoughtData = await Though.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!ThoughtData) {
      res.status(404).json({ message: 'No thought found with this id!' });
      return;
    }

    res.status(200).json(ThoughtData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
