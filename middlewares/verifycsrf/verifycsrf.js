const csrftoken = require('csrf');
const jwt = require('jsonwebtoken');

const verifycsrf = (req,res,next) => {
    const csrf = new csrftoken();
    const userjwt = req.headers.authorization.split('Bearer');
    const decodedjwt = jwt.decode(userjwt);
    const csrfSecret = decodedjwt.secret;
    if(!csrf.verify(userjwt,csrfSecret)) {
        res.json({
            success: "false",
            message: "csrf token is wrong"
        });
        return;
    }
    next();
}


module.exports = verifycsrf;


