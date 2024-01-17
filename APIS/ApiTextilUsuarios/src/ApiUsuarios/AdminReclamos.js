const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose');
//const { default: fetch } = require('node-fetch');
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const fetch = require('node-fetch');

router.get('/:nombre', async (req, res) => {
    try {
        const { nombre } = req.params;
        var correo_descritado;
        if (nombre === "_ERROR_") {
            const x = await db
            .collection("ColUsuarios")
            .find({ UsuNombre: { $regex: "" }, CliReclamos: { $elemMatch: { RecRespuesta: 'Sin Respuesta' } } })
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
            const x = await db
            .collection("ColUsuarios")
            .find({ UsuNombre: { $regex: nombre }, "CliReclamos.RecRespuesta": "Sin Respuesta" })
            .toArray();

            let reg = x.length

            for (var i = 0; i < reg; i++){
                //x[i].UsuEmail = decrypt(x[i].UsuEmail)
                var Email = x[i].UsuEmail;
                const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
                .then(response => response.json())
                .then(data => correo_descritado = data)
                .catch(error => console.error(error));
                x[i].UsuEmail = correo_descritado;
            }
            res.send(x);
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.get('/:nombre/:respuesta', async (req, res) => {
    try {
        const { nombre } = req.params;
        const { respuesta } = req.params;
        var correo_descritado;
        if (nombre === "_ERROR_") {
            const x = await db
            .collection("ColUsuarios")
            .find({ UsuNombre: { $regex: "" }, CliReclamos: { $elemMatch: { RecRespuesta: { $exists: true } } } })
            .toArray();

            let reg = x.length

            for (var i = 0; i < reg; i++){ 
                //x[i].UsuEmail = decrypt(x[i].UsuEmail)
                var Email = x[i].UsuEmail;
                const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
                .then(response => response.json())
                .then(data => correo_descritado = data)
                .catch(error => console.error(error));
                x[i].UsuEmail = correo_descritado;
            }
            res.send(x);
        } else {
            const x = await db
            .collection("ColUsuarios")
            .find({ UsuNombre: { $regex: nombre }, "CliReclamos.RecRespuesta": { $exists: true } })
            .toArray();

            let reg = x.length

            for (var i = 0; i < reg; i++){
                //x[i].UsuEmail = decrypt(x[i].UsuEmail)
                var Email = x[i].UsuEmail;
                const correo_descrypt = await fetch("http://localhost:5000/decrypt/" + Email)
                .then(response => response.json())
                .then(data => correo_descritado = data)
                .catch(error => console.error(error));
                x[i].UsuEmail = correo_descritado;
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

        console.log(RecTitulo, RecFecha, RecRespuesta)

        const query = { _id: new ObjectId(id), "CliReclamos.RecTitulo": RecTitulo, "CliReclamos.RecFecha": RecFecha };

        const newvalues = {
            $set: { "CliReclamos.$.RecRespuesta": RecRespuesta }
        };


        db.collection("ColUsuarios").updateOne(query, newvalues, function (err, res) {

        });
        res.json("Se envio la respuesta a la sugerencia");

    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { RecTitulo, RecFecha, RecRespuesta } = req.body;

        console.log(RecTitulo, RecFecha, RecRespuesta)


        var newvalues = { $pull: { "CliReclamos": { "RecTitulo": RecTitulo } } };
        const myquery = { _id: new ObjectId(id) };

        db.collection("ColUsuarios").update(myquery, newvalues, function (err, res) {
            if (err) throw err;
        });
        res.json("Se eliminó la sugerencia")
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;