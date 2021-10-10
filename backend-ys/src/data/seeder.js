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
        './src/models/image/imageModel',
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
            'Image',
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
                image: '616300408b082150e4c69cad',
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
                image: '61631482452110323033c9da',
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
                image: '61631528452110323033eb0b',
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
            {
                _id: '616301f5611f6726147fa515',
                available: '1',
                date: '2021-10-10T15:07:53.322+00:00',
                total: '0',
                articles: [],
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
                password:
                    '$2a$10$x156AquPuFuFV2v/E2/WaeP/bPIXBI5Br9bvyIGtfn4lzmrzsNIsC',
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
                password:
                    '$2a$10$x156AquPuFuFV2v/E2/WaeP/bPIXBI5Br9bvyIGtfn4lzmrzsNIsC',
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
                password:
                    '$2a$10$x156AquPuFuFV2v/E2/WaeP/bPIXBI5Br9bvyIGtfn4lzmrzsNIsC',
                role: 'USER_ROLE',
            },
            {
                _id: '616301f5611f6726147fa514',
                available: '1',
                name: 'admin',
                address: 'Salta 123',
                email: 'admin@admin.com',
                cell: '123456',
                state: '1',
                trolley: '616301f5611f6726147fa515',
                password:
                    '$2a$10$x156AquPuFuFV2v/E2/WaeP/bPIXBI5Br9bvyIGtfn4lzmrzsNIsC',
                role: 'ADMIN_ROLE',
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
    {
        model: 'Image',
        documents: [
            {
                _id: '616300408b082150e4c69cad',
                available: '1',
                created: '2021-10-10T16:11:30.122+00:00',
                filename:
                    'image-1eef59ae-3e70-495b-80a9-caf1181be5a3coca-cola-2l.jpg',
                path: '/img/dummy/image-1eef59ae-3e70-495b-80a9-caf1181be5a3coca-cola-2l.jpg',
                originalname: 'coca-cola-2l.jpg',
                mimetype: 'image/jpeg',
                size: '11968',
            },
            {
                _id: '61631482452110323033c9da',
                available: '1',
                created: '2021-10-10T16:18:10.706+00:00',
                filename:
                    'image-566622b5-6cad-4f19-a5a8-b83378db33b3fernet-branca-750.jpg',
                path: '/img/dummy/image-566622b5-6cad-4f19-a5a8-b83378db33b3fernet-branca-750.jpg',
                originalname: 'fernet-branca-750.jpg',
                mimetype: 'image/jpeg',
                size: '16887',
            },
            {
                _id: '61631528452110323033eb0b',
                available: '1',
                created: '2021-10-10T16:18:10.706+00:00',
                filename:
                    'image-4e8e604a-00dd-4cba-a017-25ad25cf911dcerveza-quilmes-latas.jpg',
                path: '/img/dummy/image-4e8e604a-00dd-4cba-a017-25ad25cf911dcerveza-quilmes-latas.jpg',
                originalname: 'cerveza-quilmes-latas.jpg',
                mimetype: 'image/jpeg',
                size: '45844',
            },
        ],
    },
]
