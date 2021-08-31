const Ticket = require('../models/ticket')
const FullTicket = require('../models/fullTicket')

class TicketControl {
    constructor() {
        let data = FullTicket.find()

        this.ultimo = 0
        this.hoy = new Date().getDate()
        this.tickets = []
        this.ultimos4 = []

        this.ultimo = data.ultimo
        this.tickets = data.tickets
        this.ultimos4 = data.ultimos4
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`
    }

    getUltimos4() {
        return this.ultimos4
    }

    atenderTicket(escritorio) {
        if (this.tickets.length === 0) {
            return 'No hay tickets'
        }

        let numeroTicket = this.tickets[0].numero
        //Elimino la primera posición del arreglo
        this.tickets.shift()

        let atenderTicket = new Ticket(numeroTicket, escritorio)
        //Agrego el ticket al inicio del arreglo
        this.ultimos4.unshift(atenderTicket)

        if (this.ultimos4.length > 4) {
            //borra el ultimo elemento del arreglo
            this.ultimos4.splice(-1, 1)
        }

        console.log('Ultimos 4')
        console.log(this.ultimos4)
        this.grabarArchivo()
        return atenderTicket
    }

    async grabarArchivo() {
        var currentFullTicket = FullTicket.findOne()

        dataSocket = new FullTicket()

        dataSocket.last = this.ultimo
        dataSocket.date = this.hoy
        dataSocket.tickets = this.tickets
        dataSocket.last4 = this.ultimos4

        var dataSocket = await FullTicket.findByIdAndUpdate(
            currentFullTicket._id,
            dataSocket
        )
        console.log(dataSocket)
    }
}

module.exports = {
    TicketControl,
}
