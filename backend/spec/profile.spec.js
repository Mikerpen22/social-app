/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;
let cookie;     // Need to store cookie from server response for our next test request

describe('Validate Profile functionality', () => {

    it('register new user', (done) => {
        let regUser = {username: 'Michael', password: '123'};
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('Michael');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('login user', (done) => {
        let loginUser = {username: 'Michael', password: '123'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            cookie = res.headers.get('set-cookie');     // res.cookie不能用因為這裏沒有cookie-parser
            return res.json();
        }).then(res => {
            expect(res.username).toEqual('Michael');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('should return a user headline', (done) => {
        fetch(url('/headline/Angela'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },  // Need to pass cookie we got from res into req!!!
        }).then(res => res.json()).then(res => {
            expect(res.headline).toEqual('This is angela headline!');
            done();
        });
    });

    it('should update headline for the user specified', (done) => {
        // update headline for logged in user
        let headline = { headline: 'Happy' };
        fetch(url('/headline'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie, 'username': 'Michael'},
            body: JSON.stringify(headline)
        }).then(res => res.json()).then(res => {
            expect(res.headline).toEqual("Happy");
            done();
        })
    });
});
