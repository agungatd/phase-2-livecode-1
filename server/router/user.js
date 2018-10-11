var express = require('express');
var router = express.Router();

var User=require('../models/user')
const encrypt = require('../helpers/encrypt')
const jwt=require('jsonwebtoken')
const {auth}=require('../middleware/auth.js')


// router.get('/', (req, res)=>{res.send('masdu')})
router.post('/register',function(req,res){
    console.log('masuk sini')
    let newUser = {
        name: req.body.name,
        email: req.body.email,
        password:req.body.password
    }

    User.create(newUser)
        .then((data) => {
            res.location('/users/register')
            res.status(201).json({
                success: true,
                message: `Account ${data.name} registered`
            })
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})

router.post('/login', function(req,res){
    let hashed = encrypt.hashPassword(req.body.password, req.body.email)
    console.log(hashed)
    User.findOne({email: req.body.email, password: hashed})
        .then(user => {
            let obj = {
                id: user._id,
                name: user.name,
                email: user.email
            }
            jwt.sign(obj, process.env.jwt_secret, (err, token) => {
                if (err) {
                    res.status(500).json(err)
                } else {
                    res.location('/users/login')
                    res.status(201).json({token:token})
                }
            })
        })
        .catch(err => {
            res.status(500).json({error: err.message})
        })
})


router.get('/',auth,function(req,res){
    User.find()
            .then(data => {
                console.log(req.decoded)
                res.status(200).json(data)
            })
            .catch(err => {
                
                res.status(500).json({error: err.message})
            })
})

router.delete('/',function(req,res){
    User.remove({})
    .then(() => {
        res.status(200).json({message: 'All User deleted!'})
    })
    .catch(err => {
        res.status(500).json({error: err.message})
    })
})

module.exports=router