const db = require('../../models/dbconnection');

const comment = {
    create: (req,res) => {
        res.json({
            status: "success",
            message: "comment posted"
        })
    },
    delete: (req,res) => {
        res.json({
            status: "success",
            message: "comment deleted"
        })
    }
}

module.exports = comment;