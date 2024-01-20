const router = require('express').Router();
const ThoughtRoutes = require('./ThoughtRoutes');
const UserRoutes = require('./UserRoutes');

router.use('/Thoughts', ThoughtRoutes);
router.use('/Users', UserRoutes);

module.exports = router;
