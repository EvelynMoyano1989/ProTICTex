const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const fetch = require('node-fetch');


router.get('/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        
        if (nombre === "_ERROR_") {
            var correo_descritado;
            const x = await db
                .collection("ColUsuarios")
                .find({ UsuNombre: { $regex: "" }, UsuRol: "Cliente" })
                .toArray();

            let reg = x.length
            for (var i = 0; i < reg; i++){
                
                var Email = x[i].UsuEmail;
                const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
                .then(response => response.json())
                .then(data => correo_descritado = data)
                .catch(error => console.error(error));
                x[i].UsuEmail = correo_descritado; 
            }    
            res.send(x);
        } else {
            var correo_descritado;
            const x = await db
                .collection("ColUsuarios")
                .find({ UsuNombre: { $regex: `^${nombre}` } , UsuRol: "Cliente" })
                .toArray();

            let reg = x.length
            console.log("VALOR REG1 "+ reg)
            for (var i = 0; i < reg; i++){
               
                var Email = x[i].UsuEmail;
                console.log("CORREO ENC1 "+ Email)
                const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
                .then(response => response.json())
                .then(data => correo_descritado = data)
                .catch(error => console.error(error));
                console.log("PARTE 1")
                x[i].UsuEmail = correo_descritado; 
                console.log("PARTE 2")
                console.log("CORREO DES1 "+correo_descritado)
            }
            res.send(x);
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { RecTitulo, RecFecha, RecRespuesta } = req.body;

        const query = { _id: new ObjectId(id), "CliReclamos.RecTitulo": RecTitulo, "CliReclamos.RecFecha": RecFecha };

        const newvalues = {
            $set: { "CliReclamos.$.RecRespuesta": RecRespuesta }
        };

        db.collection("ColUsuarios").updateOne(query, newvalues, function (err, res) {

        });
        res.json("Se Agrego la respuesta");
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { RecTitulo, RecFecha, RecRespuesta } = req.body;

        var newvalues = { $pull: { "CliReclamos": { "RecTitulo": RecTitulo } } };
        const myquery = { _id: new ObjectId(id) };

        db.collection("ColUsuarios").update(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
        res.json("Se borro el reclamo")
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;