const express = require('express')
const router = express.Router()

router.post('/', (req, res)=>{
    res.send('Register an user')
})

module.exports = router