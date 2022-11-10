/**
 * Este es el index de nuestra aplicacion, aquí se estará haciendo todo practicamente, desde el servidor hasta la importacion de la rutas
 */


// Requerimiento de modulos: 
const express = require('express')
const morgan = require('morgan')
const {engine} = require('express-handlebars')
const path = require('path')



// initializations
const app = express()


//settings
app.set('port', process.env.PORT || 4000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')

}))
app.set('view engine', '.hbs')



//moddlewares

//morgan es para que muestre un tipo de mensaje por consola 
app.use(morgan('dev'))
// esto es para indicarle a Node que solo voy a estar aceptando datos sencillos, como string y así
app.use(express.urlencoded({extended: false}));
//para decirle a Node que tambien quisiera aceptar json (solo por si se necesita)
app.use(express.json())



// global variables
app.use((req, res, next) => {
    
    next()
})



//routes

//requiero el archivo index.js de la carpeta routes
app.use(require('./routes/index'))
//requiero el archivo authentication.js de la carpeta routes
app.use(require('./routes/authentication'))
//requiero el archivo links.js de la carpeta routes
app.use('./links',require('./routes/links'))





// public
app.use(express.static(path.join(__dirname, 'public')))




// starting the server
app.listen(app.get('port'), ()=> {
    console.log('server on port', app.get('port'))
})

