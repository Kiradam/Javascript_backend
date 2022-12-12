/**
 * get all clothes from db
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const Swapmodel = requireOption(objectrepository, 'Swapsmodel');
    return function(req, res, next) {
        Swapmodel.find({
            _trader: objectrepository.ID
        }, (err, swaps) => {
            if (err) {
                return next(err);
            }

            res.locals.swaps = swaps;
            return next();
        });


    };
};