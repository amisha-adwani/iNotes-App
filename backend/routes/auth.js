const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/',(req,res)=>{
    const user = User(req.body)
    user.save()
    res.json(user)
    console.log(user)
})

module.exports = router