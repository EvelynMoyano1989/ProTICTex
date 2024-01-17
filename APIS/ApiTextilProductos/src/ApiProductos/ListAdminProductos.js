const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;

router.get('/:nombre/:tipo/:color/:modelo', async (req, res) => {
    try {
        const { nombre } = req.params;
        const { tipo } = req.params;
        const { color } = req.params;
        const { modelo } = req.params;

        var var_tipo = ""
        var var_color = ""
        var var_modelo = ""

        if (tipo === "Todo") {
            var_tipo = ""
        } else {
            var_tipo = tipo
        }

        if (color === "_ERROR_") {
            var_color = ""
        } else {
            var_color = color
        }

        if (modelo === "_ERROR_") {
            var_modelo = ""
        } else {
            var_modelo = modelo
        }

        if (nombre === "_ERROR_") {
            const x = await db
                .collection("ColProductos")
                .find({ ProNombre: { $regex: "" }, ProTipo: { $regex: var_tipo }, ProColor: { $regex: var_color }, ProModelo: { $regex: var_modelo } })
                .toArray();
            res.send(x);
        } else {
            const x = await db
                .collection("ColProductos")
                .find({ ProNombre: { $regex: nombre }, ProTipo: { $regex: var_tipo }, ProColor: { $regex: var_color }, ProModelo: { $regex: var_modelo } })
                .toArray();
            res.send(x);
        }
    } catch (error) {
        res.json("Error en la API: /producto");
    }


});


module.exports = router;