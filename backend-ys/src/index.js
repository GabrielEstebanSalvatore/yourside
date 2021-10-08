const express = require('express')
var cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const path = require('path')
const multer = require('multer')
const { format } = require('timeago.js') //TODO
const http = require('http')
const socketIO = require('socket.io')
// swagger
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')
//Initializations
const app = express()
app.use(cors())
require('dotenv').config({ path: 'variables.env' })
// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//Server is listenning
const server = http.createServer(app)
const port = process.env.PORT || 4000
server.listen(4000, () => {
    console.log('Server on port', { port })
})

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server)
require('./sockets/socket')

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//app.use(methodOverride('_method'));
app.use(
    session({
        secret: 'mysecretapp',
        resave: true,
        saveUninitialized: true,
    })
)

app.use((req, res, next) => {
    app.locals.format = format
    next()
})

//Static Files
app.set('public', path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')))

//Routes
app.use(require('./routers/localidadRoute'))
app.use(require('./routers/articleTypeRoute'))
app.use(require('./routers/articleRoute'))
app.use(require('./routers/configuracionRoute'))
app.use(require('./routers/comprobanteDetalleRoute'))
app.use(require('./routers/comprobanteRoute'))
app.use(require('./routers/clienteRoute'))
app.use(require('./routers/authRoute'))
app.use(require('./routers/boxRoute'))
app.use(require('./routers/brandRoute'))
app.use(require('./routers/offerRoute'))

mongoose
    .connect(process.env.DATABASECONNETION, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then((db) => console.log('DB is connected'))
    .catch((err) => console.error(err))
