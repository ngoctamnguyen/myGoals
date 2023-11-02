const goalsModel = require('../models/goalsModel')
const { ObjectId } = require('mongodb');
const { json } = require('express');


//Goals
module.exports.addGoal = async (req, res, next) => {

     try {
          const userId = req.token._doc._id
          const results = await goalsModel.create({ ...req.body, user_id: userId })
          res.json({ success: true, data: results })

     } catch (e) {
          next(e)
     }
}

module.exports.getGoals = async (req, res, next) => {
     try {
          const userId = req.token._doc._id
          const results = await goalsModel.find({ user_id: userId })
          res.json({ success: true, data: results })
     } catch (e) {
          console.log(e)
     }
}

module.exports.getGoalById = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const results = await goalsModel.findOne({ _id: goalId, user_id: userId })
          res.json({ success: true, data: results })
     } catch (e) {
          console.log(e)
     }
}

module.exports.updateGoalById = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const title = req.body.title
          const description = req.body.description
          const deadline = req.body.deadline
          const results = await goalsModel.updateOne(
               { _id: goalId, user_id: userId },
               {
                    $set: {
                         title: title,
                         description: description,
                         deadline: deadline
                    }
               }
          )
          res.json({ success: true, data: results })
     } catch (e) {
          next(e)
     }
}

module.exports.deleteGoalById = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const results = await goalsModel.deleteOne({ _id: goalId, user_id: userId })
          res.json({ success: true, data: results })
     } catch (e) {
          next(e)
     }
}
module.exports.getPercentageComplete = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const results = await goalsModel.findOne({ _id: goalId, user_id: userId })
          let counting = 0
          for (let i = 0; i < results.steps.length; i++) {
               if (results.steps[i].status === 'completed') {
                    counting++
               }
          }
          const percent = (counting * 100) / results.steps.length
          res.json(percent)
     } catch (e) {
          next(e)
     }
}

//STEPs
module.exports.addStep = async (req, res, next) => {
     try {
          const step = req.body
          console.log(step.deadline)
          step._id = ObjectId()
          const goal_id = req.params.goal_id
          console.log(step)
          const results = await goalsModel.updateOne(
               { _id: goal_id },
               { $push: { steps: step } }
          )
          res.json({ success: true, data: results })
     } catch (e) {
          next(e)
     }
}

module.exports.getSteps = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const results = await goalsModel.findOne({ _id: goalId, user_id: userId })
          res.json({ success: true, data: results.steps })
     } catch (e) {
          next(e)
     }
}

module.exports.getStepById = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const stepId = req.params.step_id
          const results = await goalsModel.findOne(
               { _id: goalId, user_id: userId, "steps._id": stepId },
               { "steps.$": 1 })
          res.json({ success: true, data: results.steps[0] })
     } catch (e) {
          next(e)
     }
}

module.exports.updateStepById = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const userId = req.token._doc._id
          const stepId = req.params.step_id
          const title = req.body.title
          const description = req.body.description
          const status = req.body.status
          const deadline = req.body.deadline

          const results = await goalsModel.updateOne(
               { _id: goalId, user_id: userId, "steps._id": stepId },
               {
                    $set: {
                         "steps.$[obj].title": title,
                         "steps.$[obj].description": description,
                         "steps.$[obj].status": status,
                         "steps.$[obj].deadline": deadline
                    }
               },
               { arrayFilters: [{ "obj._id": stepId }] }
          )
          res.json(results)
     } catch (e) {
          next(e)
     }
}

module.exports.deleteStepById = async (req, res, next) => {
     try {
          const goalId = req.params.goal_id
          const stepId = req.params.step_id

          const results = await goalsModel.updateMany(
               { _id: goalId, "steps._id": stepId },
               { $pull: { steps: { _id: stepId } } }
          )
          res.json(results)
     } catch (e) {
          next(e)
     }
}
