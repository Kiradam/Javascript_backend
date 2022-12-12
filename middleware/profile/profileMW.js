/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const User = requireOption(objectrepository, 'Usersmodel');
    return function(req, res, next) {
        User.findOne({
            _id: objectrepository.ID
        }, (err, result) => {
            if (err) {
                return next(err);
            }
            res.locals.name = result.Name;
            res.locals.tag = result.Fb_twittername;
            res.locals.tel = result.Tel;
            res.locals.email = result.Email;
            res.locals.user = result;
            return next();
        });
    };
};