/*
 * Test suite for articles
 */
require('es6-promise').polyfill();
require('isomorphic-fetch');

const url = path => `http://localhost:3000${path}`;
let cookie;     // Need to store cookie from server response for our next test request

describe('Validate Article functionality', () => {

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
            cookie = res.headers.get('set-cookie');     // res.cookie不能用因為這裏沒有cookie-parser
            return res.json();
        }).then(res => {
            expect(res.username).toEqual('testUser');
            expect(res.result).toEqual('success');
            done();
        });
    });

    it('should give me three or more articles', (done) => {
        fetch(url('/articles'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },  // Need to pass cookie we got from res into req!!!
        }).then(res => res.json()).then(res => {
            if (res.articles instanceof Array){
                expect(res.articles.length).toBeGreaterThan(2);
                done();
            }
        });
    });

    it('should give me the specified article', (done) => {
        fetch(url('/articles/1'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },  // Need to pass cookie we got from res into req!!!
        }).then(res => res.json()).then(res => {
            if (res.articles instanceof Array){
                expect(res.articles[0].author).toEqual("Angela");
                done();
            }
        });
    });

    it('should add new article with successive article id, return list of articles with new article', (done) => {
        // add a new article
        // verify you get the articles back with new article
        // verify the id, author, content of the new article
        let post = {author: 'Tom', text: 'This is a test post yo!'};
        fetch(url('/article'), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
            body: JSON.stringify(post)
        }).then(res => res.json()).then(res => {
            if (res instanceof Array) {
               //TODO test new article expected id, author, post
                expect(res[res.length-1].author).toEqual("Tom");
                done();
            }
        })
    });
    
    it('should return an article with a specified id', (done) => {
   
        //call GET /articles/id with the chosen id
        fetch(url('/articles/1'), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'cookie': cookie },
        }).then(res => res.json()).then(res => {
            if (res.articles instanceof Array) {
                expect(res.articles[0].pid == 1);
                expect(res.articles[0].author == "Angela");
                expect(res.articles[0].text == "You reach post 2");
                done();
            }
        })
    });
});
