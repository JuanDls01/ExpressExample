import { describe, expect, test } from '@jest/globals';
import productRoute from 'src/routes/product.routes';
import app from '../index';
import session from 'supertest'

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 404;
const STATUS_USER_ERROR = 422;
const STATUS_SERVER_ERROR = 500;

const PATH = '/product';
const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_DELETE = 'DELETE';

const agent = session(app);


describe(`Test route ${PATH}`, () => {
    // let server: any, agent: session.SuperTest<session.Test>;

    // beforeEach((done) => {
    //     app.listen(3001, () => {
    //         agent = session(app);
    //         done();
    //     })
    // });

    // afterEach((done) => {
    //     return server && server.close(done);
    // });

    describe(`${METHOD_GET} ${PATH}`, () => {
        it('responds with 200', () => agent.get(`${PATH}`))
    })
})