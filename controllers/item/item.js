const db = require('../../models/dbconnection');

const item = {
    newItem: (req, res) => {
        const newItem = {
            name: "iphone",
            price: 200,
            category_id: 1,
            seller_id: 1
        }
        db.query("INSERT INTO Items SET ?", newItem, (error, results) => {
            if (error) 
                throw error;
            res.json({status: "success", message: "created new item"})
        })
    },
    deleteItem: (req, res) => {
        db.query(
            "DELETE FROM Items WHERE id = ?",
            [req.params.productid],
            (error, results) => {
                if (error) 
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
        db.query("INSERT INTO Saves SET ?", save, (error, results) => {
            if (error) 
                throw error;
            res.json({status: "success", message: "saved the item", results: results})
        })

    },
    getItemCategories: (req,res) => {
        db.query(
            "SELECT * FROM Categories",
            (error, results) => {
                if(error) throw error;
                res.json({
                    success: true,
                    message: "got all the categories",
                    results: results
                })
            }
        )
    },
    getItemByCategories: (req, res) => {
        db.query(
            "SELECT * FROM Items WHERE category_id = ? ",
            [req.params.category],
            (error, results) => {
                if (error) 
                    throw error;
                res.json({success: true , message: "all item categories", items: results})
            }
        )

    },
    getItemById: (req,res) => {
        db.query("SELECT * FROM Items WHERE id = ?",[req.params.id],(error,results) => {
            if (error){
                return res.json({
                    success: false,
                    message: "failed to get single item"
                })
            }
            res.json({
                success: true,
                message: "get single item",
                item: results
            })
        })
    }
}

module.exports = item;