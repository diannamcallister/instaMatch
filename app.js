const {getImagesFromInstagram} = require('./backend/controllers/instagram-endpoints');
const {createUser, checkLogin} = require('./backend/controllers/users.js');
const config = require('./config.js');
const port = config.port;

// import express from 'express';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
app.use(bodyParser.json());

/**
 * USER-RELATED ENDPOINTS
 */
app.get('/user/:id', (req, res) => {
    // this gets you the id of the user
    console.log(req.params.id);
    return res.send('Received a GET HTTP method\n');
});

app.get('/user/:username/:password', (req, res) => checkLogin(req, res));

app.post('/user', (req, res) => createUser(req, res));

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method\n');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method\n');
});

/**
 * INSTAGRAM ENDPOINTS
 */
app.get('/insta/:account_name', (req, res) => {
    // get instagram account name
    const account_name = req.params.account_name;
    // create another function to perform a GET request to instagram's APIs - in another file?
    return getImagesFromInstagram(account_name).then((results) => {
        console.log("made it to results!");
        console.log(results);
        return res.send('GET a certain instagram account\n');
    })
});

app.get('/insta/me', (req, res) => {
    // the user wants to use their own pics
    // perform db query to get the user's instagram account
    // perform a GET request to instragram's APIs - in another file?
    return res.send('GET my own instagram account\n');
});

 /**
 * LEADERBOARD ENDPOINTS
 */
app.get('/leaderboard/:id', (req, res) => {
    // get user's leaderboard results
    const id = req.params.id;
    return res.send('GET a user\'s leaderboard results\n');
});

app.post('/leaderboard/:id', (req, res) => {
    // add a user's results to their leaderboard ]
    const id = req.params.id;
    return res.send('POST a user\'s leaderboard results\n');
});

/**
 * GAME STATE ENDPOINTS - add these if want to allow the user to pause / come back to their game
 */

/**
 * Database Connection
 */
const db = require("./backend/db-configs/db.index");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.\n");
});


 // listening for the above endpoints
app.listen(port, () =>
console.log(`Example app listening on port ${port}!\n`),
);

/**
 * DATABASE ACTIVATION
 */
// const mysql = require('mysql');
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'user',
//   password: 'password',
//   database: 'database name'
// });
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
// });