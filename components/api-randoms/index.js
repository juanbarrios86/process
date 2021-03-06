const { Router } = require('express');
const router = new Router();

const { fork } = require('child_process');
const child_process = fork('./components/api-randoms/child_process.js');

console.log();

module.exports = (app) => {
  app.use('/api/randoms', router);

  router.get('/', (req, res) => {
    let cant = req.query.cant || 100000000;
    child_process.send(cant);
    child_process.on('message', (msj) => {
      res.send(msj.res);
    });
  });
};
