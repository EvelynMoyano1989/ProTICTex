const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
            .collection("ColProductos")
            .find({ _id: new ObjectId(id) })
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { ProNombre, ProDescripcion, ProPrecio, ProProveedor, ProFechaInicial, ProFechaFinal, ProStockActual, ProTipo, ProImagen, ProColor, ProModelo, ProPeso, ProDimension, ProEstado, ProMarca, ProGarantia, ProCapacidad, ProMinimo } = req.body;

        var suma = parseFloat(ProStockActual)
        var estado = ProEstado

        if (suma > ProMinimo)
            estado = "Disponible"
        else {
            if (suma <= 0)
                estado = "No Disponible"
            else
                estado = "Adquirir"
        }

        var newvalues = {
            $set: {
                ProNombre: ProNombre,
                ProDescripcion: ProDescripcion,
                ProPrecio: ProPrecio,
                ProProveedor: ProProveedor,
                ProFechaInicial: ProFechaInicial,
                ProFechaFinal: ProFechaFinal,
                ProEstado: estado,   
                ProStockActual: ProStockActual,
                ProTipo: ProTipo,
                ProImagen: ProImagen,
                ProColor: ProColor,
                ProModelo: ProModelo,
                ProPeso: ProPeso,
                ProDimension: ProDimension,
                ProMarca: ProMarca,
                ProCapacidad: ProCapacidad,
                ProGarantia: ProGarantia,
                ProMinimo: ProMinimo
            }
        };
        var myquery = { _id: new ObjectId(id) };
        db.collection("ColProductos").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log(err);
        });
        res.json("El Producto se actualizó perfectamente");
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});


module.exports = router;