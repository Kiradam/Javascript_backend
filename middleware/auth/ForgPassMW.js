/**
 * from post it checks whether the user exists and 'sends' the password (in our case it will probably just write it on the screen)
 */
const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    let userModel = requireOption(objectrepository, 'Usersmodel');

    return function (req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined')) {

            return res.redirect('/');
        }

        //lets find the user
        userModel.findOne({
            Email: req.body.email
        }, function (err, result) {
            if ((err) || (!result)) {
                res.locals.error = 'Not registered';
                return next();
            }

            res.locals.error = result.Password;

            return next()
        });
    };

};
