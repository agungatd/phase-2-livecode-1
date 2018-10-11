const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = {
  auth : (req, res, next) => {
    let token = req.headers.token
    
    if (!token) {
      res.status(401).json({error: 'Please login first'})
    }

    jwt.verify(token, process.env.jwt_secret ,(err, decoded) => {
      if (err) {
        res.status(500).json(err)
      } else {
        User.findById(decoded.id)
          .then(user => {
            if (user) {
              req.decoded = decoded
              // console.log(req.decoded)
              next()
            } else {
              res.status(401).json({error: 'Please provide a valid token'})
            }
          })
          .catch(err => {
            res.status(500).json(err)
          })
      }
    })
  }
}