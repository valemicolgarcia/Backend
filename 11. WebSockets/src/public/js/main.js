/* Generamos una instancia de socket.io, ahora desde el lado del cliente*/

const socket = io();

//cuando yo quiero comenzar con la conexion y voy a emitir mensjae al servidor, puedo hacer lo siguiente


//metodo emit = emitir mensjae
//metodo on = escuchar mensaje

socket.emit("mensaje", "hola, te estoy escribiendo desde el front");

//ahora escuchamos mensaje del backend

socket.on("saludito", (data) => {
    console.log(data);
})

//recibo el array de usuarios:
socket.on("usuarios", (data) => {
    const listaUsuarios = document.getElementById("lista-usuarios");
    listaUsuarios.innerHTML = " ";
    data.forEach(usuario => {
        listaUsuarios.innerHTML += `<li> ${usuario.nombre} - ${usuario.apellido} </li>`
    })
})

