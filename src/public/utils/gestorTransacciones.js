// buttoms
const openEnviar = document.getElementById('openEnviar')
const openRecibir = document.getElementById('openRecibir')
const openSacar = document.getElementById('openSacar')
const iconMensaje = document.getElementById('iconMensaje')


//forms
const formEnviar = document.getElementById('formEnviar')
const formPedir = document.getElementById('formPedir')
const formSacar = document.getElementById('formSacar')
const contenedorMensajes = document.getElementById('contenedorMensajes')



openEnviar.addEventListener(`click`, abrirEnviar)

function abrirEnviar() {
    formEnviar.classList.remove('inactive')
    formPedir.classList.add('inactive')
    formSacar.classList.add('inactive')
    contenedorMensajes.classList.add('inactive')
}

openRecibir.addEventListener(`click`, abrirRecibir)

function abrirRecibir() {
    formEnviar.classList.add('inactive')
    formPedir.classList.remove('inactive')
    formSacar.classList.add('inactive')
    contenedorMensajes.classList.add('inactive')
}

openSacar.addEventListener(`click`, abrirSacar)

function abrirSacar() {
    formEnviar.classList.add('inactive')
    formPedir.classList.add('inactive')
    formSacar.classList.toggle('inactive')
    contenedorMensajes.classList.add('inactive')
}

/**events show menssage */
iconMensaje.addEventListener('click', showMenssage)

function showMenssage() {
    contenedorMensajes.classList.remove('inactive')
    formEnviar.classList.add('inactive')
    formPedir.classList.add('inactive')
    formSacar.classList.add('inactive')
}




// historial de transacciones y contenedor mensaje
const controlEnviados = document.getElementById('controlEnviados')
const controlRecibidos = document.getElementById('controlRecibidos')
const controlRetiros = document.getElementById('controlRetiros')

controlRetiros

const contenedorEnviados = document.getElementById('contenedorEnviados')
const contenedorRecibidos = document.getElementById('contenedorRecibidos')
const noTransaccion = document.getElementById('noTransaccion')
const contenedorRetirados = document.getElementById('contenedorRetirados')

controlEnviados.addEventListener('click', showEnviados)

function showEnviados() {
    contenedorEnviados.classList.remove('inactive')
    contenedorRecibidos.classList.add('inactive')
    noTransaccion.classList.add('inactive')
    contenedorRetirados.classList.add('inactive')

}

controlRetiros.addEventListener('click', showRetiros)

function showRetiros() {
    contenedorRetirados.classList.remove('inactive')
    contenedorEnviados.classList.add('inactive')
    contenedorRecibidos.classList.add('inactive')
    noTransaccion.classList.add('inactive')
}

controlRecibidos.addEventListener('click', showRecibidos)

function showRecibidos() {
    contenedorEnviados.classList.add('inactive')
    contenedorRecibidos.classList.remove('inactive')
    noTransaccion.classList.add('inactive')
    contenedorRetirados.classList.add('inactive')

}


/** GESTIR DE EVENTOS DE ATM FORM */
    const buttonOpenAtm = document.getElementById('buttonOpenAtm')
    const CloseFormATO = document.getElementById('CloseFormATO')

    const contenedorATM = document.getElementById('contenedorATM')

    buttonOpenAtm.addEventListener('click', showATMForm)
    CloseFormATO.addEventListener('click', closeATMForm)

    function showATMForm() {
        contenedorATM.classList.remove('inactive')
    }

    function closeATMForm() {
        contenedorATM.classList.add('inactive')
    }


    /** gestor de eventos list fav */

    const iconListFav = document.getElementById('iconListFav')
    const CloseFormLISTFAV = document.getElementById('CloseFormLISTFAV')

    const contenedorLISTFAV = document.getElementById('contenedorLISTFAV')
    

    iconListFav.addEventListener('click', showListFav)
    CloseFormLISTFAV.addEventListener('click', closedListFav)

    function showListFav() {
        contenedorLISTFAV.classList.remove('inactive')
    }

    function closedListFav() {
        contenedorLISTFAV.classList.add('inactive')
    }
