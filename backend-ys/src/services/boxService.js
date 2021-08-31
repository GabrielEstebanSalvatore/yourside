const Comprabante = require('../models/comprabanteModel')

class boxService {
    static async getCurrentBox(box) {
        //console.log(box.openBoxDate)

        const comprabantes = await Comprabante.find({
            date: {
                $gte: box.openBoxDate,
            },
        })

        comprabantes.forEach((cBox) => {
            box.totalSales += cBox.price
        })
        //el comprobante lo puedo guardar cuando realice la compra
        box.comprobantes = comprabantes.w

        return { Box: box }

        //sumar los totales
    }
}

module.exports = boxService
