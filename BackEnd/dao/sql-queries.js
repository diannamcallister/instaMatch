const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");

async function db_createUser(username, password, instagram_account) {
    return db.sequelize.query('INSERT INTO \`Users\` (username, password, instagram_account, createdAt, updatedAt) ' + 
    'VALUES (:username, :password, :instagram_account, :createdAt, :updatedAt)', {
        replacements: {username: username, password: password, instagram_account: instagram_account, 
            createdAt: new Date(), updatedAt: new Date()},
        type: db.sequelize.QueryTypes.INSERT
      })
      .then(data => {
          console.log(`New user: \"${username}\" created`);
          return {status: 201, user: data};
      })
      .catch(error => {
        console.error("Error when adding a new user to db");
        return {status: 500, message: "An error occurred when adding a new user to the db"};
      });
}

async function db_getUserByUsername(username) {
    return db.sequelize.query('SELECT * FROM users WHERE username=(:username)', {
        replacements: {username: username},
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
          return {status: 200, data: data[0]};
      })
      .catch(error => {
          console.error("Error when retrieving a user from the db");
          return {status: 500, message: "An error occurred when retrieving a user from the db"};
      });
}

async function db_createLeaderboardEntry(username, score, time, instagram_account) {
    return db.sequelize.query(`INSERT INTO \`Leaderboards\` (username, score, time, instagram_account, createdAt, updatedAt) ` +
    `VALUES (:username, :score, :time, :instagram_account, :createdAt, :updatedAt)`, {
        replacements: {username: username, score: score, time: time, instagram_account: instagram_account,
        createdAt: new Date(), updatedAt: new Date()},
        type: db.sequelize.QueryTypes.INSERT
    })
    .then(data => {
        console.log(`New Leaderboard Entry for \"${username}\" created`);
        return {status: 201, leaderboard_entry: data};
    })
    .catch(error => {
        console.error("Error when trying to create a new leaderboard entry in db");
        return {status: 500, message: "An error occurred when adding a leaderboard entry to the db"}
    })
}

async function db_getLeaderboardEntryByUsername(username) {
    return db.sequelize.query('SELECT * FROM leaderboards WHERE username=(:username)', {
        replacements: {username: username},
        type: db.sequelize.QueryTypes.SELECT
      })
      .then(data => {
          return {status: 200, leaderboard_entry: data[0]};
      })
      .catch(error => {
          console.error("Error when retrieving a leaderboard entry from the db");
          return {status: 500, message: "An error occurred when retrieving a leaderboard entry from the db"};
      });
}

async function db_updateLeaderboardEntry(username, score, time, instagram_account) {
    return db.sequelize.query(`UPDATE \`Leaderboards\` SET username=:username, score=:score, time=:time,
     instagram_account=:instagram_account WHERE username=:username `, {
        replacements: {username: username, score: score, time: time, instagram_account: instagram_account},
        type: db.sequelize.QueryTypes.UPDATE
    })
    .then(data => {
        console.log(`Updated Leaderboard Entry for \"${username}\"`);
        return {status: 201, leaderboard_entry: data};
    })
    .catch(error => {
        console.error("Error when trying to update a leaderboard entry in db");
        return {status: 500, message: "An error occurred when updating a leaderboard entry to the db"}
    })
}

module.exports = {
    db_createUser : db_createUser,
    db_getUserByUsername : db_getUserByUsername,
    db_createLeaderboardEntry: db_createLeaderboardEntry,
    db_getLeaderboardEntryByUsername: db_getLeaderboardEntryByUsername,
    db_updateLeaderboardEntry: db_updateLeaderboardEntry
}