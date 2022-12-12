/**
 * gets relevant triswap partners data from db
 */
const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const users = requireOption(objectrepository, 'Usersmodel');
    return function(req, res, next) {
        users.find({
            _id: {
                $in: [
                    res.locals.id1, res.locals.id2
                ]
            }
        }, (err, result) => {
            if (err) {
                return next(err);
            }

            res.locals.name1 = result[0].Name;
            res.locals.tag1 = result[0].Fb_twittername;
            res.locals.tel1 = result[0].Tel;
            res.locals.email1 = result[0].Email;
            res.locals.user1 = result[0];
            res.locals.name2 = result[1].Name;
            res.locals.tag2 = result[1].Fb_twittername;
            res.locals.tel2 = result[1].Tel;
            res.locals.email2 = result[1].Email;
            res.locals.user2 = result[1];
            return next();
        });


    };
};