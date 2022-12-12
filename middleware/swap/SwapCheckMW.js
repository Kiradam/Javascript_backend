/**
 * checks whether direct swap is available depending on which it redirects to fail swap suc or unsuc
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

            Swapmodel.findOne({
                _trader: {
                    $ne: objectrepository.ID
                },
                Type_swapto: swap.Type_own,
                Gender_swapto: swap.Gender_own,
                Size_swapto: swap.Size_own,
                Value_swapto: swap.Value_own,
                Type_own: swap.Type_swapto,
                Gender_own: swap.Gender_swapto,
                Size_own: swap.Size_swapto,
                Value_own: swap.Value_swapto
            }, (err, swap2) => {
                if (err) {

                    return next(err);
                }
                console.log(swap2)
                if (!swap2) {
                    return res.redirect(`/profile/${req.session.id}/clothes/${req.params.cid}/swap/unsuc`)
                }
                User.findOne({
                    _id: swap2._trader
                }, (err, result) => {
                    if (err) {
                        console.log(err)
                        return next(err);
                    }
                    res.locals.name = result.Name;
                    res.locals.tag = result.Fb_twittername;
                    res.locals.tel = result.Tel;
                    res.locals.email = result.Email;
                    res.locals.user = result;

                    return next();
                });

            });

        });


    };
};