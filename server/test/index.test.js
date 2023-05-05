const app = require("../server")
const request =require ("supertest");

describe("POST /register",()=>{
        it('should response with a 200 status code', done  => {
             const data = {
                name: "name",
                dni: "dni",
                email: "email",
                password: "password"
             }
             request(app)
                .post('/api/users/register')
                .send(data)
                .set('Accept', 'application/json')
                .expect(200)
                .end(err=>{
                    if(err)return done(err)
                    done()
                })
            })
    })
