const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const fetch = require('node-fetch');
const db = mongoose.connection;
const data = require("../Data/usuarios.json")


router.get('/', async (req, res) => {

    const nota_total = await db.collection("Notes").findOne({ name: "kuku" })

    res.send(nota_total);
});

module.exports = router;