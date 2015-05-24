//Перед переглядом коду рекомендується прийняти десяток-другий капель валокардину. Так, на всякий случай ;)
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/rusinDb');

var characters = require('./modules/characters');
var vector = require('./modules/vector');

var app = express();
var db = mongoose.connection;
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {

    var char_human = Object.create(characters.Human).constructor(new vector.vector(3, 4),
        'human', null, 10, 4,
        new vector.vector(5, 5),
        10, 5, 80, false, 2);

    var char_demon = Object.create(characters.Demon).constructor(new vector.vector(100, 100),
        'demon', null, 15, 5,
        new vector.vector(30, 30),
        5, 10, 100, true, 4);

    var Schema = mongoose.Schema;
    var racesSchema = new Schema({
        race: String,
        currentPosition: Object,
        attack: Number,
        defence: Number,
        maxDistance: Object,
        strength: Number,
        dexterity: Number,
        vitality: Number,
        attackSpeed: Number,
        abilityToFly: Boolean
    }, {collection: 'Races'});

    if(!mongoose.Schemas){
        mongoose.Schemas = {};
    }
    mongoose.Schemas['Race'] = racesSchema;

    var characterSchema = new Schema({
        fullName: String,
        gender: String,
        race: String,
        mainParameters: Object,
        nextPosition: Object
    }, {collection: 'Chars'});

    if(!mongoose.Schemas){
        mongoose.Schemas = {};
    }
    mongoose.Schemas['Char'] = characterSchema;

    var Character = mongoose.model('Char', characterSchema);
    var Human = mongoose.model('Human', racesSchema);
    var Demon = mongoose.model('Demon', racesSchema);

    var character = new Character({
        fullName: null,
        gender: null,
        race: null,
        mainParameters: {},
        nextPosition: {}
    });

    var human = new Human({
        race: 'Human',
        currentPosition: new vector.vector(3, 4),
        attack: 10,
        defence: 4,
        maxDistance: new vector.vector(5, 5),
        strength: 10,
        dexterity: 5,
        vitality: 80,
        attackSpeed: 2,
        abilityToFly: false
    });

    var demon = new Demon({
        race: 'Demon',
        currentPosition: new vector.vector(100, 100),
        attack: 15,
        defence: 5,
        maxDistance: vector.vector(30, 30),
        strength: 5,
        dexterity: 10,
        vitality: 100,
        attackSpeed: 4,
        abilityToFly: true
    });

    app.get('/registration/', function (req, res, next) {
        res.status(200).send('Hello, let`s create a hero. Choose your name, race, and gender!');
        next();
    });

    app.get('/registration/:name/:surname/:gender/:race', function (req, res, next) {

        if(req.params.name + ' ' + req.params.surname == character.fullName) {
            character.update();
        } else {
            character.fullName = req.params.name + ' ' + req.params.surname;
        }
        character.gender = req.params.gender;

        if (req.params.race == 'human') {
            character.race = 'Human';
            character.mainParameters = human;
            console.log(human);
            res.status(200).send('You choosed human. Info about your hero is in console');
        } else if (req.params.race == 'demon') {
            character.race = 'Demon';
            character.mainParameters = demon;
            console.log(demon);
            res.status(200).send('You choosed demon. Info about your hero is in console');
        } else {
            res.status(500).send('Error! You only can choose between human and demon');
        }
        character.save();
        next();
    });

    app.get('/human/moveTo/:x/:y', function (req, res, next) {
            character.nextPosition = new vector.vector(req.params.x, req.params.y);
            char_human.moveTo(req.params.x, req.params.y);
            character.currentPosition = char_human.position;
            character.save();
            console.log(char_human.position);
            res.status(200).send('Successfully moved! New position is in console log.');
            next();
    });

    app.get('/demon/moveTo/:x/:y', function (req, res, next) {
        character.nextPosition = new vector.vector(req.params.x, req.params.y);
        char_demon.moveTo(req.params.x, req.params.y);
        character.save();
        console.log(char_demon.position);
        res.status(200).send('Successfully moved! New position is in console log.');
        next();
    });

    app.get('/:character/fight/:enemy', function (req, res, next) {
        if (req.params.character == 'human' && req.params.enemy == 'demon') {
            char_human.fight(char_demon);
            res.status(200).send('Human wants to fight with demon. Fight begins. Look in console!');
        } else if (req.params.character == 'demon' && req.params.enemy == 'human') {
            char_demon.fight(char_human);
            res.status(200).send('Demon wants to fight with human. Fight begins. Look in console!');
        } else {
            res.status(500).send('Error!');
        }
    });
});

app.listen(3030, function () {
    console.log('Server started....');
});

