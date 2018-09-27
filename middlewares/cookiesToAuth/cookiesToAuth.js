const cookiesToAuth = (req,res,next) => {
    const token = req.cookies.token;
    req.headers.authorization = 'bearer ' + token; //move cookies to auth bearer to work for both web and mobile
    next();
}

module.exports = cookiesToAuth;