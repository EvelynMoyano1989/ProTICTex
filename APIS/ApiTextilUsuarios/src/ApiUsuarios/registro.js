
var { Router } = require('express');
var router = new Router();
const fetch = require('node-fetch');
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;



router.get('/:correo/:pass/:rol', async (req, res) => {
    const { correo } = req.params;
    const { pass } = req.params;
    const { rol } = req.params;
    var correo_encritado;
    var pass_encritado;

    const crypEmail = await fetch("http://localhost:5000/encrypt/" + correo) 
    .then(response => response.json())
    .then(data => correo_encritado = data)
    .catch(error => console.error(error));

    const crypPass = await fetch("http://localhost:5000/encryptpass/" + pass) 
    .then(response => response.json())
    .then(data => pass_encritado = data)
    .catch(error => console.error(error));
    
    try {
        if (rol === "Movil") {
            const x = await db
                .collection("ColUsuarios")
                .find({ UsuEmail: correo_encritado, UsuPassword: pass_encritado })
                .toArray();
            res.json(x);
        }
        else {
            const x = await db
                .collection("ColUsuarios")
                .find({ UsuEmail: correo_encritado, UsuPassword: pass_encritado })
                .toArray();
            res.json(x);
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/', async (req, res) => {
    var correo_encritado;
    var pass_encritado;
    
    const { UsuEmail,UsuPassword,UsuRol } = req.body

    const crypEmail = await fetch("http://localhost:5000/encrypt/" + UsuEmail)
    .then(response => response.json())
    .then(data => correo_encritado = data)
    .catch(error => console.error(error));

    const crypPass = await fetch("http://localhost:5000/encryptpass/" + UsuPassword)
    .then(response => response.json())
    .then(data => pass_encritado = data)
    .catch(error => console.error(error));
    
    const newUsuario = {UsuEmail: correo_encritado, UsuPassword: pass_encritado, UsuRol: UsuRol , UsuNombre: "", UsuApellido: "", UsuDireccion: "", UsuTelefono: "", CliReclamos: [] };
    try {
        db.collection('ColUsuarios').insertOne(newUsuario);
        res.json("Se inserto con éxito");
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});


module.exports = router;