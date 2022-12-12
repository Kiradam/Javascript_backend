/**
 * checks whether direct Triswap is available depending on which it redirects to fail or triswap show
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
            console.log(swap)

            Swapmodel.find({
                _trader: {
                    $ne: objectrepository.ID
                },
                Type_swapto: swap.Type_own,
                Gender_swapto: swap.Gender_own,
                Size_swapto: swap.Size_own,
                Value_swapto: swap.Value_own,
            }, (err, swap2) => {
                if (err) {
                    return next(err);
                }
                console.log(swap2)
                if (swap2.length === 0) {
                    return res.redirect(`/profile/${req.session.id}/clothes/${req.params.cid}/triswap/unsuc`)
                }
                for (let i = 0; i < swap2.length; i++) {
                    Swapmodel.findOne({
                        _trader: {
                            $ne: objectrepository.ID
                        },
                        Type_own: swap.Type_swapto,
                        Gender_own: swap.Gender_swapto,
                        Size_own: swap.Size_swapto,
                        Value_own: swap.Value_swapto,
                        Type_swapto: swap2[i].Type_own,
                        Gender_swapto: swap2[i].Gender_own,
                        Size_swapto: swap2[i].Size_own,
                        Value_swapto: swap2[i].Value_own,
                    }, (err, swap3) => {
                        if (err) {
                            return next(err);
                        }
                        console.log(swap3)
                        if (swap3) {
                            res.locals.id1 = swap2[i]._trader
                            res.locals.id2 = swap3._trader
                            return next()
                        }
                        if (i === swap2.length - 1) {
                            return res.redirect(`/profile/${req.session.id}/clothes/${req.params.cid}/triswap/unsuc`)
                        }
                    });
                }

            });

        });


    };
};