// buttoms
const openEnviar = document.getElementById('openEnviar')
const openRecibir = document.getElementById('openRecibir')
const openSacar = document.getElementById('openSacar')


//forms
const formEnviar = document.getElementById('formEnviar')
const formPedir = document.getElementById('formPedir')
const formSacar = document.getElementById('formSacar')



openEnviar.addEventListener(`click`, abrirEnviar)

function abrirEnviar() {
    formEnviar.classList.remove('inactive')
    formPedir.classList.add('inactive')
    formSacar.classList.add('inactive')

}

openRecibir.addEventListener(`click`, abrirRecibir)

function abrirRecibir() {
    formEnviar.classList.add('inactive')
    formPedir.classList.remove('inactive')
    formSacar.classList.add('inactive')

}

openSacar.addEventListener(`click`, abrirSacar)

function abrirSacar() {
    formEnviar.classList.add('inactive')
    formPedir.classList.add('inactive')
    formSacar.classList.remove('inactive')

}




// historial de transacciones
const controlEnviados = document.getElementById('controlEnviados')
const controlRecibidos = document.getElementById('controlRecibidos')

const contenedorEnviados = document.getElementById('contenedorEnviados')
const contenedorRecibidos = document.getElementById('contenedorRecibidos')
const noTransaccion = document.getElementById('noTransaccion')

controlEnviados.addEventListener('click', showEnviados)

function showEnviados() {
    contenedorEnviados.classList.remove('inactive')
    contenedorRecibidos.classList.add('inactive')
    noTransaccion.classList.add('inactive')

}

controlRecibidos.addEventListener('click', showRecibidos)

function showRecibidos() {
    contenedorEnviados.classList.add('inactive')
    contenedorRecibidos.classList.remove('inactive')
    noTransaccion.classList.add('inactive')
}
 
