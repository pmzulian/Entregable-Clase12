//* Inicializamos el socket desde el cliente
const socket = io();

socket.on('mensaje', data => {
    alert(data);
})