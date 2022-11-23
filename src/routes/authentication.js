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
router.get("/profile", isLoggedIn, async(req, res) => {
      /**Listar las transacciones que llegan y salen */
    const listaTransaccionesEnviada = await pool.query('SELECT * FROM transaccion WHERE id_envia = ?', [req.user.id])
    const listaTransaccionesRecibidas = await pool.query('SELECT * FROM transaccion WHERE id_revibe = ?', [req.user.id])
    const listaRetiros = await pool.query('SELECT * FROM retirar WHERE id_retira = ?', [req.user.id])
    console.log('retiros hechos: ', listaRetiros)
      
    const listaMensajesRecibidos = await pool.query('SELECT * FROM mensaje WHERE id_revibeMensaje = ?', [req.user.id])
    const contadorMensajes = listaMensajesRecibidos.length;
    

    //poblar lista de favoritos 
    const listaFavoritos = await pool.query('SELECT * FROM c_favoritos;')
    

    // listar mi lista favo
    const listaFavoritosUser = await pool.query('SELECT * FROM listfav WHERE id_lisUser = ?', [req.user.id])
    console.log('Lista de favorit:', listaFavoritos)

    console.log('favoritos: ', listaFavoritos)
    // idMensaje:
    console.log('mensaje recibido por este usuario: ', listaMensajesRecibidos)


  res.render("profile/profile.hbs", {listaTransaccionesEnviada, listaTransaccionesRecibidas, listaMensajesRecibidos, contadorMensajes, listaRetiros, listaFavoritos, listaFavoritosUser});
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});





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
      mensaje,
      emailRecibe: email,
      emailEnvia: req.user.email,
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

    req.redirect('/profile')



})

router.post('/pedir', async(req, res)=> {
  const {email, monto, mensaje} = req.body


  const userRecibeMensaje = await pool.query('SELECT * FROM users WHERE email = ?', [email])
  const id_enviaMensaje = req.user.id
  const id_revibeMensaje =  userRecibeMensaje[0].id

  const newMensaje = {
    id_enviaMensaje,
    id_revibeMensaje,
    monto,
    mensaje,
    emailRecibeMensaje: email,
    emailEnviaMensaje: req.user.email,
  }
  await pool.query('INSERT INTO mensaje set ?', [newMensaje])
  console.log('valores de mensaje: ', newMensaje)

  res.redirect('/profile')

})


router.get('/retirar', async(req,res)=> {
    const codigo = Math.round(Math.random()*999999);
    await pool.query('UPDATE users set codigo = ?  WHERE id = ?', [codigo, req.user.id])

    console.log('codigo: ', codigo)
    
    res.render('profile/profile', {codigo})
})

router.post('/retirar', async(req,res)=> {
    const {emailRetira, codigoRetiro, monto} = req.body  
    const mensajeError =  'Hubo un problema con el retiro. Porfavor ingrese bien sus datos'
    const mensajeExito = "Retiro hecho exitosamente"
    const id_retira = req.user.id
    const newRetiro = {
      id_retira,
      monto,
      emailRetira,
      codigoRetiro,
    }
    console.log('Datos de retiro: ', newRetiro)

    if (newRetiro.codigoRetiro == req.user.codigo && newRetiro.monto <= req.user.balance && newRetiro.emailRetira == req.user.email) {
     await pool.query('INSERT INTO retirar set ?',[newRetiro])
     const balance = req.user.balance
    const restaBalance =  balance - monto
    console.log("Balance nuevo: ", restaBalance)
    await pool.query('UPDATE users set balance = ?  WHERE id = ?', [restaBalance, id_retira])
    res.redirect('/profile')
    } else {
      res.render('profile/profile', {mensajeError,})
    }
  

})


//Ruta para poder cancelar los mensajes de peticion recibidos
router.get('/delete/pedir/:id', async (req, res)=> {
    const {id} = req.params
     await pool.query('DELETE FROM mensaje WHERE idMensaje = ?', [id])
    res.redirect('/profile')
})



//Ruta para poder enviar respuesta de peticion

router.get('/envio/pedir/:id', async (req, res)=> {
  const {id} = req.params
  const infoMensaje = await pool.query('SELECT * FROM mensaje WHERE idMensaje = ?', [id])
   const {id_enviaMensaje,id_revibeMensaje,monto, mensaje, emailRecibeMensaje, emailEnviaMensaje} = infoMensaje[0]
  const userRecibe = await pool.query('SELECT * FROM users WHERE email = ?', [emailEnviaMensaje])
    const id_envia = req.user.id
    const id_revibe =  userRecibe[0].id

    const newTransaccion = {
      id_envia,
      id_revibe,
      monto,
      mensaje,
      emailRecibe: emailEnviaMensaje,
      emailEnvia: emailRecibeMensaje,
    }
      console.log('Transaccion: ', newTransaccion)

     await pool.query('INSERT INTO transaccion set ?', [newTransaccion])

     const balance = req.user.balance
     const restaBalance =  balance - monto
     await pool.query('UPDATE users set balance = ?  WHERE id = ?', [restaBalance, id_envia])
    
     const balanceUsuarioRecibe = userRecibe[0].balance
    const sumaBalance = parseInt(balanceUsuarioRecibe) + parseInt(monto)
     await pool.query('UPDATE users set balance = ?  WHERE id = ?', [sumaBalance, id_revibe])



     await pool.query('DELETE FROM mensaje WHERE idMensaje = ?', [id])
    


    res.redirect('/profile')
 })


 router.get("/addlist/:id",  async (req, res) => {
  try {
    const { id } = req.params;
    const listar = await pool.query(
      "SELECT * FROM c_favoritos WHERE idFavoritos = ?;",[id]);
     const id_lisUser = req.user.id

    const {
      imagen,
      nombre,
      precio,
      porcentaje,
    } = listar[0];
    const newListed = {
      imagen,
      nombre,
      precio,
      porcentaje,
      id_lisUser,
    };
    await pool.query("INSERT INTO listfav SET ?", [
      newListed,
    ]);

    res.redirect("/profile");

  } catch (error) {
    console.log(error);
  }
});

router.get('/delete/list/:id', async (req, res)=> {
  const {id} = req.params
   await pool.query('DELETE FROM listfav WHERE idListFavoritos = ?', [id])
  res.redirect('/profile')
})

module.exports = router;
