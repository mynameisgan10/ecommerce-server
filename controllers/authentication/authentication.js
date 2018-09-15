const db = require('../../models/dbconnection');
const bcrypt = require('bcrypt');

const authentication = {
    authenticate: (req, res) => {
        res.json({status: "success"})
    },
    signup: (req, res) => {
        const user = {
            username: "testname",
            password: "123123123"
        }
        bcrypt
            .hash(user.password, 12)
            .then(hash => {
                user.password = hash;
                db.query('INSERT INTO Users SET ? ', user, (error, results) => {
                    if (error) 
                        throw error
                    res.json({status: "success", message: "signed up"})
                })
            })
            .catch(error => {
                throw error;
            })

        }
}

module.exports = authentication;