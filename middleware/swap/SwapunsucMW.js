/**
 * gets relevant swap partner data from db
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const Swapmodel = requireOption(objectrepository, 'Swapsmodel');
    const User = requireOption(objectrepository, 'Usersmodel');
    return function(req, res, next) {
        Swapmodel.findOne({
            _trader: objectrepository.ID,
            _id: req.params.cid
        }, (err, swap) => {
            if (err) {
                return next(err);
            }
            res.locals.swap = swap
            return next()
        })
    }
}