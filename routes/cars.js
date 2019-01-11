var express = require('express');
var router = express.Router();
var cors = require('cors');
var List = require("collections/list");
var jsonexport = require('jsonexport');
var fs = require('fs');

var carsDbList = [{"id": 1, "name": "Chevy Opala"}, {"id": 2, "name": "Audi A4"}];
var sequenceId = 3;

router.options('*', cors());

router.get('/', cors(), function(req, res) {
    res.json(carsDbList);
});

router.get('/csv', cors(), function(req, res){
    var carsToExport = carsDbList;
    var csvFile = "";
    jsonexport(carsToExport,function(err, csv){
        if(err) return console.log(err);
        csvFile = csv;
    });
    fs.writeFile("carsList.csv", csvFile, function (err) {
        if (err) return console.log(err)});
    res.status(200).sendFile(__dirname + "/carsList.csv");
});

router.delete('/', cors(), function(req, res){
    res.setHeader('Content-Type', 'application/json');
    var carToDelete = req.body;
    if (carsDbList.has(carToDelete)){
        carsDbList.delete(carToDelete);
        res.status(200).send('The car was deleted with success!');
    } else {
        res.status(500).send('This car does not exists on the DB!');
    }
});

router.post('/', cors(), function(req, res){
    var newCar = { "id": sequenceId, "name": req.body.name };
    if (!verifyCarFields(req)) {
        res.status(500).send('The field is empty, please check!');
    } else {
        carsDbList.add(newCar);
        res.status(200).send('New Car Added!');
        sequenceId++;
    }
});

function verifyCarFields(req){
    var carName = req.body.name;
    carName = carName.trim();
    return carName.length >= 1;
}

module.exports = router;
