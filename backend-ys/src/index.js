const express = require('express');
var cors = require('cors')
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');
const multer = require('multer')
const uuid = require('uuid/dist/v4')
const {format} = require('timeago.js')//TODO
const http = require('http');
const socketIO = require('socket.io') 

//Initializations
const app= express();
app.use(cors())
require('dotenv').config({ path: 'variables.env' });

//Server is listenning
const server = http.createServer(app)
const port = process.env.PORT || 4000;
server.listen(4000, ()=>{console.log('Server on port', {port});})

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

// const io = socketIo(server)
// io.on('connection', socket => {
//     socket.on('conectado', () => { console.log("usuario conectado")})
// })

//Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
//app.use(methodOverride('_method'));
app.use(session({
    secret:'mysecretapp',
    resave:true,
    saveUninitialized:true
}));
// const storage = multer.diskStorage({
//     destination:path.join(__dirname, 'public/img/uploads'),
//     filename: (req,file,cb,filename)=>{
//         cb(null, uuid() + path.extname(file.originalname))
//     }
// })
// app.use(multer({storage : storage}).single('image'));
app.use((req, res, next)=>{
    app.locals.format = format; 
    next();
})

//Static Files 
app.set('public', path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')));

//Setting
//app.set('port',  4000);
// server.listen(app.get('port'), ()=>{console.log('Server on port', app.get('port') );
// })

//Routes
app.use(require('./routers/localidadRoute'));
app.use(require('./routers/tipoArticuloRoute'));
app.use(require('./routers/articuloRoute'));
app.use(require('./routers/configuracionRoute'));
app.use(require('./routers/comprobanteDetalleRoute'));
app.use(require('./routers/comprobanteRoute'));
app.use(require('./routers/clienteRoute'));
app.use(require('./routers/authRoute'));
app.use(require('./routers/boxRoute'));
app.use(require('./routers/branchRoute'));
app.use(require('./routers/offerRoute'));

mongoose.connect(process.env.DATABASECONNETION,{

    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err)); 


