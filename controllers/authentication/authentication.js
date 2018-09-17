const db = require('../../models/dbconnection');
const bcrypt = require('bcrypt');

const authentication = {
    authenticate: (req, res) => {
        db.query('SELECT * FROM USERS WHERE username = ? LIMIT 1',[req.body.username],(err,results) => {
            if (err) throw error;
            bcrypt.compare(req.body.password,results[0].password)
                .then(passwordStatus => {
                    res.json({status: "success",results: results,login: passwordStatus})
                })
            
        })
        
    },
    signup: (req, res) => {
        const user = {
            username: "testname1",
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