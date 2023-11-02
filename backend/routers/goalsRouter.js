const express = require('express')
const router = express.Router()

const { getGoals, getGoalById, addGoal, updateGoalById, deleteGoalById, getPercentageComplete } = require('../controllers/goalsControllers')
const { getSteps, getStepById, addStep, updateStepById, deleteStepById } = require('../controllers/goalsControllers')


//CRUS Goals
router.get('/', getGoals)
router.get('/:goal_id', getGoalById)
router.post('/', addGoal)
router.patch('/:goal_id', updateGoalById)
router.delete('/:goal_id', deleteGoalById)
router.get('/percent/:goal_id', getPercentageComplete)

//CRUD STEPs
router.get('/goal/:goal_id/steps', getSteps)
router.get('/goal/:goal_id/steps/:step_id', getStepById)
router.post('/goal/:goal_id/steps', addStep)
router.patch('/goal/:goal_id/steps/:step_id', updateStepById)
router.delete('/goal/:goal_id/steps/:step_id', deleteStepById)

module.exports = router;