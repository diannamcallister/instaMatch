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
          return {status: 200, user: data};
      })
      .catch(error => {
          console.error("Error when retrieving a user from the db");
          return {status: 500, message: "An error occurred when retrieving a user from the db"};
      })
}

module.exports = {
    db_createUser : db_createUser,
    db_getUserByUsername : db_getUserByUsername
}