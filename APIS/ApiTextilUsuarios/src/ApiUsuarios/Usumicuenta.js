const { Router } = require('express');
const router = new Router();
const fetch = require('node-fetch');
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;

router.get('/:pasant/:var_email', async (req, res) => {
    try {
        const { pasant } = req.params;
        const { var_email }= req.params;
        var pasant_encritado;
        var correo_encritado;
        const crypPasant = await fetch("http://localhost:5000/encryptpass/" + pasant)
        .then(response => response.json())
        .then(data => pasant_encritado = data)
        .catch(error => console.error(error));

        const crypEmail = await fetch("http://localhost:5000/encrypt/" + var_email)
        .then(response => response.json())
        .then(data => correo_encritado = data)
        .catch(error => console.error(error))
        
        const x = await db
        .collection("ColUsuarios")
        .find({ UsuEmail: correo_encritado, UsuPassword: pasant_encritado })
        .toArray();
        res.json(x);

    }catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const x = await db
        .collection("ColUsuarios")
        .find({ _id: new ObjectId(id) })
        .toArray();
        
        var correo_descritado;
        var correo = x[0].UsuEmail;
        var pass_descritado;
        var pass = x[0].UsuPassword;
        const descrypEmail = await fetch("http://localhost:5000/decrypt/" + correo)
            .then(response => response.json())
            .then(data => correo_descritado = data)
            .catch(error => console.error(error));
        x[0].UsuEmail = correo_descritado


        const descrypPass = await fetch("http://localhost:5000/decryptpass/" + pass)
            .then(response => response.json())
            .then(data1 => pass_descritado = data1)
            .catch(error => console.error(error));
        x[0].UsuPassword = pass_descritado
        
        res.send(x);
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            db.collection("ColUsuarios").deleteOne({ _id: new ObjectId(id) }, function (err, obj) {
                if (err) throw err;
                res.json("Se borro");
            });
        }
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { UsuNombre, UsuApellido, UsuDireccion, UsuTelefono, UsuCedula, UsuSocial } = req.body;
        
        var newvalues = {
            $set: {
                UsuNombre: UsuNombre,
                UsuApellido: UsuApellido,
                UsuDireccion: UsuDireccion,
                UsuTelefono: UsuTelefono,
                UsuCedula: UsuCedula,
                UsuSocial: UsuSocial,
            }
        };
        var myquery = { _id: new ObjectId(id) };
        db.collection("ColUsuarios").updateOne(myquery, newvalues, function (err, res) {
            if (err) throw console.log(err);;
            console.log("se actualizó");
        });
        res.json("se actualizó");
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});

router.post('/:id', async (req, res) => {
   
    try {
        const { id } = req.params;
        const { UsuPassword } = req.body;
        
        const crypPass = await fetch("http://localhost:5000/encryptpass/" + UsuPassword)
        .then(response => response.json())
        .then(data => pass_encritado = data)
        .catch(error => console.error(error));
        if (UsuPassword) {
            var newvalues = {
                $set: {
                    UsuPassword: pass_encritado
                }
            };
            var myquery = { _id: new ObjectId(id) };
            db.collection("ColUsuarios").updateOne(myquery, newvalues, function (err, res) {
                if (err) throw err;
                
            });
            res.json("se actualizó");
        } else {
           
            res.status(500).json("Error al guardar : ");
        }
           

        
    } catch (error) {
        res.json("Error en la API: /usuario");
    }
});



module.exports = router;