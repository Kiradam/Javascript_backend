const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const SignUpMW = require('../middleware/auth/SignUpMW');
const ForgPassMW = require('../middleware/auth/ForgPassMW');
const LogoutMW = require('../middleware/auth/LogoutMW');
const renderMW = require('../middleware/renderMW');
const editMW = require('../middleware/profile/editMW');
const profileMW = require('../middleware/profile/profileMW');
const deleteMW = require('../middleware/profile/deleteMW');
const addClothesMW = require('../middleware/clothes/addClothesMW');
const getClothes = require('../middleware/clothes/getClothesMW');
const oneclothMW = require('../middleware/clothes/oneclothMW');
const deleteClothesMW = require('../middleware/clothes/deleteClothesMW');
const TriSwapCheckMW = require('../middleware/swap/TriSwapCheckMW');
const SwapCheckMW = require('../middleware/swap/SwapCheckMW');
const SwapunsucMW = require('../middleware/swap/SwapunsucMW');
const TriSwapshowMW = require('../middleware/swap/TriSwapshowMW');

const Swapsmodel = require('../models/Swaps');
const Usersmodel = require('../models/Users');
const {ObjectId} = require("mongodb");



module.exports = function (app) {
    const objRepo = {
        Swapsmodel: Swapsmodel,
        Usersmodel: Usersmodel,
        ID: ObjectId
    };

    app.get('/',
        authMW(objRepo),
        renderMW(objRepo, 'Login'));
    app.post('/',
        authMW(objRepo),
        checkPassMW(objRepo),
        renderMW(objRepo, 'Login'));
    app.get('/register',
        authMW(objRepo),
        renderMW(objRepo, 'SignUp'));
    app.post('/register',
        authMW(objRepo),
        SignUpMW(objRepo),
        renderMW(objRepo, 'SignUp'));
    app.post('/forgottenpass',
        authMW(objRepo),
        ForgPassMW(objRepo),
        renderMW(objRepo, 'Forgotten_password'));
    app.get('/forgottenpass',
        authMW(objRepo),
        renderMW(objRepo, 'Forgotten_password'));
    app.get('/profile/:id',
        authMW(objRepo),
        profileMW(objRepo),
        getClothes(objRepo),
        renderMW(objRepo, 'Profile'));
    app.get('/profile/:id/delete',
        authMW(objRepo),
        deleteMW(objRepo),
        LogoutMW(objRepo)
        );
    app.get('/profile/:id/edit',
        authMW(objRepo),
        profileMW(objRepo),
        renderMW(objRepo, 'Edit_info'));
    app.post('/profile/:id/edit',
        authMW(objRepo),
        profileMW(objRepo),
        editMW(objRepo),
        renderMW(objRepo, 'Edit_info'));
    app.get('/profile/:id/clothes/add',
        authMW(objRepo),
        renderMW(objRepo, 'Add_clothes'));
    app.post('/profile/:id/clothes/add',
        authMW(objRepo),
        addClothesMW(objRepo),
        renderMW(objRepo, 'Add_clothes'));
    app.get('/profile/:id/clothes/:cid/edit',
        authMW(objRepo),
        oneclothMW(objRepo),
        renderMW(objRepo, 'Add_clothes'));
    app.post('/profile/:id/clothes/:cid/edit',
        authMW(objRepo),
        oneclothMW(objRepo),
        addClothesMW(objRepo),
        renderMW(objRepo, 'Add_clothes'));
    app.get('/profile/:id/clothes/:cid/delete',
        authMW(objRepo),
        deleteClothesMW(objRepo));
    app.get('/profile/:id/clothes/:cid/swap',
        authMW(objRepo),
        SwapCheckMW(objRepo),
        renderMW(objRepo, 'Swap_suc'));
    app.get('/profile/:id/clothes/:cid/swap/unsuc',
        authMW(objRepo),
        SwapunsucMW(objRepo),
        renderMW(objRepo, 'Swap_unsuc'));
    app.get('/profile/:id/clothes/:cid/triswap/unsuc',
        authMW(objRepo),
        renderMW(objRepo, 'TriSwap_unsuc'));
    app.get('/profile/:id/clothes/:cid/triswap',
        authMW(objRepo),
        TriSwapCheckMW(objRepo),
        TriSwapshowMW(objRepo),
        renderMW(objRepo, 'TriSwap'));
    app.get(
        '/logout',
        authMW(objRepo),
        LogoutMW(objRepo)
    );
};
