const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:id/:tipo', async (req, res) => {

    try {
        const { id } = req.params;
        const { tipo } = req.params;
        var var_tipo = ""

        if (tipo === "Todo") {
            var_tipo = ""
        } else {
            var_tipo = tipo
        }

        const x = await db
            .collection("ColPedidos")
            .find({ Cli_id: id, PedEstado: { $regex: var_tipo, $ne: "Inicial" } })
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /pedidos 4 ");
    }
});

module.exports = router;