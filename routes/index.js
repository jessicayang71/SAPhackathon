var express = require('express');
var router = express.Router();

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('.data/database.db');

// db.serialize(function () {
//   db.each('SELECT * FROM lunch', function (err, row) {
//     console.log(row.id + ': ' + row.restaurantName);
//   });
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'SAP - Lunch With Us'
    });
});

router.post('/submitForm', function(req, res, next) {
	// get from req.query
	let restaurantName = req.body.restaurantName;
	let partyName = req.body.partyName;
	let startTime = req.body.startTime;
	let partySize = ((req.body.attendees).split(",")).length;
	let attendees = req.body.attendees;
	console.log(restaurantName + ", " + partyName + ", " + startTime + ", " + partySize + ", " + attendees);

	// db init and open
    db.serialize(function() {
    	let query = "INSERT INTO lunch (restaurantName, partyName, partySize, startTime, attendees)  VALUES (?, ?, ?, ?, ?);";
  		db.run(query, restaurantName, partyName, partySize, startTime, attendees);
    });
    // db.close();
    res.sendStatus(200); // equivalent to res.status(200).send('OK')
	// return res.redirect('/');
});

router.get('/getPartyByRestaurantName', function(req, res, next) {
	let restaurantName = req.query.name; 
	var result = {}; 
	function sendRes(name) {
		res.end(name);
	}
	getPartyRestaurantName(restaurantName, sendRes);
});

function getPartyRestaurantName(restaurantName, callback){
  var query = "SELECT * FROM lunch WHERE restaurantName = '" + restaurantName + "';";
  db.all(query, function (err, rows) {
	if (err){
		console.log(err);
	} else{
		for (let i = 0; i < rows.length; i++) {
			let array = (rows[i].attendees).split(",");
			// replace string
			rows[i].attendees = array;
		}
		callback(JSON.stringify(rows));
	}
  });
  // db.close();
}

router.get('/getCommentByRestaurantName', function(req, res, next) {
	let restaurantName = req.query.name; 
	var result = {}; 
	function sendRes(name) {
		res.end(name);
	}
	getCommentByRestaurantName(restaurantName, sendRes);
});

function getCommentByRestaurantName(restaurantName, callback){
  var query = "SELECT * FROM comment WHERE restaurantName = '" + restaurantName + "';";
  db.all(query, function (err, rows) {
	if (err){
		console.log(err);
	} else{
		callback(JSON.stringify(rows));
	}
  });
  // db.close();
}

router.post('/addComment', function(req, res, next) {
	// get from req.query
	let restaurantName = req.body.restaurantName;
	let author = req.body.author;
	let content = req.body.content;
	let startTime = JSON.stringify(new Date());
	
	// db init and open
    db.serialize(function() {
    	let query = "INSERT INTO comment (restaurantName, startTime, author, content)  VALUES (?, ?, ?, ?);";
  		db.run(query, restaurantName, startTime, author, content);
    });
    // db.close();
    res.sendStatus(200); // equivalent to res.status(200).send('OK')
	// return res.redirect('/');
});

module.exports = router