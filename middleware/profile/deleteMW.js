/**
 * deletes user and reditects to /
 */
const requireOption = require('../requireOption');

module.exports = (objectrepository) => {
    const Usersmodel = requireOption(objectrepository, 'Usersmodel');
    return function(req, res, next) {
        Usersmodel.remove({
            _id: objectrepository.ID
        }, (err, swap) => {
            if (err) {
                return next(err);
            }
            return next();
        });


    };
};