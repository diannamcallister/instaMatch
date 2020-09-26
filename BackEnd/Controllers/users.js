// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");
const {db_create_user, db_get_user_by_username} = require('../dao/sql-queries');


async function create_user(req, res) {
    let user = req.body;

    let[valid_user, user_exists] = await Promise.all([check_valid_user(user), check_user_exists(user)]);
    
    // check to see if there were issues for valid_user or userExists
    if (valid_user.status === 400) {
        return res.status(400).json({status: 400, message: valid_user.message});
    } else if (valid_user.status == 500) {
        return res.status(500).json({status: 500, message: valid_user.message});
    } else if (user_exists.status === 400) {
        return res.status(400).json({status: 400, message: user_exists.message});
    } else if (user_exists.status === 500) {
        return res.status(500).json({status: 500, message: user_exists.message});
    }

    // the new user is able to be created; add user to database now
    let new_user = await db_create_user(req.body.username, req.body.password, req.body.instagram_account);
    if (new_user.status === 201) {
        return res.status(201).json(user);
    } else {
        return res.status(new_user.status).json({status: new_user.status, message: new_user.message});
    }
}

async function check_valid_user(user) {
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

async function check_user_exists(user) {
    let db_user = await db_get_user_by_username(user.username);
    if (db_user.status === 200) {
        if (!_.isEmpty(db_user.data)) {
            return {status: 400, message: "Username must be unique"};
          } else {
              return {status: 200};
          }
    } else {
        // error occurred when doing retrieval of user from db
        return {status: db_user.status, message: db_user.message};
    }
}

async function check_login(req, res) {
    let user = await db_get_user_by_username(req.params.username);
    if (user.status === 200) {
        if (! _.isEmpty(user.data) && user.data.username === req.params.username && user.data.password === req.params.password) {
            return res.status(200).json(user.data);
        } else {
            return res.status(400).json({status: 400, message: "The entered username or password was incorrect"});
        }
    } else {
        // error occurred when doing retrieval of user from db
        return res.status(user.status).json({status: user.status, message: user.message});
    }
}



module.exports = {
    create_user : create_user,
    check_login: check_login
}