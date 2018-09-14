const search = {
    byCategories: (req,res) => {
        res.json({
            status: "success",
            message: "get items by categories"
        })
    },
    byPriceRange: (req,res) => {
        res.json({
            status: "success",
            message: "get items by price range"
        })
    },
    normalSearch: (req,res) => {
        res.json({
            status: "success",
            message: "get items by searching"
        })
    }
}

module.exports = search;