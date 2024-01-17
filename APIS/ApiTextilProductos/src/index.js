const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require("cors");
const database = require("../modulos/dbconect")

// settings
app.set('port', process.env.PORT || 4002);

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

//USUARIOS
app.use('/users', require('./routes/usuario'));

//ADMINISTRADOR
app.use('/apiproductos', require('./ApiProductos/Crudproductos'));
app.use('/apilistpedidos', require('./ApiProductos/Listproductos')); //ApiListPedidos hace referencia a productos
app.use('/apilistadminproductos', require('./ApiProductos/ListAdminProductos'));
app.use('/apiunproducto', require('./ApiProductos/Unproducto'));
app.use('/apiconteo', require('./Admincontador'));
app.use('/capuchino', require('./ApiProductos/Adminimagen'));


// starting the serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});