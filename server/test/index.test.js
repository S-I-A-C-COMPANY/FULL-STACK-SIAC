const app = require("../server")
const request =require ("supertest");

describe("POST /register",()=>{
        it('Pasa la prueba del registro', done  => {
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

    describe("POST /login",()=>{
        it('Pasa la prueba del login', done  => {
             const data = {
                dni: "dni",
                password: "password"
             }
             request(app)
                .post('/api/users/login')
                .send(data)
                .set('Accept', 'application/json')
                .expect(200)
                .end(err=>{
                    if(err)return done(err)
                    done()
                })
            })
    })