var express = require('express');
var router = express.Router();
var pg = require("pg");
var connectionString = 'postgres://localhost:5432/omicron';
var randomNumber = require("./random_number");
router.post("/", function(req, res) {
    var theAnimal = req.body;
    var animalNumber = randomNumber.randNumber(1, 100);
    theAnimal.number = animalNumber;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        client.query("INSERT INTO animals (animal_type, animal_number)" +
            " VALUES ($1, $2)", [theAnimal.animal_name, theAnimal.number],
            function(err, result) {
                done();
                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });
    });
});
router.get("/", function(req, res) {
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            res.sendStatus(500);
        }
        client.query("SELECT * FROM animals", function(err, result) {
            done();
            if (err) {
                res.sendStatus(500);
            }
            res.send(result.rows);
        });
    });
});

module.exports = router;
