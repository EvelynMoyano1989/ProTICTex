const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
var nodemailer = require('nodemailer');
//const { encrypt, decrypt } = require('../ApiSeguridad/crypto')

router.get('/:correo', async (req, res) => {
    const { correo } = req.params;
    var correo_encritado;
    const correo_encrypt = await fetch("http://localhost:5000/encrypt/" + correo)
    .then(response => response.json())
    .then(data => correo_encritado = data)
    .catch(error => console.error(error));
    
    //const correo_encrypt = await a.json()

    
    try {
        const x = await db
            .collection("ColUsuarios")
            .find({ UsuEmail: correo_encritado })
            .toArray();
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;