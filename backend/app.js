const express = require('express')
const app = express();
const mongoose = require('mongoose')
const cors = require('cors')
const { DB_URL } = require('./config.json')
const usersRouter = require('./routers/usersRouter')
const goalsRouter = require('./routers/goalsRouter')
const { checkToken} = require('./middlewares/checkToken')

mongoose.connect(DB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
})
.then(() => {
            console.log('DB connected')
            app.listen(3000, () => console.log('Listening on 3000 port'))
})
.catch(error => 
            console.error(error)
)

//middleware
app.use(cors())
app.use(express.json())

//routes
app.use('/users', usersRouter)
app.use('/goals', checkToken, goalsRouter)

app.use(function(err, req, res, next) {
     res.status(500).json({success: false, data: err.message})
})