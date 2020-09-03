// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");

async function createUser(req, res) {
    let user = req.body;

    let[validInput, userExists] = await Promise.all([checkPossibleUser(user), checkUserExists(user)]);
    
    // check to see if there were issues for validInput or userExists
    if (validInput.status === 400) {
        return res.status(400).json({status: 400, message: validInput.message});
    } else if (userExists.status === 400) {
        return res.status(400).json({status: 400, message: userExists.message});
    }

    // the new user is able to be created; add user to database now
    db.sequelize.query('INSERT INTO \`Users\` (username, password, instagram_account, createdAt, updatedAt) ' + 
    'VALUES (:username, :password, :instagram_account, :createdAt, :updatedAt)', {
        replacements: {username: req.body.username, password: req.body.password, 
            instagram_account: req.body.instagram_account, createdAt: new Date(), updatedAt: new Date()},
        type: db.sequelize.QueryTypes.INSERT
      })
      .then(data => {
          console.log(`New user: \"${user.username}\" created`);
          return res.status(201).json(user)
      })
      .catch(error => {
        console.error("Error when adding a new user to db");
        console.error(error);
      });
}

async function checkPossibleUser(user) {
    // check to see if all necessary information has been inputted
    if (_.isEmpty(user)) {
        return {status: 400, message: "User information must be given"};
    } else if (_.isEmpty(user.username)) {
        return {status: 400, message: "Name for user must be set"};
    } else if (_.isEmpty(user.password)) {
        return {status: 400, message: "Password for user must be set"};
    }
    return {status: 200};
}

async function checkUserExists(user) {
    return db.sequelize.query('SELECT * FROM users WHERE username=(:username)', {
        replacements: {username: user.username},
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
          if (!_.isEmpty(data)) {
            return {status: 400, message: "Username must be unique"};
          } else {
              return {status: 200};
          }
      })
      .catch(error => {
          console.error("Error when checking if username is found in db");
          return {status: 500, error};
      });
}

function checkLogin(req, res) {
    db.sequelize.query('SELECT * FROM users WHERE username=(:username)', {
        replacements: {username: req.params.username},
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
          if (data.username === req.params.username && data.password === req.params.password) {
            return res.status(200).json(data);
          } else {
            return res.status(400).json({status: 400, message: "The entered username & password were incorrect"});
          }
      })
      .catch(error => {
          console.log("error!");
          console.log(error);
      });
}



module.exports = {
    createUser : createUser,
    checkLogin: checkLogin
}