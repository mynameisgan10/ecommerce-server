const db = require('../../models/dbconnection');

const item = {
    newItem: (req, res) => {
        res.json({status: "Success", message: "new item"})
    },
    deleteItem: (req, res) => {
        res.json({status: "success", message: "deleted item  "})
    }
}

module.exports = item;