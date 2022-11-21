/**
 * En este archivo estaran todas las rutas del registro y del login
 */

const express = require("express");
const router = express.Router();

const passport = require("passport");
const pool = require("../database");
const {isLoggedIn} =  require('../lib/auth')
// ruta al formulario del registro
router.get("/singup", (req, res) => {
  res.render("auth/singup.hbs");
});


// rupa para autenticar y registrar un usuario
router.post("/singup", passport.authenticate("local.singup", {
    successRedirect: "/profile",
    failureRedirect: "/singup",
    failureFlash: true
  }));

// ruta al formulario del login
router.get("/login", (req, res) => {
  res.render("auth/login.hbs");
});

router.post('/login', (req, res, next)=> {

    passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)

})


//
router.get("/profile", isLoggedIn, (req, res) => {
  res.render("profile/profile.hbs");
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});

router.get('/prueba', async(req, res)=> {
  res.send('recibido')

  const users = await pool.query('SELECT * FROM users;')
  console.log('usuario:', users)
})



/**
 * Rutas para las transacciones
 */


router.post('/enviar', async(req, res)=> {

    const {email, monto, mensaje} = req.body


    const userRecibe = await pool.query('SELECT * FROM users WHERE email = ?', [email])
    const id_envia = req.user.id
    const id_revibe =  userRecibe[0].id

    const newTransaccion = {
      id_envia,
      id_revibe,
      monto,
      mensaje
    }


    await pool.query('INSERT INTO transaccion set ?', [newTransaccion])
    console.log('valores de transaccion: ', newTransaccion)

    console.log('Balance usuario envia: ',req.user.balance)
    const balance = req.user.balance
    const restaBalance =  balance - monto
    console.log("Balance nuevo: ", restaBalance)
    await pool.query('UPDATE users set balance = ?  WHERE id = ?', [restaBalance, id_envia])
    
    const balanceUsuarioRecibe = userRecibe[0].balance
    const sumaBalance = parseInt(balanceUsuarioRecibe) + parseInt(monto)
    await pool.query('UPDATE users set balance = ?  WHERE id = ?', [sumaBalance, id_revibe])

    res.send('transaccion hecha')



})



module.exports = router;
