

let obtenerUsuariosRegistrados = () => {
    let obtenerListaUsuarios = JSON.parse(localStorage.getItem("usuariosRegistradosLS"));

    if (obtenerListaUsuarios === null) {
        obtenerListaUsuarios = RCuentas;
    }
    return obtenerListaUsuarios;
}
let validarCredenciales = (correo, contraseña) => {
    let listaUsuariosObtenida = obtenerUsuariosRegistrados();
    let bAcceso = false;

    for (let i = 0; i < listaUsuariosObtenida.length; i++) {
        if (correo === listaUsuariosObtenida[i].correo && contraseña === listaUsuariosObtenida[i].contraseña) {
            bAcceso = true;
            sessionStorage.setItem("usuarioActivo", listaUsuariosObtenida[i].nombre +" "+ listaUsuariosObtenida[i].apellido);
            
        }
    }
    return bAcceso;
}


const login =  document.querySelector("#login");

login.addEventListener("click", ()=> {
    let sCorreo = "";
    let sContraseña = "";
    let bAcceso = false;

    sCorreo = document.querySelector("#email").value;
    sContraseña = document.querySelector("#pass").value;
     
    bAcceso = validarCredenciales(sCorreo, sContraseña);

    if (bAcceso === true) {
        window.location.href = "CuentaSIUI.html";
    }else if (bAcceso === false) {
        let mensajeFalso = document.createElement("SMALL");
        mensajeFalso.innerHTML = "¡Usuario o contraseñas incorrectas!";
       const divAlertSesionFalse = document.querySelector("#alertSesionFalse");
       divAlertSesionFalse.appendChild(mensajeFalso);
       
    }
});