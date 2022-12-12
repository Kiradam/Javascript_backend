/**
 * deletes clothes with given id and recirect to profile
 */
const requireOption = require('../requireOption');

module.exports = (objectrepository) => {
    const Swapmodel = requireOption(objectrepository, 'Swapsmodel');
    return function(req, res, next) {
        Swapmodel.remove({
            _id: req.params.cid
        }, (err, swap) => {
            if (err) {
                return next(err);
            }
            return res.redirect(`/profile/${req.session.id}`);
        });


    };
};