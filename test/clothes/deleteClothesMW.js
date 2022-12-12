const expect = require('chai').expect;
const deleteClothesMW = require('../../middleware/clothes/deleteClothesMW');

describe('deleteClothes middleware ', function () {

    it('call remove and redirect without error', function (done) {
        const obj_repo = {'Swapsmodel':
                {
                    remove: function (q, cb){
                        cb()
                    }
                }
        }
        const req = {
            params: {
                cid: ""
            },
            session: {id: "sg"}
        }
        const res = {
            redirect: function (where){
                expect(where).to.be.eql('/profile/sg');
                done();
            }
        }
        function next(){}
        mw = deleteClothesMW(obj_repo)
        mw(req, res, next)

    });
    it('should call next with error', function (done) {
        const obj_repo = {'Swapsmodel':
                {
                    remove: function (q, cb){
                        cb(e)
                    }
                }
        }
        const e = new Error("Called error")
        const req = {
            params: {
                cid: ""
            },
            session: {id: "sg"}
        }
        const res = {
            redirect: function (where){

            }
        }
        function next(err){
            expect(err).to.be.eql(Error("Called error"))
            done();
        }
        mw = deleteClothesMW(obj_repo)
        mw(req, res, next)

    });

});