const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:id/:tipo/:entrega/:tipoentrega', async (req, res) => {
    try {
        const { id } = req.params;
        const { tipo } = req.params;
        const { entrega } = req.params;
        const { tipoentrega } = req.params;
        var var_tipo = ""
        var var_entrega = ""
        var var_tipoentrega = ""

        if (tipo === "Todo"){
            var_tipo = ""
        }else{
            var_tipo = tipo
        }

        if (entrega === "Todo"){
            var_entrega = ""
        }else{
            var_entrega = entrega
        }

        if (tipoentrega === "Todo"){
            var_tipoentrega = ""
        }else{
            var_tipoentrega = tipoentrega
        }
//se utiliza para hacer consultas por codido de producto
        if (id === "_ERROR_") {
            if(var_tipo == tipo){
                const x = await db
                .collection("ColPedidos")
                .find({ PedTransaccion: { $regex: var_entrega }, PedFactura: { $eq: var_tipo }, PedEntrega: { $regex: var_tipoentrega } })
                .sort({ PedFecha: -1 })
                .toArray();
                let reg = x.length

                for (var i = 0; i < reg; i++) {
                    const y = await db
                        .collection("ColUsuarios")
                        .find({ _id: new ObjectId(x[i].Cli_id) })
                        .toArray();

                    if (y.length != 0) {
                        x[i].UsuNombre = y[0].UsuNombre + " " + y[0].UsuApellido
                        x[i].UsuCedula = y[0].UsuCedula
                    }
                }
                res.send(x);
            }else{
                const x = await db
                .collection("ColPedidos")
                .find({ PedTransaccion: { $regex: var_entrega }, PedFactura: { $regex: var_tipo }, PedEntrega: { $regex: var_tipoentrega } })
                .sort({ PedFecha: -1 })
                .toArray();
                let reg = x.length

                for (var i = 0; i < reg; i++) {
                    const y = await db
                        .collection("ColUsuarios")
                        .find({ _id: new ObjectId(x[i].Cli_id) })
                        .toArray();

                    if (y.length != 0) {
                        x[i].UsuNombre = y[0].UsuNombre + " " + y[0].UsuApellido
                        x[i].UsuCedula = y[0].UsuCedula
                    }
                }
                res.send(x);
            }
        } else {
            const x = await db
                .collection("ColPedidos")
                .find({ _id: new ObjectId(id), PedTransaccion: { $regex: var_entrega }, PedFactura: { $regex: var_tipo }, PedEntrega: { $regex: var_tipoentrega } })
                .sort({ PedFecha: -1 })
                .toArray();

            let reg = x.length

            for (var i = 0; i < reg; i++) {
                const y = await db
                    .collection("ColUsuarios")
                    .find({ _id: new ObjectId(x[i].Cli_id) })
                    .toArray();

                if (y.length != 0) {
                    x[i].UsuNombre = y[0].UsuNombre + " " + y[0].UsuApellido
                    x[i].UsuCedula = y[0].UsuCedula
                }
            }

            res.send(x);
            //console.log(x)
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }

});


router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
            .collection("ColPedidos")
            .find({ _id: new ObjectId(id) })
            .sort({ PedFecha: -1 })
            .toArray();

        res.send(x);

    } catch (error) {
        res.json("Error en la API: /usuario");
    }

});


module.exports = router;