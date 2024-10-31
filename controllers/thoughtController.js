const { Thought, User } = require('../models');
const mongoose = require('mongoose');

const thoughtController = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const dbThoughtData = await Thought.find({});
      res.json(dbThoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Get a single thought by ID
  async getSingleThought(req, res) {
    try {
        const dbThoughtData = await Thought.findOne(req.params.thoughtId)

        if (!dbThoughtData) {
            return res.status(404).json(
                {
                    message: 'No thought found.'
                })
        
            }

        res.json(dbThoughtData);
    } catch (error) {
        res.status(500).json(error)
    }
},

  // Create a new thought
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a thought by ID
  async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a thought by ID
  async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        body,
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id:  req.params.reactionId},
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.reactionId},
        { $pull: { reactions: { reactionId:  req.params.reactionId } } },
        { new: true }
      );
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = thoughtController;