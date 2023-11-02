const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../config.json')
//apply this checkToken to all users module to check users must be login
module.exports.checkToken = async( req, res, next) => {
     try {
          const tokenHeader = req.get('authorization')
          if (!tokenHeader) throw new Error('No JWT found')
          const token = tokenHeader.split(' ')[1]
          const decoded = jwt.verify(token, PRIVATE_KEY)
          if (!decoded) throw new Error('Next time, Hacker!')
          req.token = decoded
          next() 
     } catch(e) {
          next(e)
     }
}