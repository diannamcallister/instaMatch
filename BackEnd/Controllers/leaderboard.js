// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");
const {db_createLeaderboardEntry, db_getLeaderboardEntryByUsername, db_updateLeaderboardEntry} = require('../dao/sql-queries');

async function getLeaderboardEntry(req, res) {
    let username = req.params.username;
    let leaderboardEntry = await db_getLeaderboardEntryByUsername(username);
    // TODO: might need to do a check here to see if the user already has a leaderboard entry, and if not, what to do
    if (leaderboardEntry.status === 200) {
        return res.status(200).json(leaderboardEntry);
    } else {
        return res.status(leaderboardEntry.status).json({status: leaderboardEntry.status, message: leaderboardEntry.message});
    }
}

async function createOrUpdateLeaderboardEntry(req, res) {
    let leaderboardEntry = req.body;
    let db_leaderboardEntry = await db_getLeaderboardEntryByUsername(leaderboardEntry.username);
    if (db_leaderboardEntry.status === 200 && _.isEmpty(db_leaderboardEntry.leaderboard_entry)) {
        // the user has no entires in the leaderboard - create one:
        let res_leaderboardEntry = await db_createLeaderboardEntry(leaderboardEntry.username, leaderboardEntry.score, 
            leaderboardEntry.time, leaderboardEntry.instagram_account);
        return res.status(201).json(leaderboardEntry);
    } else if (db_leaderboardEntry.status === 200 && !_.isEmpty(db_leaderboardEntry.leaderboard_entry)) {
        // the user already has an entry in the leaderboard
        //      update the entry if the new score is better than or equal to the old one
        if (db_leaderboardEntry.leaderboard_entry.score <= leaderboardEntry.score) {
            // the new score is better than the old one - update the score
            let res_leaderboardEntry = await db_updateLeaderboardEntry(leaderboardEntry.username, leaderboardEntry.score, 
                leaderboardEntry.time, leaderboardEntry.instagram_account);
            return res.status(200).json(leaderboardEntry);
        } else {
            // score of old entry in leaderboard is better - keep leaderboard entry as is
            let highest_leaderboardEntry = {
                username: db_leaderboardEntry.leaderboard_entry.username,
                score: db_leaderboardEntry.leaderboard_entry.score,
                time: db_leaderboardEntry.leaderboard_entry.time,
                instagram_account: db_leaderboardEntry.leaderboard_entry.instagram_account
            }
            return res.status(200).json(highest_leaderboardEntry);
        }
    } else {
        return res.status(db_leaderboardEntry.status).json({status: db_leaderboardEntry.status, message: db_leaderboardEntry.message});
    }
}

module.exports = {
    getLeaderboardEntry : getLeaderboardEntry,
    createOrUpdateLeaderboardEntry: createOrUpdateLeaderboardEntry
}