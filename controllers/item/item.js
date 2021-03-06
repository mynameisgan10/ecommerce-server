const db = require('../../models/dbconnection');
const jwt = require('jsonwebtoken');

const item = {
    newItem: (req, res) => {
        const mysqlParams = ["first_image", "second_image", "third_image", "fourth_image"];
        const images = {};
        req
            .files
            .forEach((image, index) => {
                images[mysqlParams[index]] = image.location;
            });
        const newItem = {
            name: req.body.title,
            price: req.body.price,
            category_id: 1,
            ...images,
            seller_id: req.user.userid
        }
        db.query("INSERT INTO Items SET ?", newItem, (error, results) => {
            if (error) 
                throw error;
            res.json(
                {success: true, message: "created new item", item_id: results.insertId}
            )
        })
    },
    deleteItem: (req, res) => {
        db.query(
            "SELECT * FROM Items WHERE id = ?",
            [req.params.productid],
            (error, results) => {
                if (error) 
                    throw error;
                if (results[0].seller_id === req.user.userid) { //checking if the user id and the item being deleted is the same
                    db.query(
                        "DELETE FROM Items WHERE id = ?",
                        [req.params.productid],
                        (error, results) => {
                            if (error) 
                                throw error;
                            res
                                .status(201)
                                .json({success: true, message: "deleted item "})
                        }
                    )
                } else {
                    return res.json({success: false, message: "not the owner"})
                }
            }
        )

    },
    saveItem: (req, res) => {
        const save = {
            user_id: req.user.userid,
            item_id: req.params.itemid
        }
        db.query("INSERT INTO Saves SET ?", save, (error, results) => {
            if (error) {
                return res.json({success: false, message: "failed to save item"})
            }
            res.json({success: true, message: "saved the item", results: results})
        })

    },
    likeItem: (req, res) => {
        const item = {
            user_id: req.user.userid,
            item_id: req.params.itemid
        }
        db.query("INSERT INTO Likes Set ?", item, (error, results) => {
            if (error) {
                return res.json({success: false, message: "failed to like item"})
            }
            res.json({success: true, message: "liked the item", results: results})
        })
    },
    getItemCategories: (req, res) => {
        db.query("SELECT * FROM Categories", (error, results) => {
            if (error) 
                throw error;
            res.json({success: true, message: "got all the categories", results: results})
        })
    },
    getItemByCategories: (req, res) => {
        // temporary solution;
        const getItemsByCategoryId = (id, socialActions) => {
            return db.query(
                "SELECT * FROM Items WHERE category_id = ? ",
                [id],
                (error, results) => {
                    if (error) 
                        throw error;
                    
                    if (socialActions) {
                        results.forEach(result => {
                            socialActions.forEach(socialAction => {
                                if (result.id == socialAction.item_id) {
                                    result.liked = 1;
                                }
                            })
                        })
                        return res.json(
                            {success: true, message: "all item categories", items: results}
                        )
                    } else {
                        return res.json(
                            {success: true, message: "all item categories", items: results}
                        )
                    }

                }
            )
        }
        if (req.headers.authorization) {
            jwt.verify(
                req.headers.authorization.split('bearer ')[1],
                process.env.JWT_SECRET,
                (
                    err,
                    decoded
                ) => {
                    if (err) 
                        console.log(err);
                    db.query(
                        "SELECT * FROM Likes WHERE user_id = ?",
                        [decoded.userid],
                        (error, results) => {
                            if (error) 
                                throw error;
                            getItemsByCategoryId(req.params.category, results);
                        }
                    )
                }
            )
        } else {
            console.log("else block");
            getItemsByCategoryId(req.params.category);
        }

    },
    getItemsByUserId: (req, res) => {
        let id;
        if (req.params.id === "me") {
            id = req.user.userid
        } else {
            id = req.params.id;
        }
        db.query(
            "SELECT * FROM Items WHERE seller_id = ? LIMIT 12",
            [id],
            (error, results) => {
                if (error) 
                    throw error;
                res.json(
                    {success: true, message: "items listed by current user", items: results}
                )
            }
        )
    },
    getItemById: (req, res) => {
        db.query(
            "SELECT * FROM Items WHERE id = ?",
            [req.params.id],
            (error, results) => {
                if (error) {
                    return res.json({success: false, message: "failed to get single item"})
                }
                res.json({success: true, message: "get single item", item: results})
            }
        )
    }
}

module.exports = item;