/**
 * from post it creates user and reditects to /
 */
const requireOption = require('../requireOption');

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

            if ((err)) {
                console.log(err);
                return next();
            }

            //create user
            const newUser = res.locals.user
            newUser.Name = req.body.name;
            newUser.Email = req.body.email;
            newUser.Fb_twittername = req.body.Fb_twittername;
            newUser.Tel = req.body.Tel;


            newUser.save(function(err) {
                if (err) {
                    return next(err);
                }
                return res.redirect(`/profile/${req.session.id}`);
            });
        });
    };
};