// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");

function createUser(req, res) {
    let user = req.body;
    // check if all fields have been populated correctly by the user
    checkPossibleUser(user, res);
    // check if a user already exists with the username given
    checkUserExists(user, res);
    // TODO - create the user and add them to the db
    console.log(`New user: \"${user.name}\" created`);
    return res.status(200).json(user);
}

function checkPossibleUser(user, res) {
    // check to see if all necessary information has been inputted
    if (_.isEmpty(user)) {
        return res.status(400).json({status: 400, message: "User information must be given"});
    } else if (_.isEmpty(user.name)) {
        return res.status(400).json({status: 400, message: "Name for user must be set"});
    } else if (_.isEmpty(user.email)) {
        return res.status(400).json({status: 400, message: "Email for user must be set"});
    } else if (_.isEmpty(user.password)) {
        return res.status(400).json({status: 400, message: "Password for user must be set"});
    }
}

function checkUserExists(user, res) {
     // TODO: check if there already exists a user with the same name
     // make a call to the backend to see if an entry already exists w the same username
     // if an entry in the databse uses the same username:
     if (false) {
        return res.status(400).json({status: 400, message: "The entered username already exists"});
     }
     // otherwise, just return from the function as usual
}

function checkLogin(req, res) {

    db.sequelize.query('SELECT * FROM users', {
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
          console.log(data.username);
          console.log("data was found!");
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