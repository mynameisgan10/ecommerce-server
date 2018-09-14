const db = require('../../models/dbconnection');

const social = {
    like: (req,res) => {
        res.json({
            status: "success",
            message: "liked"
        })
    },
    unlike: (req,res) => {
        res.json({
            status: "success",
            message: "unliked"
        })
    },
    follow: (req,res) => {
        res.json({
            status: "success",
            message: "followed"
        })
    },
    unfollow: (req,res) => {
        res.json({
            status: "success",
            message: "unfollowed"
        })
    }
}

module.exports = social;