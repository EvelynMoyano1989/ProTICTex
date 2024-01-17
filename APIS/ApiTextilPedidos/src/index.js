const express = require('express');
const morgan = require('morgan');
const app = express();
var cors = require("cors");
const database = require("../modulos/dbconect")

// settings
app.set('port', process.env.PORT || 4001);

// middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// PRUEBAS
//app.use(require('./routes'));
app.use('/usu', require('./routes/insertar'));
app.use('/prueba', require('./routes/prueba'));

app.use('/apifactura', require('./ApiPedidos/Factura'))

//SEGURIDADES


//USUARIOS
app.use('/apinuevopedido', require('./ApiPedidos/Nuevopedido'));
app.use('/apiclicarrito', require('./ApiPedidos/Clicarrito'));
app.use('/apiverpedidos', require('./ApiPedidos/Clipedido'));
app.use('/apiinfopedido', require('./ApiPedidos/Cliinfopedido'));
app.use('/users', require('./routes/usuario'));

//ADMINISTRADOR

//app.use('/apipedidos', require('./ApiPedidos/Crudpedidos'));
app.use('/apiadminproducto', require('./ApiPedidos/Adminpedido')); //ApiAdminProducto hace referencia a pedidos



// starting the serve
app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});