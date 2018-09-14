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
    },
    getItemByCategory: (req,res) => {
        res.json({
            status: "success", message: "search all item by category"
        })
    }
}

module.exports = item;