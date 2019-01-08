var express = require('express');
var router = express.Router();
var cars = [{"name": "Chevy Opala"}, {"name": "Audi A4"}];
var cors = require('cors');

router.options('*', cors());

router.get('/', cors(), function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.json(cars);
});

router.post('/', cors(), function(req, res){
    var carName = req.body;
    if (!verifyCarFields(req)) {
        res.status(500).send('The field is empty, please check!');
    } else {
        cars.push(carName);
        res.status(200).send('New Car Added!');
    }
});

function verifyCarFields(req){
    var carName = req.body.name;
    carName = carName.trim();
    if (carName.length < 1) return false;
    return true;
}

module.exports = router;
