const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;

router.get('/', async (req, res) => {
    try {
        const a = await db.collection("ColUsuarios").find({}).toArray();
        const b = await db.collection("ColPedidos").find({}).toArray();
        const c = await db.collection("ColPedidos").find({ PedEntrega: "Entrega a domicilio" }).toArray();
        const d = await db.collection("ColUsuarios").find({ "CliReclamos.RecRespuesta": "Sin Respuesta" }).toArray();
        const e = await db.collection("ColPedidos")
            .find({ PedEstado: { $ne: 'inicial' } })
            .sort({ $natural: -1 })
            .limit(1)
            .toArray();
        var datos = {
            "usuarios": a.length,
            "pedidos": b.length,
            "domicilio": c.length,
            "reclamos": d.length,
            "fecha": e[0].PedFecha,
            "total": e[0].PedTotal
        }

        res.send(datos);
        //console.log(datos)
    } catch (error) {
        res.json("Error en la API: /contador");
    }
}

);

module.exports = router;