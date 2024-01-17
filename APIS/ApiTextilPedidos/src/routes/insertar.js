const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const fetch = require('node-fetch');
const db = mongoose.connection;
const data = require("../Data/usuarios.json")
const ObjectId = require('mongodb').ObjectId;


router.get('/', async (req, res) => {

    //UPDATE DE DATOS
    
    var newvalues = {  $set: {name: "Mickey", estado : "en carrito"} };
    var myquery = { _id: new ObjectId("62f575440d2ed8305a4c7dd6") };
    db.collection("Notes").updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("se actualizó");
    });
    res.send("Se actualizó");

    //DETELE DE DATOS
    /*db.collection("Notes").deleteOne({ _id: new ObjectId("62f565ff015302b4b7458c9a") }, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        res.send("Se borro");
    });*/

    //CONSULTA MUCHOS
    //var cursor = await db.collection('Notes').find({ name: "kuku" }).toArray();
    //await cursor.forEach(console.dir)


    //CONSULTA POR UN ID 
    //var good_id = new ObjectId("62f56e90a1c8807f06b09ef7");
    /*const nota_id = await db.collection("Notes").findOne( { _id: new ObjectId("62f56e90a1c8807f06b09ef7") })
    console.log(nota_id)
    res.send(nota_id)*/

    //CONSULTA UNO
    /*var note = db.collection("Notes")
    const nota_total = await note.findOne({ name: "kuku" })*/
    //console.log(nota_total)


    //CONSULTAR TODOS
    /*const x = await db
        .collection("Notes")
        .find({})
        .toArray();
    res.send(x);*/


    //INSERTAR CON JSON LOCAL
    //db.collection('Notes').insertOne(data);


    //INSERTAR DIRECTAMENTE
    /* db.collection('Notes').insertOne({
         Employeeid: 4,
         EmployeeName: "NewEmployee"
     });*/


    //INSERTAR CON OBJETO
    /*const colum = db.collection("notes")
    colum.insertOne({
        Employeeid: 4,
        EmployeeName: "NewEmployee"
    })*/


    //INSERTAR CON ESQUEMA
    /*const noteSchema = new mongoose.Schema({
        content: String,
        date: Date,
        important: Boolean,
    })

    const Note = mongoose.model('Note', noteSchema)

    const note = new Note({
        content: 'HTML is Easy',
        date: new Date(),
        important: false,
    })

    note.save().then(result => {
        res.send("se guardo");
        mongoose.connection.close()
    })*/

    //res.send("se guardo");
});

module.exports = router;