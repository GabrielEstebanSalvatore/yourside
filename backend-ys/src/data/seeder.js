const seeder = require('mongoose-seed')
require('dotenv').config()
const db = process.env.DATABASECONNETION

seeder.connect(db, () => {
    seeder.loadModels([
        './src/models/brand/brandModel',
        './src/models/articleType/articleTypeModel',
        './src/models/offer/offerModel',
        './src/models/article/articleModel',
        './src/models/trolley/trolleyModel',
        './src/models/client/clientModel',
        './src/models/receipt/receiptModel',
        './src/models/receipt/receiptDetailModel',
        './src/models/cashRegister/cashRegisterModel',
        './src/models/configuration/configurationModel',
    ])
    seeder.clearModels(
        [
            'Brand',
            'ArticleType',
            'Offer',
            'Article',
            'Trolley',
            'Client',
            'ReceiptDetail',
            'Receipt',
            'CashRegister',
            'Configuration',
        ],
        () => {
            seeder.populateModels(data, function () {
                seeder.disconnect()
            })
        }
    )
})

const data = [
    {
        model: 'Brand',
        documents: [
            {
                _id: '61623b9df7da294370d73fd9',
                available: '1',
                name: 'Coca Cola',
            },
            {
                _id: '61623b9df7da123370d73fd9',
                available: '1',
                name: 'Fernet Branca',
            },
            {
                _id: '33323b9df7da123370d73fd9',
                available: '1',
                name: 'Quilmes',
            },
        ],
    },
    {
        model: 'ArticleType',
        documents: [
            {
                _id: '61623b9df7da294370d73ee3',
                available: '1',
                name: 'Gaseosas',
            },
            {
                _id: '61623b9df7da123370d73ff2',
                available: '1',
                name: 'Bebidas Alcoholicas',
            },
            {
                _id: '61623b9df7da123370d73ff1',
                available: '1',
                name: 'Snacks',
            },
        ],
    },
    {
        model: 'Offer',
        documents: [
            {
                _id: '61623b9df7da294370d22ee3',
                available: '1',
                name: 'Oferta 1',
                percent: '10',
                disableDate: '2021-05-05',
            },
            {
                _id: '61623b9df7da212370d73ee3',
                available: '1',
                name: 'Oferta 2',
                percent: '15',
                disableDate: '2021-06-06',
            },
            {
                _id: '42623b9df7da294370d73ee3',
                available: '1',
                name: 'Oferta 3',
                percent: '20',
                disableDate: '2021-07-07',
            },
        ],
    },
    {
        model: 'Article',
        documents: [
            {
                _id: '61623b9df7da294370d22ff3',
                available: '1',
                description: 'Coca Cola 2L',
                code: '100',
                name: 'Coca Cola 2L',
                amount: '100',
                costPrice: '50',
                sellPrice: '150',
                sellPriceOffer: '130',
                negativeStock: '1',
                minimum: '10',
                brand: '61623b9df7da294370d73fd9',
                articleType: '61623b9df7da294370d73ee3',
                offer: '61623b9df7da294370d22ee3',
            },
            {
                _id: '61623b9df7da294370d22aa3',
                available: '1',
                description: 'Fernet Branca 750cc',
                code: '100',
                name: 'Fernet Branca 750cc',
                amount: '100',
                costPrice: '50',
                sellPrice: '150',
                sellPriceOffer: '130',
                negativeStock: '1',
                minimum: '10',
                brand: '61623b9df7da123370d73fd9',
                articleType: '61623b9df7da123370d73ff2',
                offer: '61623b9df7da212370d73ee3',
            },
            {
                _id: '61623b9df7da294370d22ff4',
                available: '1',
                description: 'Cerveza Quilmes Lata 350cc',
                code: '100',
                name: 'Cerveza Quilmes Lata 1',
                amount: '100',
                costPrice: '50',
                sellPrice: '150',
                sellPriceOffer: '130',
                negativeStock: '1',
                minimum: '10',
                brand: '33323b9df7da123370d73fd9',
                articleType: '61623b9df7da123370d73ff2',
                offer: '42623b9df7da294370d73ee3',
            },
        ],
    },
    {
        model: 'Trolley',
        documents: [
            {
                _id: '61623b9df7da294370a22ff4',
                available: '1',
                date: '2021-05-05',
                total: '123',
                articles: [
                    '61623b9df7da294370d22ff4',
                    '61623b9df7da294370d22ff4',
                ],
            },
            {
                _id: '61623b9df7da294370d22ba3',
                available: '1',
                date: '2021-05-05',
                total: '123',
                articles: [
                    '61623b9df7da294370d22aa3',
                    '61623b9df7da294370d22aa3',
                ],
            },
            {
                _id: '61623b9df7da294370d22af3',
                available: '1',
                date: '2021-05-05',
                total: '123',
                articles: [
                    '61623b9df7da294370d22ff3',
                    '61623b9df7da294370d22ff3',
                ],
            },
        ],
    },
    {
        model: 'Client',
        documents: [
            {
                _id: '61623b9df7da294340d33ff3',
                available: '1',
                name: 'Camilo Sanchez',
                address: 'Salta 123',
                email: 'camilo@gmail.com',
                cell: '3814000000',
                state: '1',
                trolley: '61623b9df7da294370a22ff4',
                password: '130',
                role: 'USER_ROLE',
            },
            {
                _id: '61623b9df7da294330d33ff3',
                available: '1',
                name: 'Lucas Palacios',
                address: 'Catamarca 123',
                email: 'lucas@gmail.com',
                cell: '3814000000',
                state: '1',
                trolley: '61623b9df7da294370d22ba3',
                password: '130',
                role: 'USER_ROLE',
            },
            {
                _id: '61623b9df7da294320d33ff3',
                available: '1',
                name: 'Facundo Bazan',
                address: 'Córdoba 123',
                email: 'facundo@gmail.com',
                cell: '3814000000',
                state: '1',
                trolley: '61623b9df7da294370d22af3',
                password: '130',
                role: 'USER_ROLE',
            },
        ],
    },
    {
        model: 'ReceiptDetail',
        documents: [
            {
                _id: '61623b9df7da294370a22aa4',
                available: '1',
                articles: [
                    '61623b9df7da294370d22ff4',
                    '61623b9df7da294370d22ff4',
                ],
                amount: '10',
                price: '10',
                state: '1',
            },
            {
                _id: '61623b9df7da294370a22bb4',
                available: '1',
                articles: [
                    '61623b9df7da294370d22ff4',
                    '61623b9df7da294370d22ff4',
                ],
                amount: '10',
                price: '10',
                state: '1',
            },
            {
                _id: '61623b9df7da294370a22cc4',
                available: '1',
                articles: [
                    '61623b9df7da294370d22ff4',
                    '61623b9df7da294370d22ff4',
                ],
                amount: '10',
                price: '10',
                state: '1',
            },
        ],
    },
    {
        model: 'Receipt',
        documents: [
            {
                _id: '61623b9df7da294370b22aa4',
                available: '1',
                number: '1001',
                date: '2021-05-05',
                state: '1',
                price: '100',
                client: '61623b9df7da294340d33ff3',
                receiptDetail: '61623b9df7da294370a22aa4',
            },
            {
                _id: '61623b9df7da294a70b22aa4',
                available: '1',
                number: '1001',
                date: '2021-05-05',
                state: '1',
                price: '100',
                client: '61623b9df7da294330d33ff3',
                receiptDetail: '61623b9df7da294370a22bb4',
            },
            {
                _id: '61623b9df7da29b370b22aa4',
                available: '1',
                number: '1001',
                date: '2021-05-05',
                state: '1',
                price: '100',
                client: '61623b9df7da294320d33ff3',
                receiptDetail: '61623b9df7da294370a22cc4',
            },
        ],
    },
    {
        model: 'CashRegister',
        documents: [
            {
                _id: '61623b9df7da294370d73fa7',
                available: '1',
                number: '555',
                openCheckoutDate: '2021-06-01',
                closeCheckoutDate: '2021-06-06',
                totalSales: '50',
                receipts: [
                    '61623b9df7da294370b22aa4',
                    '61623b9df7da294a70b22aa4',
                ],
                receiptsAmount: '10001',
            },
            {
                _id: '61623b9df7da294370d73fb7',
                available: '1',
                number: '556',
                openCheckoutDate: '2021-06-02',
                closeCheckoutDate: '2021-06-07',
                totalSales: '66',
                receipts: ['61623b9df7da29b370b22aa4'],
                receiptsAmount: '5551',
            },
        ],
    },
    {
        model: 'Configuration',
        documents: [
            {
                _id: '61623b9df7da294370d73cc7',
                available: '1',
                name: 'admin 1',
                adminCode: '5577',
                demo: '1',
                lastSellName: '1',
                useDecimal: '1',
                address: 'Salta 321',
                cellPhone: '381955555',
            },
        ],
    },
]
