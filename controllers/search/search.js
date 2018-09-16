const db = require('../../models/dbconnection');

const search = {
    byCategories: (req, res) => {
        db.query(
            "SELECT * FROM Items WHERE category_id = ?",
            [req.params.id],
            (err, results) => {
                if (err) 
                    throw error;
                res.json(
                    {status: "success", message: "get items by categories", results: results}
                )
            }
        )

    },
    byPriceRange: (req, res) => {
        db.query("SELECT * FROM Items WHERE price is between ? AND ?", [
            req.body.startPrice, req.body.endPrice
        ], (err, results) => {
            if (err) 
                throw error;
            res.json(
                {status: "success", message: "get items by price range", results: results}
            )
        })

    },
    normalSearch: (req, res) => {
        const search_item = {
            keyword: req.query.q,
            category: req.query.cat,
            priceStart: req.query.priceStart,
            priceEnd: req.query.priceEnd
        }
        db.query(
            "SELECT * FROM Items WHERE name IS LIKE ? AND category_id = ? AND price IS BETWEEN ? AND ?",
            [
                search_item.keyword, search_item.category, search_item.priceStart, search_item.priceEnd
            ],
            (err, results) => {
                if (err) 
                    throw error;
                res.json(
                    {status: "success", message: "get items by searching", results: results}
                )
            }
        )

    }
}

module.exports = search;