var bcrypt = require('bcryptjs');
var UserModel = require('./schemas.js').userModel;
var connectionStore = require('./connectionController.js').get();

var comparePasswords = function(passwordProvided, passwordDb, callback) {
    bcrypt.compare(password, passwordDb, function(err, result) {
        console.log('password ', password, result);
        if (err || !result) {
            callback(false);
        } else {
            callback(true);
        }
    });
};

var generateHashedPassword = function(pass) {
    var salt = bcrypt.genSaltSync(10);
    console.log('salt ', salt);
    console.log('pass ', pass);
    var hash = bcrypt.hashSync(pass, salt);
    return hash;
};

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
    });
};

module.exports = {
    login: function(response, body) {
        userDne(body.usernameInput, function(userExists) {
            if (userExists && bcrypt.compareSync(body.passwordInput, userExists.password)) {
                connectionStore.add(response.connection, userExists._id);
                response.respond({
                    _id: userExists._id,
                    receivedPoofs: userExists.receivedPoofs,
                    friends: userExists.friends
                  }, 'success');
            } else {
                response.respond('User or Password invalid', 'failure', 'User or Password invalid');
            }
        });
    },
    signup: function(response, body) {
        userDne(body.usernameInput, function(userExists) {
            if (userExists) {
                console.log('huh?', userExists);
                //throw error if user exists
                response.respond(null, 'failure', 'user exists already');

            } else {
                var salt = generateHashedPassword(body.passwordInput);
                var newUser = new UserModel({
                    username: body.usernameInput,
                    password: salt,
                    phone: body.phoneInput,
                    name: body.nameInput
                });

                newUser.save(function(err, newDood) {
                    if (err) {
                      response.respond(newDood, 'failure', 'signup failed');
                    } else {
                      console.log('logged in', newDood);
                      connectionStore.add(response.connection, newDood._id);

                      response.respond({
                        _id: newDood._id,
                        receivedPoofs: newDood.receivedPoofs,
                        friends: newDood.friends
                      }, 'success');

                    }
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