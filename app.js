//import express from 'express';
const config = require('./config.js');
const port = config.port;

const express = require('express');
const bodyParser = require('body-parser');
const url = require('url');

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

app.post('/user', (req, res) => {
    // req.body includes all of the fields we need
    const user = req.body;
    // now send this to manager level

    res.json(user);
});

app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method\n');
});

app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method\n');
});
   
app.listen(port, () =>
console.log(`Example app listening on port ${port}!`),
);

/**
 * INSTAGRAM ENDPOINTS
 */

 /**
 * LEADERBOARD ENDPOINTS
 */

/**
 * GAME STATE ENDPOINTS
 */

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