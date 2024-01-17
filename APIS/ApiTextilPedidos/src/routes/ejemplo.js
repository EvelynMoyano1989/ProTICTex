const { Router } = require('express');
const router = new Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }).single("file");
const fs = require("fs");

router.get('/:img', async (req, res) => {
    const { img } = req.params;
    res.sendFile(process.cwd() + '/imagenes/' + img);
});

router.post('/', (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) {
                res.status(400).json("Something went wrong!");
            }

            const { name } = req.body;

            const tempPath = req.file.path;
            const targetPath = (process.cwd() + '/imagenes/' + name + '.jpg');

            fs.rename(tempPath, targetPath, err => {

                res.send("Todo ok")

            });

        });
    } catch (error) {
        res.json("Error en la API: /insertar imagen");
    }
});

module.exports = router;