const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:cliente', async (req, res) => {
    try {
        const { cliente } = req.params;

        const x = await db
            .collection("ColUsuarios")
            .find({ _id: new ObjectId(cliente) })
            .toArray();

        res.send(x);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:cliente', async (req, res) => {
    try {
        const { cliente } = req.params;

        const { RecTitulo, RecDetalle, RecFecha } = req.body;

        db.collection('ColUsuarios').updateOne({ _id: new ObjectId(cliente) }, { $push: { CliReclamos: { $each: [{ RecTitulo: RecTitulo, RecDetalle: RecDetalle, RecFecha: RecFecha, RecRespuesta: "Sin Respuesta" }] } } })

        res.json("Se agrego un reclamo");

    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});




module.exports = router;