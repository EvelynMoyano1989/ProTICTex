const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;


router.get('/:varidC/:idC', async (req, res) =>{
    try{
        const { varidC } = req.params;
        const { idC } = req.params;
        const Cli_id = idC;
        const idP = varidC;
        var cant = 0;
        const x = await db
        .collection("ColPedidos")
        .find({ PedEstado: "Inicial", Cli_id: Cli_id })
        .toArray();

        if(x.length === 0){
            res.json(cant);
            
        } else {
            const y = await db
            .collection("ColPedidos")
            .find({ PedEstado: "Inicial", Cli_id: Cli_id, "PedLisProductos.Pro_id": idP })
            .toArray();

            if (y.length === 0) {
                res.json(cant);
            } else {
                let reg = y[0].PedLisProductos.length;

                for (var i = 0; i < reg; i++){
                  
                    if (y[0].PedLisProductos[i].Pro_id === idP){
                        cant = y[0].PedLisProductos[i].ProCantidad;
                        
                        res.json(y[0].PedLisProductos[i].ProCantidad);
                        break;
                    }  
                }
                
            }
        }
    }catch(error){
        res.json("Error en la API: /apinuevopedido 1");
    }
});

router.post('/:producto', async (req, res) => {
    try {
        const { producto } = req.params;
        const { Cli_id, PedFecha, PedEstado, ProNombre, ProPrecio, ProCantidad, ProImagen, ProStock } = req.body;
        const newPedido = { ...req.body };
        const x = await db
            .collection("ColPedidos")
            .find({ PedEstado: "Inicial", Cli_id: Cli_id })
            .toArray();


        if (x.length === 0) {
            db.collection('ColPedidos').insertOne({ Cli_id: Cli_id, PedFecha: PedFecha, PedEstado: PedEstado });
            db.collection('ColPedidos').updateOne({ PedEstado: "Inicial", Cli_id: Cli_id }, { $push: { PedLisProductos: { $each: [{ Pro_id: producto, ProNombre: ProNombre, ProPrecio: ProPrecio, ProCantidad: ProCantidad, ProImagen: ProImagen }] } } })
            res.send("Se guardo un nuevo producto al carrito");
        }
        else {

            const y = await db
                .collection("ColPedidos")
                .find({ PedEstado: "Inicial", Cli_id: Cli_id, "PedLisProductos.Pro_id": producto })
                .toArray();

            if (y.length === 0) {
                db.collection('ColPedidos').updateOne({ PedEstado: "Inicial", Cli_id: Cli_id }, { $push: { PedLisProductos: { $each: [{ Pro_id: producto, ProNombre: ProNombre, ProPrecio: ProPrecio, ProCantidad: ProCantidad, ProImagen: ProImagen }] } } })
                res.send("Se guardo un nuevo producto al carrito");
            } else {

                let nuevo_pro = 0
                

                let reg = y[0].PedLisProductos.length

                for (var i = 0; i < reg; i++)
                    if (y[0].PedLisProductos[i].Pro_id === producto)
                        nuevo_pro = ProCantidad + y[0].PedLisProductos[i].ProCantidad


                if (nuevo_pro > ProStock)
                    res.send("La cantidad ya esta agregada en su carrito !");
                else {
                    db.collection('ColPedidos').updateOne({ PedEstado: "Inicial", Cli_id: Cli_id, "PedLisProductos.Pro_id": producto }, { $set: { "PedLisProductos.$.ProCantidad": nuevo_pro } })
                    res.send("Se guardo un nuevo producto al carrito");
                }
            }

        }

    } catch (error) {
        console.log(error)
        res.json("Error7 en la API: /pedidos");
    }
});


module.exports = router;