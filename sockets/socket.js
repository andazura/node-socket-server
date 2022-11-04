const {io} = require('../index')

// Mensajes de sockets
io.on('connection', client => {

    console.log("Cliente conectado");

    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
    });

    client.on('mensaje', (data) => { 
        console.log(data.nombre);

        io.emit("mensaje",{mensaje:`Nuevo mensaje de ${data.nombre}`})
    });
  });