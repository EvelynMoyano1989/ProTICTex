const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
            .collection("ColPedidos")
            .find({ Cli_id: id, PedEstado: { $ne: 'Inicial' } })
            .sort({ $natural: -1 })
            .limit(1)
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error3 en la API: /pedidos");
    }

});

module.exports = router;