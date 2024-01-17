const { Router } = require('express');
const router = new Router();

const fetch = require('node-fetch');
const pro = [
  {id: 1, name: 'se guardo'}
];

const pro2 = [
  {id: 1, name: 'todo ok !! '}
];

const pro3 = [
  {id: 1, name: 'error'}
];

router.get('/', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();   

    res.json(pro2);
    //res.send("se guardo");
});

router.post('/', (req, res) => {
  const { var11 } = req.body;
  if (var11) {
    //pro2.push({'id' : 2, 'name' : var11});
    console.log("le valor es : " + var11);
    res.json(pro);
  } else {
    res.json(pro3);
  }
});

module.exports = router;
