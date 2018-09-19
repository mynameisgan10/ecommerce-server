const cookiesToAuth = (req,res,next) => {
    req.headers.authorization = req.cookies.token; //move cookies to auth bearer to work for both web and mobile
    next();
}

module.exports = cookiesToAuth;