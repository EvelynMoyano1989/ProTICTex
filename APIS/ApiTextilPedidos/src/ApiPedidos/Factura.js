const { Router } = require('express');
const router = new Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const fetch = require('node-fetch');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.sendFile(process.cwd() + '/facturas/'+ id +'.pdf');
});

router.post('/', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.status(400).json("Error al subir la factura!");
            }

            const { name } = req.body;

            const tempPath = req.file.path;
            const targetPath = (process.cwd() + '/facturas/' + name + '.pdf');

            fs.rename(tempPath, targetPath, err => {

                var newvalues2 = { $set: { PedFactura: "Facturado"} };
                db.collection("ColPedidos").updateOne({ _id: new ObjectId(name) }, newvalues2)

                res.send("Se ha subido la factura")
            });

        });
    } catch (error) {
        res.json("Error en la API: /insertar archivo");
    }
});

router.put('/:id', async (req, res) => {
    try {

        const { id } = req.params;
        const { ProTransaccion } = req.body;
        var newvalues2 = { $set: { PedTransaccion: ProTransaccion} };
        await db.collection("ColPedidos").updateOne({ _id: new ObjectId(id) }, newvalues2)

        const x = await db
        .collection("ColPedidos")
        .findOne({ _id: new ObjectId(id)  })
        

        let reg = x.length

        if (x) {
            const Transa = x.PedTransaccion;
            const Fact = x.PedFactura;
            if(Transa == "Entregado" && Fact == "Facturado"){
                const pEst = "Finalizado";
                var newvalues3 = { $set: { PedEstado: pEst} }
                await db.collection("ColPedidos").updateOne({ _id: new ObjectId(id) }, newvalues3)
            }else{
                var newvalues4 = { $set: { PedEstado: "Pagado"} }
                await db.collection("ColPedidos").updateOne({ _id: new ObjectId(id) }, newvalues4)
            }
        }

        res.json("Se ha actualizado la entrega")

    } catch (error) {
        res.json("Error en la API: cambio de estado" + error);
    }
});

router.delete('/:name',  async (req, res) =>{
    try{
        const { name } = req.params;
        const path = process.cwd();
        const targetPath = (process.cwd() + '/facturas/' + name + '.pdf');
        fs.unlink(targetPath, err => {
            var newvalues5 = { $set: { PedFactura: "No Facturado"} };
            db.collection("ColPedidos").updateOne({ _id: new ObjectId(name) }, newvalues5)
            res.json("Se ha eliminado la factura")
        });
        

    }catch (error){
        res.json("Error en la API: /Eliminar Factura");
    }
});

module.exports = router;