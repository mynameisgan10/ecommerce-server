const db = require('../../models/dbconnection');

const authentication = {
    authenticate: (req,res) => {
        res.json({
            status: "success"
        })
    },
    signup: (req,res) => {
        const user = {
            username: "testname",
            password: "123123123"
        }
        db.query('INSERT INTO Users SET ? ', user, (error, results) => {
            if (error) throw error
            res.json({
                status: "success",
                message: "signed up"
            })
        })
    }
}

module.exports = authentication;