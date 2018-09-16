const db = require('../../models/dbconnection');

const item = {
    newItem: (req, res) => {
        const newItem = {
            name: "iphone",
            category_id: 1,
            seller_id: 1
        }
        db.query("INSERT INTO Items SET ?", newItem, (err, results) => {
            if (err) 
                throw error;
            res.json({status: "success", message: "created new item"})
        })
    },
    deleteItem: (req, res) => {
        db.query(
            "DELETE FROM Items WHERE id = ?",
            [req.params.productid],
            (err, results) => {
                if (err) 
                    throw error;
                res.json({status: "success", message: "deleted item  "})
            }
        )

    },
    saveItem: (req, res) => {
        const save = {
            user_id: req.body.userid,
            item_id: req.body.itemid
        }
        db.query("INSERT INTO Saves SET ?", save, (err, results) => {
            if (err) 
                throw error;
            res.json({status: "success", message: "saved the item", results: results})
        })

    },
    getItemCategories: (req, res) => {
        db.query(
            "SELECT * FROM Items WHERE category_id = ? ",
            [req.params.category],
            (err, results) => {
                if (err) 
                    throw error;
                res.json({status: "success", message: "all item categories", results: results})
            }
        )

    }
}

module.exports = item;