/**
 * If the user is authenticated, call next, otherwise redirect to /
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {

    const swap = requireOption(objectrepository, 'Swapsmodel');
    return function(req, res, next) {
        swap.findOne({
            _id: req.params.cid
        }, (err, result) => {
            if (err) {
                return next(err);
            }
            res.locals.currswap = result
            return next();
        });
    };
};