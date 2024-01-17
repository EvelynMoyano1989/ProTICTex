const { Router } = require('express');
const router = new Router();
const { mongoose } = require('mongoose')
const db = mongoose.connection;
const ObjectId = require('mongodb').ObjectId;
const crypto = require('crypto')



router.get('/:correo', async (req, res) => {
    
    try{
        const algorithm = "aes-256-ctr"
        const secretKey = "vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3"
        const { correo } = req.params;
        const iv = "8fdb43a3846a8807259fc76b4e54e4a6"

        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'))

        //const decrpyted = Buffer.concat([decipher.update(Buffer.from(correo, 'hex')), decipher.final()])
        let decrpyted = decipher.update(Buffer.from(correo, 'hex'));
        decrpyted = Buffer.concat([decrpyted, decipher.final()]);
        //res.json(decrpyted.toString());

        const x = decrpyted
        res.json(x.toString());
        
    } catch (error){
        res.json("Erro en la API: /seguridad")
    }

});
module.exports = router;




