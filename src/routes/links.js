//Esta va a ser la ruta o el tipo de ruta de ejemplo para el proyecto

const express = require('express')
const router = express.Router()

const pool = require('../database')

router.get('./add', (req, res)=> {
    res.send('hello')
})


module.exports = router;