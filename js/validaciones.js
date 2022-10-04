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
    Nombre: false,
    Apellido: false,
    Cedula: false,
    Correo: false,
    Contraseña: false
}

//Funcion para saber en que parte del formulario esta seleccionando
const ValidarFormulario = (e) =>{
    switch (e.target.name){
        case "Nombre":
            ValidarCampo(expresiones.Nombre, e.target, "Nombre");                
        break;  
        case "Apellido":
            ValidarCampo(expresiones.Apellido, e.target, "Apellido");
        break;
        case "Cedula":
            ValidarCampo(expresiones.Cedula, e.target, "Cedula");
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

        document.getElementById(`grupo_${campo}`).classList.remove("form_grupo-incorrecto");
        document.getElementById(`grupo_${campo}`).classList.add("form_grupo-correcto");
        document.querySelector(`#grupo_${campo} i`).classList.add("bi-check-circle-fill");
        document.querySelector(`#grupo_${campo} i`).classList.remove("bi-x-circle-fill");
        document.querySelector(`#grupo_${campo} .form_input-error`).classList.remove("form_input-error-activo");

        //Para expandir el formulario:
        document.getElementById("Formulario").classList.remove("lado-formulario-error");
        //--------------------------------------------------------------------------------
        campos[campo] = true;

    }else{
        document.getElementById(`grupo_${campo}`).classList.add("form_grupo-incorrecto");
        document.getElementById(`grupo_${campo}`).classList.remove("form_grupo-correcto");
        document.querySelector(`#grupo_${campo} i`).classList.add("bi-x-circle-fill");
        document.querySelector(`#grupo_${campo} i`).classList.remove("bi-check-circle-fill");
        document.querySelector(`#grupo_${campo} .form_input-error`).classList.add("form_input-error-activo");

        //Para expandir el formulario
        document.getElementById("Formulario").classList.add("lado-formulario-error");
        document.getElementById("Formulario").classList.remove("lado-formulario");
        //-------------------------------------------------------------------------------
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
    if(campos.Nombre && campos.Apellido && campos.Cedula && campos.Correo && campos.Contraseña){
        C_Formulario.reset();
        document.getElementById("form_mensaje-exito").classList.add("form_mensaje-exito-activar");
        document.getElementById("Formulario").classList.add("lado-formulario-mensaje");
        setTimeout(() =>{
        document.getElementById("form_mensaje-exito").classList.remove ("form_mensaje-exito-activar");
        document.getElementById("Formulario").classList.remove("lado-formulario-mensaje");
        },5000);
    }else{
        document.getElementById("form_mensaje").classList.add("form_mensaje-activar");
        document.getElementById("Formulario").classList.add("lado-formulario-mensaje");
        setTimeout(() =>{
        document.getElementById("form_mensaje").classList.remove ("form_mensaje-activar");
        document.getElementById("Formulario").classList.remove("lado-formulario-mensaje");
        },5000);
            
    }
});