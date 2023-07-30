const express = require('express')
const router = express.Router()
const User = require('../models/User')
const {body, validationResult}= require('express-validator')

router.post('/',[
    body('name').isLength({min: 3}).withMessage('Not a valid name'),
    body('email').isEmail().withMessage('Not a valid email'),
    body('password').isLength({min:5}).withMessage('Not a valid password')
],(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors :errors.array()})
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
    res.json({error: 'Please enter a unique value'})} )
})
// res.json(req.body)

module.exports = router