const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app')
const {} = require('./movies.fixture')

describe('/movies endpoints', () => {
    before('cleaning table', () => {
        db.raw('TRUNCATE movies RESTART IDENTITY CASCADE')
    })
    afterEach('cleaning table', () => {
        db.raw('TRUNCATE movies RESTART IDENTITY CASCADE')
    })  
    describe('/GET /movies', () => {
        context('given no movies in database', () => {
            it('returns a 201 and an empty list', () => {
                return supertest(app)
                .get('/movies')
                .expect(201, []);
            })
        })
    })  
})