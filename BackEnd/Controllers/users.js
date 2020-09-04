// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");
const {db_createUser, db_getUserByUsername} = require('../dao/sql-queries');


async function createUser(req, res) {
    let user = req.body;

    let[validUser, userExists] = await Promise.all([checkValidUser(user), checkUserExists(user)]);
    
    // check to see if there were issues for validUser or userExists
    if (validUser.status === 400) {
        return res.status(400).json({status: 400, message: validUser.message});
    } else if (validUser.status == 500) {
        return res.status(500).json({status: 500, message: validUser.message});
    } else if (userExists.status === 400) {
        return res.status(400).json({status: 400, message: userExists.message});
    } else if (userExists.status === 500) {
        return res.status(500).json({status: 500, message: userExists.message});
    }

    // the new user is able to be created; add user to database now
    let newUser = await db_createUser(req.body.username, req.body.password, req.body.instagram_account);
    if (newUser.status === 201) {
        return res.status(201).json(user);
    } else {
        return res.status(newUser.status).json({status: newUser.status, message: newUser.message});
    }
}

async function checkValidUser(user) {
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
    let db_user = await db_getUserByUsername(user.username);
    if (db_user.status === 200) {
        if (!_.isEmpty(db_user.user)) {
            return {status: 400, message: "Username must be unique"};
          } else {
              return {status: 200};
          }
    } else {
        // error occurred when doing retrieval of user from db
        return {status: db_user.status, message: db_user.message};
    }
}

function checkLogin(req, res) {
    let user = await db_getUserByUsername(req.params.username);
    if (user.status === 200) {
        if (data.username === req.params.username && data.password === req.params.password) {
            return res.status(200).json(data);
          } else {
            return res.status(400).json({status: 400, message: "The entered username & password were incorrect"});
          }
    } else {
        // db error occurred
        return res.status(user.status).json({status: user.status, message: user.message});
    }
}



module.exports = {
    createUser : createUser,
    checkLogin: checkLogin
}