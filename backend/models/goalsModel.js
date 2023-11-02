const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     user_id: mongoose.Schema.Types.ObjectId,
     title: String,
     description: String,
     deadline: Number,
     steps: [
          {
               title: String,
               description: String,
               status: String,
               deadline: Number
          }]
},{
     timestamps: true
})

module.exports = mongoose.model('Goals', userSchema)