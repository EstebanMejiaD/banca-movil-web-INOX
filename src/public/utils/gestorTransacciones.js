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


