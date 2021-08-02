//required modules
const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const index = require('../routes/index');
const Test = require('../test/testFunctions');
const app = require('../app');
const mocha = require('mocha');
var assert = require('assert');

//initialize Test class (replace "xxx" with username (email) and api token respectively)
let test = new Test('xxx', 'xxx', 'https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25');

chai.use(chaiHttp);


//perform tests
describe('index.js tests', async() => {

    //verify that our valid get request returns a status code of 200
    describe('GET / ', () => {
        it('should return status 200', (done) => {
            chai.request(app)
                .get('/')
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

    //verify that our valid post request returns a status code of 200
    describe('POST / ', () => {
        it('should return status 200', (done) => {
            chai.request(app)
                .post('/')
                .send({ nextUrl: 'https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25' })
                .end((err, res) => {
                    if (err) done(err);
                    expect(res).to.have.status(200);
                    done();
                })
        })
    })

    //verify that the valid api call returns an array of 25 items
    describe('getData()', async() => {
        it('should return array of 25 items', async() => {
            data = await test.getData();
            //console.log(data['tickets']);
            expect(data['tickets'].length).to.equal(25);
        })
    })

    //verify that a wrong api call returns the "Couldn't authenticate you" message
    describe('getWrongData()', async() => {
        it('should return "couldn\'t authenticate you message', async() => {
            data = await test.getWrongData('xxx', 'xxx');
            expect(data.data.error).to.equal("Couldn't authenticate you")
        })
        it('should have status code 401', async() => {
            data = await test.getWrongData('xxx', 'xxx');
            expect(data.status).to.equal(401);
        })
    })
})