const express = require('express')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('config')
const bcrypt = require('bcryptjs')
const auth = require('../middleware/auth')

const User = require('../models/User')
const Contact = require('../models/Contact')

// @route       POST api/contact
// @desc        add contact
// @access      public
router.post('/', [auth, [
    body('name').not().isEmpty().withMessage('please add name'),
    // body('email').isEmail().withMessage('please include a valid email'),
    // body('password').isLength({min:6}).withMessage('please enter a password')
]], async (req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const {name, email, phone, type} = req.body

    try{
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user:req.user.id
        })

        const contactExists = await Contact.findOne({user:req.user.id, name:newContact.name}).exec()
        if(contactExists){
            return res.status(400).json({msg:'contact already exists'})
        }
        const contact = await newContact.save()
        
        res.send(contact)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(err.message) 
    }
})

// @route       GET api/contact
// @desc        get all contact
// @access      public
router.get('/', auth, async (req, res)=>{
    try{
        const contacts = await Contact.find({user: req.user.id}).sort({date:-1})
        res.send(contacts)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(err.message) 
    }
})

// @route       PUT api/contact
// @desc        update contact
// @access      public
router.put('/:id', auth, async (req, res)=>{
    const {name, email, phone, type} = req.body

    // build contact object
    const contactFields = {}
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try{
        let contact = await Contact.findById(req.params.id)
    
        if(!contact) return res.status(400).json({msg:'contact not found'})

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not Authorized'})
        }
        
        contact = await Contact.findByIdAndUpdate(req.params.id, {$set:contactFields}, {new:true})

        res.send(contact)
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(err.message) 
    }
})

// @route       DELETE api/contact
// @desc        delete contact
// @access      public
router.delete('/:id', auth, async (req, res)=>{
    try{
        let contact = await Contact.findById(req.params.id)
        
        if(!contact) return res.status(400).json({msg:'contact not found'})

        if(contact.user.toString() !== req.user.id){
            return res.status(401).json({msg:'Not Authorized'})
        }
        
        await Contact.findByIdAndRemove(req.params.id)

        res.send({msg:'contact removed'})
    }
    catch(err){
        console.error(err.message)
        res.status(500).send(err.message) 
    }
})

module.exports = router