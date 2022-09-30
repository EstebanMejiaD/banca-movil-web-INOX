 // esta es la lista de objetos para las cuentas
 let Cuentas = [
    {
    nombre: "Esteban",
    apellido: "Mejia",
    correo: "esteban@gmail.com",
    contraseña: "esteban12345"
    },
    {
    nombre: "Victor",
    apellido: "De La Hoz",
    correo: "victor@gmail.com",
    contraseña: "victor12345"
    },
    {
    nombre: "Danny",
    apellido: "Hernandez",
    correo: "dhernandez@gmail.com",
    contraseña: "dani12345"
    },
];


let obtenerListaUsuarios = () => {
    let listaUsuarios = JSON.parse(localStorage.getItem("listaUsuarioLs"));

    if (listaUsuarios === null) {
        listaUsuarios = Cuentas;
    }
    return listaUsuarios;
}

let validarCredenciales = (correo, contraseña) => {
    let listaUsuarios = obtenerListaUsuarios();
    let bAcceso = false;

    for (let i = 0; i < listaUsuarios.length; i++) {
        if (correo === listaUsuarios[i].correo && contraseña === listaUsuarios[i].contraseña) {
            bAcceso = true;
            sessionStorage.setItem("usuarioActivo", listaUsuarios[i].nombre +" "+ listaUsuarios[i].apellido);
            
        }
    }
    return bAcceso;
}