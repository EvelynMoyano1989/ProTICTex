const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");


router.post('/', (req, res) => {
    try {
        const newProducto = { ...req.body };
        db.collection('ColProductos').insertOne(newProducto);
        
        res.json("Se creo un nuevo producto");
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});

router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            db.collection("ColProductos").deleteOne({ _id: new ObjectId(id) }, function (err, obj) {
                if (err) throw err;
                res.json("Se borro");
            });
        }
    } catch (error) {
        res.json("Error en la API: /producto");
    }
});


module.exports = router;