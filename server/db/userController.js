var bcrypt = require('bcryptjs');
var UserModel = require('./schemas.js').userModel;


var comparePasswords = function(passwordProvided, passwordDb, callback) {
    bcrypt.compare(password, passwordDb, function(err, result) {
        console.log('password ', password, result);
        if (err || !result) {
            callback(false);
        } else {
            callback(true);
        }
    });
}

var generateHashedPassword = function(pass) {
    var salt = bcrypt.genSaltSync(10);
    console.log('salt ', salt);
    console.log('pass ', pass);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
}

var userDne = function(user, cb) {
    console.log('user ', user);
    UserModel.findOne({
        username: user
    }, function(err, user) {
        if (err) {
            console.log('err ', err);
            cb(false);
        } else {
            console.log('user find result ', user);
            cb(user);
        }
    })
}

module.exports = {
    login: function(response, body) {
        userDne(body.usernameInput, function(userExists) {
            if (userExists) {
                console.log('user exists, checking passwords');
                if (bcrypt.compareSync(body.passwordInput, userExists.password)) { //need to make sure userExists is the passworddb
                    response.respond({
                        status: 'user authenticated'
                    });
                } else {
                    response.respond({
                        error: 'User or Password invalid'
                    });
                }
            } else {
                response.respond({
                    error: 'User or Password invalid'
                });
            }
        });
    },
    signup: function(response, body) {

        userDne(body.usernameInput, function(userExists) {
            if (userExists) {
                console.log('huh?', userExists);
            } else {
                console.log('generating salt');
                var salt = generateHashedPassword(body.passwordInput);
                var newUser = new UserModel({
                    username: body.usernameInput,
                    password: salt,
                    phone: body.phoneInput,
                    name: body.nameInput
                });
                newUser.save(function(err, newDood) {
                    if (err) return console.error(err);
                    response.respond(newDood);
                });
            }
        });

    },
    checkUser: function(req, res, next) {
        console.log('res.session', req.session);
        var isLoggedIn = !!req.session.email;
        if (isLoggedIn) {
            res.status(200).json({
                status: 'Logged in'
            });
        } else {
            res.status(200).json({
                status: 'not logged in'
            });
        }

    },
    isAuth: function(req, res, next) {
        console.log('request session ', req.session);
        if (req.session.email) {
            next();
        } else {
            res.status(401).json({
                error: 'Not allowed'
            });
        }
    },
    logout: function(req, res, next) {
        req.session.email = null;
        res.status(200).json({
            status: 'Logout successful'
        });
    }
};