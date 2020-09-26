// retrieve constants
const config = require('../../config.js');
const rp = require('request-promise');
const _ = require('lodash');
const { QueryTypes } = require('sequelize');
const db = require("../db-configs/db.index");
const {db_createLeaderboardEntry, db_getLeaderboardEntryByUsername, db_updateLeaderboardEntry} = require('../dao/sql-queries');

async function getLeaderboardEntry(req, res) {
    let username = req.params.username;
    let leaderboard_entry = await db_getLeaderboardEntryByUsername(username);
    if (leaderboard_entry.status === 200) {
        return res.status(200).json(leaderboard_entry);
    } else {
        return res.status(leaderboard_entry.status).json({status: leaderboard_entry.status, message: leaderboard_entry.message});
    }
}

async function createOrUpdateLeaderboardEntry(req, res) {
    let leaderboard_entry = req.body;
    let db_leaderboard_entry = await db_getLeaderboardEntryByUsername(leaderboard_entry.username);
    if (db_leaderboard_entry.status === 200 && _.isEmpty(db_leaderboard_entry.leaderboard_entry)) {
        // the user has no entires in the leaderboard - create one:
        let res_leaderboard_entry = await db_createLeaderboardEntry(leaderboard_entry.username, leaderboard_entry.score, 
            leaderboard_entry.time, leaderboard_entry.instagram_account);
        return res.status(201).json(leaderboard_entry);
    } else if (db_leaderboard_entry.status === 200 && !_.isEmpty(db_leaderboard_entry.leaderboard_entry)) {
        // the user already has an entry in the leaderboard
        //      update the entry if the new score is better than (meaning LOWER) or equal to the old one
        if (db_leaderboard_entry.leaderboard_entry.score >= leaderboard_entry.score) {
            // the new score is better than the old one - update the score
            let res_leaderboard_entry = await db_updateLeaderboardEntry(leaderboard_entry.username, leaderboard_entry.score, 
                leaderboard_entry.time, leaderboard_entry.instagram_account);
            return res.status(200).json(leaderboard_entry);
        } else {
            // score of old entry in leaderboard is better - keep leaderboard entry as is
            let highest_leaderboard_entry = {
                username: db_leaderboard_entry.leaderboard_entry.username,
                score: db_leaderboard_entry.leaderboard_entry.score,
                time: db_leaderboard_entry.leaderboard_entry.time,
                instagram_account: db_leaderboard_entry.leaderboard_entry.instagram_account
            }
            return res.status(200).json(highest_leaderboard_entry);
        }
    } else {
        return res.status(db_leaderboard_entry.status).json({status: db_leaderboard_entry.status, message: db_leaderboard_entry.message});
    }
}

module.exports = {
    getLeaderboardEntry : getLeaderboardEntry,
    createOrUpdateLeaderboardEntry: createOrUpdateLeaderboardEntry
}