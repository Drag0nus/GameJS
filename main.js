//Перед переглядом коду рекомендується прийняти десяток-другий капель валокардину. Так, на всякий случай ;)
var express = require('express');
var characters = require('./modules/characters');
var vector = require('./modules/vector');
var app = express();


var human = Object.create(characters.Human).constructor(new vector.vector(17, 19) , 'Male', 'CJ',      //position, gender, fullName
    10, 4, new vector.vector(5, 5),                                                                    //attack, defence, distance
    2, 10, 5, 80, false, 2);                                             //str, dex, vit, abilityToFly, attackDist
var demon = Object.create(characters.Demon).constructor(new vector.vector(300, 700), 'Female', 'Meleena',
    15, 5, new vector.vector(30, 30),
    5, 10, 100, true, 4);

app.get('/:character', function (req, res, next) {
    if (req.params.character == 'human') {
        console.log(human);
        res.status(200).send('You choosed human. Info about your hero is in console');
    } else if (req.params.character == 'demon') {
        console.log(demon);
        res.status(200).send('You choosed demon. Info about your hero is in console');
    } else {
        res.status(500).send('Error!');
    }
    next();
});

app.get('/human/moveTo/:x/:y', function (req, res, next) {
    human.moveTo(req.params.x, req.params.y);
    console.log(human.position);
    res.status(200).send('Successfully moved! New position is in console log.')
});

app.get('/demon/moveTo/:x/:y', function (req, res, next) {
    demon.moveTo(req.params.x, req.params.y);
    console.log(demon.position);
    res.status(200).send('Successfully moved! New position is in console log.')
});

//

app.listen(3030, function () {
    console.log('Server started....');
});