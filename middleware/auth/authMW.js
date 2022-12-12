/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    return function(req, res, next) {
        if (typeof req.session.id === 'undefined' || typeof req.session === 'undefined') {
            return res.redirect('/');
        }
        if (typeof req.params.id !== 'undefined' && req.params.id !== req.session.id) {
            return res.redirect('/');
        }
        res.locals.sessionID = req.session.id

        next();
    };
};