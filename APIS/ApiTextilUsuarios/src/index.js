const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require("cors");
const database = require("../modulos/dbconect")

// settings
app.set('port', process.env.PORT || 4004);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());


//USUARIOS
app.use('/apiusumicuenta', require('./ApiUsuarios/Usumicuenta'));
app.use('/apiregistro', require('./ApiUsuarios/registro'));
app.use('/apiverificacion', require('./ApiUsuarios/UsuVerificacion'));
app.use('/apiusureclamo', require('./ApiUsuarios/UsuReclamos'));

//ADMINISTRADOR
app.use('/apiadminclientes', require('./ApiUsuarios/AdminClientes'));
app.use('/apiadminreclamos', require('./ApiUsuarios/AdminReclamos'));


// starting the serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});