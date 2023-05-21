const express = require('express')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../models/User')

router.post('/', [
        body('username').not().isEmpty().withMessage('please input username'),
        body('email').isEmail().withMessage('email is not correct'),
        body('password').isLength({min:8}).withMessage('password must be at least 8 character length')
    ], 
    async (req, res)=>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {username, email, password} = req.body

    try{
        let user = await User.findOne({email})

        if (user){
            return res.status(400).json({msg: 'User already exists'})
        }

        user = new User({
            username,
            email,
            password,
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            user:{
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn:360000,
        }, (err, token) => {
            if(err) throw err
            res.json({token})
        })

        // res.send("User Saved")
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(err.message)
    }
})

module.exports = router