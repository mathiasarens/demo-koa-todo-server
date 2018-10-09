process.env.NODE_ENV = 'test';

const serverPromise = require('../../server');
const sequelize = require('../../models').sequelize;

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

describe('routes : todo', () => {

    describe('GET /api/v1/todo', () => {
        it('should return json', (done) => {
            serverPromise.then((server) => {
                chai.request(server)
                    .get('/api/v1/todo')
                    .end((err, res) => {
                        should.not.exist(err);
                        res.status.should.eql(200);
                        res.type.should.eql('application/json');
                        res.body.length.should.eql(1);
                        res.body[0].id.should.be.a('string');
                        res.body[0].name.should.eql('Clean kitchen');
                        res.body[0].until.should.eql('Tuesday');
                        done();
                    });
            });
        });
    });

    describe('POST /api/v1/todo', () => {
        it('should store todo', (done) => {
            serverPromise.then((server) => {
                chai.request(server)
                    .post('/api/v1/todo')
                    .set('content-type', 'application/json')
                    .send({id: 1235, name:'Prepare for interview', until: 'Thursday'})
                    .end((err, res) => {
                        should.not.exist(err);
                        res.status.should.eql(200);
                        res.type.should.eql('application/json');
                        res.body.length.should.equal(2);
                        res.body[0].id.should.be.a('string');
                        res.body[0].name.should.eql('Clean kitchen');
                        res.body[0].until.should.eql('Tuesday');
                        res.body[1].id.should.be.a('string');
                        res.body[1].name.should.eql('Prepare for interview');
                        res.body[1].until.should.eql('Thursday');
                        done();
                    });
            });
        });

        it('should throw return 400 if id attribute missing', (done) => {
            serverPromise.then((server) => {
                chai.request(server)
                    .post('/api/v1/todo')
                    .set('content-type', 'application/json')
                    .send({name:'Prepare for interview', until: 'Thursday'})
                    .end((err, res) => {
                        should.not.exist(err);
                        res.status.should.eql(400);
                        res.type.should.eql('application/json');
                        res.body.success.should.equal(false);
                        res.body.message.should.equals('id is required');
                        done();
                    });
            });
        });

        it('should throw return 400 if name attribute missing', (done) => {
            serverPromise.then((server) => {
                chai.request(server)
                    .post('/api/v1/todo')
                    .set('content-type', 'application/json')
                    .send({id:'10', until: 'Thursday'})
                    .end((err, res) => {
                        should.not.exist(err);
                        res.status.should.eql(400);
                        res.type.should.eql('application/json');
                        res.body.success.should.equal(false);
                        res.body.message.should.equals('name is required');
                        done();
                    });
            });
        });
    });

    after(function (done) {
        sequelize.close();
        serverPromise.then((server) => {
            server.close();
        });
        done();
    });
});


