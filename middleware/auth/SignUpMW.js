/**
 * from post it creates user and reditects to /
 */
const requireOption = require('../requireOption');
const mongoose = require("mongoose");

module.exports = function(objectrepository) {

    let UserModel = requireOption(objectrepository, 'Usersmodel');
    return function(req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined')) {

            return next();
        }

        //lets find the user
        UserModel.findOne({
            Email: req.body.email
        }, function(err, result) {

            if ((err) || (result)) {
                console.log(err);
                res.locals.error = 'Email is already used'
                return next();
            }

            //create user
            const newUser =
                typeof res.locals.user === 'undefined' ? new UserModel() : res.locals.user;
            newUser.Name = req.body.name;
            newUser.Email = req.body.email;
            newUser.Password = typeof newUser.Password === 'undefined' ? req.body.password : newUser.Password;
            newUser.Fb_twittername = req.body.Fb_twittername;
            newUser.Tel = req.body.Tel;
            console.log(newUser.Password)


            newUser.save(function(err) {
                if (err) {
                    return next(err);
                }
                return res.redirect('/');
            });
        });
    };
};