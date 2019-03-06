'use strict'

let mongoose = require('mongoose')
let chai = require('chai')
let expect = require('chai').expect
let should = require('chai').should()
let chaiHttp = require('chai-http')
let sinon = require('sinon')
require('sinon-mongoose')

let server = require('../../server')

let User = require('../models/user/user') 
chai.use(chaiHttp)

// describe('User Model test', function(){
   
//    // Verifies the user model save
//    it('it saves a new user', function(done){
//     let userMock = sinon.mock(new User({
//       emailAddress: "deeksha.sharma2310@gmail.com",
//       createdOn: null,
//       oREmailAddress : "deekshasharma@outlook.com",
//       password: "testing",
//       clientType: "Individual",
//       address: {  address1: "Address 1",
//       address2: "Address 2",
//       city: "City",
//       zip: "12344",
//       state: "IA"
//      }
//     }))

//     let user = userMock.object
//     let expectedResult = {status:true}
//     userMock.expects('save').yields(null,expectedResult)

//     user.save(function(error,result){
//       userMock.verify()
//       userMock.restore()
//       expect(result.status).to.be.true
//       done()
//     })
//    })
// })

describe('User Controller Tests', function(){
  describe('signUp', function(){ 
    it('it should allow signup', function(done){
      
      let userData = {
        emailAddress: "deeksha.sharma2310@gmail.com",
        fullName:"deeksha sharma",
        oREmailAddress : "deekshasharma@outlook.com",
        password: "testing",
        clientType: "Individual",
        address: {  address1: "Address 1",
        address2: "Address 2",
        city: "City",
        zip: "12344",
        state: "IA"
       }
      }

      chai.request(server).post('/signUp').send(userData).end((err,res) =>{
        res.should.have.status(200)
        //res.body.should.be.a('object')
        //res.body.should.have.property('errors')
        
        done() 
    })
    })
  }) 
  
  describe('login', function(){

  })
})