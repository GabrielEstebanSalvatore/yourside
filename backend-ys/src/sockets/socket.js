const { io } = require('../index');
const { TicketControl } = require('../services/socketControl');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('conectado', () => { console.log("usuario conectado")})

    client.on('siguienteTicket', (data, callback) => {

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {
        console.log(data)
        
        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        // actualizar/ notificar cambios en los ULTIMOS 4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });

    });
});