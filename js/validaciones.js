//Validaciones:

//Se crea las constantes del formulario
const C_Formulario = document.getElementById("Formulario");
const inputs = document.querySelectorAll("#Formulario input");

//Se crea un objeto donde va contener las expresiones:
const expresiones ={

 Cedula:/^((\d{8})|(\d{10})|(\d{11})|(\d{6}-\d{5}))?$/,
 Nombre: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
 Apellido: /^[a-zA-ZÀ-ÿ\s]{4,15}$/,
 Correo:/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
 Contraseña: /^.{8,25}$/

}

//Se crea un objeto campo 
const campos = {
    Cedula: false,
    Nombre: false,
    Apellido: false,
    Correo: false,
    Contraseña: false
}

//Funcion para saber en que parte del formulario esta seleccionando
const ValidarFormulario = (e) =>{
    switch (e.target.name){
        case "Cedula":
            ValidarCampo(expresiones.Cedula, e.target, "Cedula");                
        break;  
        case "Nombre":
            ValidarCampo(expresiones.Nombre, e.target, "Nombre");
        break;
        case "Apellido":
            ValidarCampo(expresiones.Apellido, e.target, "Apellido");
        break;
        case "Correo":
            ValidarCampo(expresiones.Correo, e.target, "Correo");
        break;
        case "Contraseña":
            ValidarCampo(expresiones.Contraseña, e.target, "Contraseña");
        break;
    }

}

//Aqui se crea una funcion donde validen los campos
const ValidarCampo = (expresion, input, campo) =>{
    if(expresion.test(input.value)){

        document.getElementById(`Grupo_${campo}`).classList.remove("Form_Grupo-incorrecto");
        document.getElementById(`Grupo_${campo}`).classList.add("Form_Grupo-correcto");
        document.querySelector(`#Grupo_${campo} .Forminput-error`).classList.remove("Form_input-error-activo");
        campos[campo] = true;

    }else{
        document.getElementById(`Grupo_${campo}`).classList.add("Form_Grupo-incorrecto");
        document.getElementById(`Grupo_${campo}`).classList.remove("Form_Grupo-correcto");
        document.querySelector(`#Grupo_${campo} .Forminput-error`).classList.add("Form_input-error-activo");
        campos[campo] = false;

    }
}

//Aqui se utiliza cada input creado en el html
inputs.forEach(input=>{
    input.addEventListener("keyup",ValidarFormulario);
    input.addEventListener("blur",ValidarFormulario);
})

C_Formulario.addEventListener("submit", (e)=>{
    e.preventDefault();

    //const term = document.getElementById("Terminos");
    if(campos.Cedula && campos.Nombre && campos.Apellido && campos.Correo && campos.Contraseña){
        C_Formulario.reset();
        document.getElementById("Form_Mensaje-exito").classList.add("Form_Mensaje-exito-activado");
        setTimeout(() =>{
        document.getElementById("Form_Mensaje-exito").classList.remove ("Form_Mensaje-exito-activado");
        },5000);

    }else{
        document.getElementById("Form_Mensaje").classList.add("Form_Mensaje-activado");
        setTimeout(() =>{
        document.getElementById("Form_Mensaje").classList.remove ("Form_Mensaje-activado");
        },5000);
    }
})