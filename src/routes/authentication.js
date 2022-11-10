const express = require('express')
const router = express.Router()

router.get('/singup', (req, res)=> {    
    res.render('auth/singup.hbs')
})

router.get('/login', (req, res)=> {
    res.render('auth/login.hbs')
})

router.get('/profile',(req, res)=> {
    res.render('profile/profile.hbs')
})


module.exports = router;