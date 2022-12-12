const expect = require('chai').expect;
const LogoutMW = require('../../middleware/auth/LogoutMW');

describe('Logout middleware ', function () {

    it('should redirect to /', function (done) {
        const obj_repo = {ID: undefined}
        const req = {
            session: {
                destroy: function(cb){
                    cb()
                }
            }
        }
        const res = {
            redirect: function (where){
                expect(where).to.be.eql('/');
                done();
            }
        }
        function next(){}
        mw = LogoutMW(obj_repo)
        mw(req, res, next)

    });
    it('should call next with error', function (done) {
        const obj_repo = {ID: undefined}
        const err = new Error("Called error")
        const req = {
            session: {
                destroy: function(cb){
                    cb(err)
                }
            }
        }
        const res = {
            redirect: function (where){

            }
        }
        function next(e){
            expect(e).to.be.eql(Error("Called error"))
            done();
        }
        mw = LogoutMW(obj_repo)
        mw(req, res, next)

    });

});