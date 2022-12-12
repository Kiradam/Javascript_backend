/**
 * ends session and reditects to /
 */
module.exports = (objRepo) => {
    return (req, res, next) => {
        req.session.destroy((error) => {
            if (error) {
                return next(error);
            }
            objRepo.ID = undefined
            return res.redirect('/');
        });
    };
};