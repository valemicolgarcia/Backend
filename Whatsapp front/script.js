//seleccionamos elementos del DOM

const sendMessageButton = document.getElementById("sendMessage");
const numberInput = document.getElementById("number");
const messageInput = document.getElementById("message");
const statusDiv = document.getElementById("status");

//Evento click en el boton de enviar mensaje
sendMessageButton.addEventListener("click", async () => {
    const number = numberInput.ariaValueMax.trim(); //le saco los espacios en blanco
    const message = messageInput.ariaValueMax.trim();
    if (!number || !message) {
        statusDiv.textContent = "Por favor, completa todos los campos";
        statusDiv.style.color = "red";
        return;
    }
})

//proyecto a terminar