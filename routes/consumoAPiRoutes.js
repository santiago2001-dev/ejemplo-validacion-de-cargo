const main = require('../controllers/comsumoApiController');

const router  =  require('express').Router();

router.get('/',main);

module.exports = router