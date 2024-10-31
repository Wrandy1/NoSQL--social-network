const User = require('./User');
const Thought = require('./Thought');
const Reaction = require('./Reaction');
router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = { User, Thought, Reaction };
