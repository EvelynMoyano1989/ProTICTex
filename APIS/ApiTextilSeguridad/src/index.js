const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require("cors");
const database = require("../modulos/dbconect")

// settings
app.set('port', process.env.PORT || 4003);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// PRUEBAS
//app.use(require('./routes'));
app.use('/usu', require('./routes/insertar'));
app.use('/prueba', require('./routes/prueba'));


//SEGURIDADES
//app.use('/encryp', require('./ApiSeguridad/encrip'));
app.use('/apirecuperar', require('./ApiSeguridad/recuperar'));
app.use('/encrypt', require('./ApiSeguridad/encryp'));
app.use('/decrypt', require('./ApiSeguridad/decryp'));
app.use('/encryptpass', require('./ApiSeguridad/encryppass'));
app.use('/decryptpass', require('./ApiSeguridad/decryppass'));
//app.use('/cripto', require('./ApiSeguridad/encrip'));

//USUARIOS
app.use('/users', require('./routes/usuario'));

//ADMINISTRADOR
app.use('/apiconteo', require('./Admincontador'));


// starting the serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});