const db = require('../../models/dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const csrftoken = require('csrf');

const authentication = {
    authenticate: (req, res) => {
        db.query(
            'SELECT * FROM USERS WHERE username = ? LIMIT 1',
            [req.body.username],
            (err, results) => { //sign jwt and return later
                if (err) 
                    throw error;
                bcrypt
                    .compare(req.body.password, results[0].password)
                    .then(passwordStatus => {
                        const csrf = new csrftoken();
                        var secret = csrf.secretSync()
                        var xsrf = csrf.create(secret)
                        const token = jwt.sign({
                            username: results[0].username,
                            login: passwordStatus,
                            xsrf: xsrf,
                            secret: secret
                        }, process.env.JWT_SECRET + results[0].password, { //uses our secret + the user's hash as the secret
                            expiresIn: '1h'
                        });
                        const refreshToken = jwt.sign({
                            username: results[0].username,
                            login: passwordStatus
                        }, process.env.JWT_REFRESH_SECRET + results[0].password, {expiresIn: '7d'})
                        res.cookie("xsrf", xsrf, {secure: true,expires: new Date(Date.now() + 900000)});
                        res.cookie("token", token, {
                            httpOnly: true,
                            secure: true,
                            expires: new Date(Date.now() + 900000)
                        });
                        res.cookie("refreshtoken", refreshToken, {
                            httpOnly: true,
                            secure: true
                        });
                        res.json({token: token, refreshToken: refreshToken});
                    })
                    .catch(error => {
                        throw error
                    })

                }
        )

    },
    signup: (req, res) => {
        // const user = {
        //     username: req.body.username,
        //     password: req.body.password
        // }
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