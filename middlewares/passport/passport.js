const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    console.log('Initialized');
    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT')
    opts.secretOrKey = process.env.JWT_SECRET;
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        console.log("authenticating");
        console.log(jwt_payload);
        const user = jwt_payload;
        done(null,user);
    }));
};
