const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const index = require('../routes/index');
const app = require('../app');
const mocha = require('mocha');

chai.use(chaiHttp);

describe('index.js tests', () => {
    describe('GET / ', () => {
        it('should display a list of 25 tickets', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })
})