const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../src/app')
const {getToken} = require('./movies.fixture')

describe('/movies endpoints', () => {
    before('cleaning table', () => {
        db.raw('TRUNCATE movies RESTART IDENTITY CASCADE')
    })
    afterEach('cleaning table', () => {
        db.raw('TRUNCATE movies RESTART IDENTITY CASCADE')
    })  
    describe('/GET /movies', () => {
        context('given no token', () => {
            it('returns a 403 and Forbidden', () => {
                return supertest(app)
                .get('/movies')
                .expect(403, 'Forbidden');
            })
        })
    })

    describe('/POST /movies/add', () => {
        context('given no token', () => {
            it('returns a 403 and Forbidden', () => {
                return supertest(app)
                .post('/movies/add')
                .expect(403, 'Forbidden');
            })
        })
    })

    describe('/POST /movies/delete', () => {
        context('given no token or movie ID', () => {
            it('returns a 403 and Forbidden', () => {
                return supertest(app)
                .post('/movies/delete')
                .expect(404);
            })
        })
    })
     
})

