const db = require('../../models/dbconnection');

const item = {
    newItem: (req, res) => {
        res.json({status: "Success", message: "new item"})
    },
    deleteItem: (req, res) => {
        res.json({status: "success", message: "deleted item  "})
    },
    saveItem: (req, res) => {
        res.json({status: "success", message: "saved the item"})
    },
    getItemCategories: (req, res) => {
        res.json({
            status: "success", message: "all item categories"
        })
    }
}

module.exports = item;