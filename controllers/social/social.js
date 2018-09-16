const db = require('../../models/dbconnection');

const social = {
    like: (req, res) => {
        const like_item = {
            user_id: "something",
            item_id: req.params.itemid
        }
        db.query("INSERT INTO Likes SET ?", like_item, (err, results) => {
            if (err) 
                throw error;
            req.json({status: "success", message: "liked an item", results: results})
        })
    },
    unlike: (req, res) => {
        const dislike_item = {
            user_id: "something",
            item_id: req.params.itemid
        }
        db.query("DELETE FROM Likes WHERE user_id = ? AND item_id = ?",dislike_item, (err,results) => {
            if(err) throw error;
            res.json({
                status: "success",
                message: "disliked an item",
                results: results
            })
        })
        res.json({status: "success", message: "unliked"})
    },
    follow: (req, res) => {
        const follow_user = {
            user_id: "something",
            following_id: req.params.userid
        }
        db.query("INSERT INTO Follows SET ?", follow_user, (err, results) => {
            if (err) throw error;
            res.json({
                status: "success",
                message: "followed a user",
                results: results
            })
        })
    },
    unfollow: (req, res) => {
        const unfollow_user = {
            user_id: "something",
            following_id: req.params.userid
        }
        db.query("DELETE FROM Follows WHERE user_id = ? AND following_id = ?", unfollow_user, (err, results) => {
            if (err) throw error;
            res.json({
                status: "success",
                message: "followed a user",
                results: results
            })
        })
    }
}

module.exports = social;