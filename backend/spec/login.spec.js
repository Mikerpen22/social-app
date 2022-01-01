/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;

describe('Validate Registration and Login functionality', () => {

    it('register new user', (done) => {
        let regUser = {username: 'testUser', password: '123'};
        fetch(url('/register'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(regUser)
        }).then(res => res.json()).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('login user', (done) => {
        let loginUser = {username: 'testUser', password: '123'};
        fetch(url('/login'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginUser)
        }).then(res => {
            return res.json()
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('logout user', (done) => {
        fetch(url('/logout'), {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        }).then(res => {
            // Make sure the response does not contain session cookie!
            // Otherwise the next request with this cookie will still be logged in
            expect(res.headers.get('set-cookie')).toBeFalsy();
            done();
        });
    });
});