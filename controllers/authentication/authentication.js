const db = require('../../models/dbconnection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const csrftoken = require('csrf');

const authentication = {
    
    authenticate: (req, res) => {
        console.log(req.headers.authorization);
        db.query(
            'SELECT * FROM USERS WHERE username = ? LIMIT 1',
            [req.body.username],
            (err, results) => { //sign jwt and return later
                if (err) {
                    throw err;
                }
                if (results.length === 0) {
                    return res.json({success: false, message: "cannot find user"})
                }
                bcrypt
                    .compare(req.body.password, results[0].password)
                    .then(passwordStatus => {
                        if (passwordStatus) {
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
                            res.cookie("xsrf", xsrf, {
                                expires: new Date(Date.now() + 900000)
                            });
                            res.cookie("token", token, {
                                httpOnly: true,
                                expires: new Date(Date.now() + 900000)
                            });
                            res.cookie("refreshtoken", refreshToken, {httpOnly: true});
                            res.json({success: true, token: token, refreshToken: refreshToken});
                        } else {
                            res.json({success: false, message: "wrong password"})
                        }
                    })
                    .catch(error => {
                        res.json({success: false, message: error.message})
                    })

                }
        )

    },
    signup: (req, res) => {
        if (req.body.password.trim() !== req.body.confirmpassword.trim() || req.body.username.trim() === "") {
            return res.json({success: false, message: "password not the same"})
        }
        const user = {
            username: req.body.username,
            password: req.body.password,
            confirmpassword: req.body.confirmpassword
        }

        db.query(
            "SELECT * FROM USERS where username = ? LIMIT 1",
            [req.body.username],
            (err, results) => {
                if (err) {
                    throw err;
                }
                if (results.length !== 0) {
                    res.json({success: false, message: "this username has already been taken"})
                } else {
                    bcrypt
                        .hash(user.password, 12)
                        .then(hash => {
                            user.password = hash;
                            db.query('INSERT INTO Users SET ? ', {
                                username: user.username,
                                password: user.password
                            }, (error, results) => {
                                if (error) 
                                    throw error
                                const csrf = new csrftoken();
                                var secret = csrf.secretSync()
                                var xsrf = csrf.create(secret)
                                const token = jwt.sign({
                                    username: user.username,
                                    login: true,
                                    xsrf: xsrf,
                                    secret: secret
                                }, process.env.JWT_SECRET + user.password, { //uses our secret + the user's hash as the secret
                                    expiresIn: '1h'
                                });
                                const refreshToken = jwt.sign({
                                    username: user.username,
                                    login: true
                                }, process.env.JWT_REFRESH_SECRET + user.password, {expiresIn: '7d'})
                                res.cookie("xsrf", xsrf, {
                                    expires: new Date(Date.now() + 900000)
                                });
                                res.cookie("token", token, {
                                    httpOnly: true,
                                    expires: new Date(Date.now() + 900000)
                                });
                                res.cookie("refreshtoken", refreshToken, {httpOnly: true});
                                res.json({success: true, token: token, refreshToken: refreshToken});
                            })
                        })
                        .catch(error => {
                            throw error;
                        })
                    }
            }
        )

    },
    getProfile: (req, res) => {
        console.log(req.headers.authorization);
    }
}

module.exports = authentication;