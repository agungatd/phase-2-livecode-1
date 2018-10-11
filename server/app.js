var express = require('express');
var app = express();
var cors = require('cors')
require('dotenv').config()

const mongoose = require('mongoose')


const eventRoutes = require('./router/event.js')
const userRoutes = require('./router/user.js')

mongoose.connect('mongodb://localhost:27017/live-code1-phase-2', {
    useNewUrlParser: true
});

app.use(cors())
app.use(express.urlencoded({
    extended: false
}))
app.use(express.json())

app.use('/users', userRoutes)
app.use('/events', eventRoutes)

app.listen(3000, function () {
    console.log('listen at port 3000')
});