var express = require('express');
var router = express.Router();

var Event=require('../models/event')
const encrypt = require('../helpers/encrypt')
const jwt=require('jsonwebtoken')
const {auth}=require('../middleware/auth.js')

router.get('/', (req, res)=>{
  Event.find({})
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    res.status(500).json(err.message)
  });
})

router.post('/',auth,(req, res)=>{
  res.location('/quotes')
  // console.log(req.decoded)
  // res.json({test:req.decode})
  Event.create({
    name: req.body.event,
    location: req.body.location,
    address: req.body.address,
    user: req.decoded.id
  })
  .then((result) => {
    res.status(201).json(result)
  }).catch((err) => {
      if(err.error) {
        res.status(500).json(err.error)
      } else {
    res.status(500).json(err.message)
      }
  });
})

router.get('/search/:q', auth, (req, res)=>{
  console.log('query:',req.params.q)
  var regexQuery = {
    name: new RegExp(req.params.q, 'i')
  }
  console.log(regexQuery)
  Event.find(regexQuery)
  .then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    console.log(err)
  });
})

module.exports = router