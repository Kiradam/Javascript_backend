/**
 * Check the password (from POST), if it's the right one, create a session for the user and redirect to /profile/:id
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    let userModel = requireOption(objectrepository, 'Usersmodel');

    return function(req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
            (typeof req.body.password === 'undefined')) {

            return res.redirect('/');
        }

        //lets find the user
        userModel.findOne({
            Email: req.body.email
        }, function(err, result) {
            if ((err) || (!result)) {
                res.locals.error = 'Not registered';
                return next();
            }

            //check password
            if (result.Password !== req.body.password) {
                console.log('ejnye')
                res.locals.error = 'Wrong password'
                return next();
            }

            //login is ok, save id to session
            req.session.id = result._id;
            objectrepository.ID = result._id
            return res.redirect(`/profile/${req.session.id}`);
        });
    };

};