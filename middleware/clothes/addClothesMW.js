/**
 * from post it saves new clothes to db and redirect to profile
 */
const requireOption = require('../requireOption');
const mongoose = require("mongoose");

module.exports = function(objectrepository) {
    let Swapsmodel = requireOption(objectrepository, 'Swapsmodel');
    return function(req, res, next) {
        //not enough parameter
        if ((typeof req.body === 'undefined')) {
            return next();
        }

        //create user
        let newUser = new Swapsmodel();
        newUser.Type_own = req.body.type_add;
        newUser.Gender_own = req.body.gender_add;
        newUser.Size_own = req.body.size_add;
        newUser.Value_own = req.body.value_add;
        newUser.Type_swapto = req.body.type_swapto_add;
        newUser.Gender_swapto = req.body.gender_swapto_add;
        newUser.Size_swapto = req.body.size_swapto_add;
        newUser.Value_swapto = req.body.value_add;
        newUser._trader = objectrepository.ID;

        newUser.save(function(err) {
            if (err) {
                return next(err);
            }

            console.log(mongoose.connection.readyState)
            return res.redirect(`/profile/${req.session.id}`);

        });
    };
};