const chai = require('chai');
const chaiHttp = require('chai-http');
const { expect } = chai;
const index = require('../routes/index');
const Test = require('../test/testFunctions');
const app = require('../app');
const mocha = require('mocha');
var assert = require('assert');

let test = new Test('xxx', 'xxx', 'https://zccfrank.zendesk.com/api/v2/tickets.json?page[size]=25');

chai.use(chaiHttp);

describe('index.js tests', async() => {
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

    describe('getData()', async() => {
        it('should return array of 25 items', async() => {
            data = await test.getData();
            //console.log(data['tickets']);
            expect(data['tickets'].length).to.equal(25);
        })
        it('should return "couldn\'t authenticate you message', async() => {
            data = await test.getData('xxx', 'xxx');
            console.log(data);
            expect(data).to.equal(401);
        })
    })
})