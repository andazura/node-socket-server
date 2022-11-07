const {io} = require('../index')
const Bands = require('../models/bands');
const Band = require('../models/band');



const bands = new Bands();

bands.addBand( new Band('queen') )
bands.addBand( new Band('rhco') )
bands.addBand( new Band('soda') )
bands.addBand( new Band('metallica') )

console.log(bands)

// Mensajes de sockets
io.on('connection', client => {

    console.log("Cliente conectado");

    client.emit("active-bands",bands.getBands());


    client.on('disconnect', () => { 
        console.log("Cliente desconectado")
    });


    // client.on('mensaje', (data) => { 
    //     console.log(data.nombre);

    //     io.emit("mensaje",{mensaje:`Nuevo mensaje de ${data.nombre}`})
    // });

    // client.on('nuevo-mensaje', (data) => { 
    //     console.log("emitiendo")
    //     client.broadcast.emit("nuevo-mensaje",data)
    // });

    client.on("vote-bad", (data)=>{
        
        bands.voteBand(data.bandid);
        io.emit("active-bands",bands.getBands());
    })

    client.on("add-band", (data) =>{
        bands.addBand( new Band(data.name));
        io.emit("active-bands",bands.getBands());
    });

    client.on("delete-band", (data) =>{
        bands.removeBand( data.id );
        io.emit("active-bands",bands.getBands());
    });

  });