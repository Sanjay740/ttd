'use strict'
const server = require('../../server')
const chai = require('chai')
const expect = require('chai').expect
const should = require('chai').should()
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const ReoOrder = require('../models/order/reoOrder')
chai.use(chaiHttp)

// test reo order with api 
describe('test reoOrder api ', function () {
  it('reoOrder', function (done) {
    let reoOrderData = {
      propertyInformation: {
        address1: "abc",
        address2: "xyz",
        city: "delhi",
        zip: "110021",
        state: "New Delhi",
        block: "muyar vihar",
        lot: "asds",
        country: "india",
        qualifier: "wertwe"
      },
      orderingCompany: {
        name: "xyz",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "3765473743523",
        fax: "3453245345234",
        email: "abc@gmail.com",
        persons: [
          {
            firstName: "sadfad",
            middleName: "asdfsadf",
            lastName: "asdfasdf",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523",
            dob: ("2018-03-02T00:00:00.000+05:30")
          }],
        contactType: "Abstractor",
        referenceNumber: "sdafdsfs",
        requestor: false, // reprents if the contact is requestor
        relatedContact: "32432432"
      }, foreclosedParty: {
        name: "xyz",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "3765473743523",
        fax: "3453245345234",
        email: "abc@gmail.com",
        persons: [
          {
            firstName: "sadfad",
            middleName: "asdfsadf",
            lastName: "asdfasdf",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523",
            dob: ("2018-03-02T00:00:00.000+05:30")
          }],
        contactType: "Buyer",
        referenceNumber: "sdafdsfs",
        requestor: false, // reprents if the contact is requestor
        relatedContact: "32432432"
      }, lender: {
        name: "lender Xyz",
        name: " lender abc",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "34543534534",
        fax: "5324534543",
        email: "lender@gmail.com",
        Persons: [
          {
            firstName: "sadfad",
            middleName: "asdfsadf",
            lastName: "asdfasdf",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Surveyor",
        mortgageAmount: "$1000000",
        mortgageBook: "Investopedia",
        mortgagePage: "F16"
      }, contactInformation: {
        name: "xyz",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "3765473743523",
        fax: "3453245345234",
        email: "abc@gmail.com",
        persons: [{
          firstName: "sadfad",
          middleName: "asdfsadf",
          lastName: "asdfasdf",
          phone: "234324",
          fax: "98489759823475",
          email: "xyz@gmail.com",
          title: "lease",
          cell: "58304853453",
          licenseNumber: "34523495cv34523",
          dob: ("2018-03-02T00:00:00.000+05:30")
        }],
        contactType: "LoanServicer",
        referenceNumber: "sdafdsfs",
        requestor: false, // reprents if the contact is requestor
        relatedContact: "32432432"
      }, additionalComments: "sfdsdfsdfs",
      clientId: ("562b2649b2e42345f113c04d")
    }
    chai.request(server).post('/addReoOrder').send(reoOrderData).end(function (error, response) {
        response.should.have.status(200)
        response.body.should.be.an('object')
       done()
    })
  })
})

//model test with reo order data
describe('model test with reo order data ', function () {
  it("should add reo order form", function (done) {
    let reoMock = sinon.mock(new ReoOrder({
      propertyInformation: {
        address1: "abc",
        address2: "xyz",
        city: "delhi",
        zip: "110021",
        state: "New Delhi",
        block: "muyar vihar",
        lot: "asds",
        county: "fdgdf",
        qualifier: "wertwe"
      },
      orderingCompany: {
        name: "xyz",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "3765473743523",
        fax: "3453245345234",
        email: "abc@gmail.com",
        persons: [
          {
            firstName: "sadfad",
            middleName: "asdfsadf",
            lastName: "asdfasdf",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523",
            dob: ("2018-03-02T00:00:00.000+05:30")
          }],
        contactType: "Abstractor",
        referenceNumber: "sdafdsfs",
        requestor: false, // reprents if the contact is requestor
        relatedContact: "32432432"
      }, foreclosedParty: {
        name: "xyz",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "3765473743523",
        fax: "3453245345234",
        email: "abc@gmail.com",
        persons: [
          {
            firstName: "sadfad",
            middleName: "asdfsadf",
            lastName: "asdfasdf",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523",
            dob: ("2018-03-02T00:00:00.000+05:30")
          }],
        contactType: "Buyer",
        referenceNumber: "sdafdsfs",
        requestor: false, // reprents if the contact is requestor
        relatedContact: "32432432"
      }, lender: {
        name: "lender Xyz",
        name: " lender abc",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "34543534534",
        fax: "5324534543",
        email: "lender@gmail.com",
        Persons: [
          {
            firstName: "sadfad",
            middleName: "asdfsadf",
            lastName: "asdfasdf",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Surveyor",
        mortgageAmount: "$1000000",
        mortgageBook: "Investopedia",
        mortgagePage: "F16"
      }, contactInformation: {
        name: "xyz",
        address: {
          address1: "asfsf",
          address2: "asdfaksjdf",
          city: "caliz",
          zip: "324233",
          state: "US"
        },
        phone: "3765473743523",
        fax: "3453245345234",
        email: "abc@gmail.com",
        persons: [{
          firstName: "sadfad",
          middleName: "asdfsadf",
          lastName: "asdfasdf",
          phone: "234324",
          fax: "98489759823475",
          email: "xyz@gmail.com",
          title: "lease",
          cell: "58304853453",
          licenseNumber: "34523495cv34523",
          dob: ("2018-03-02T00:00:00.000+05:30")
        }],
        contactType: "LoanServicer",
        referenceNumber: "sdafdsfs",
        requestor: false, // reprents if the contact is requestor
        relatedContact: "32432432"
      }, additionalComments: "sfdsdfsdfs",
      clientId: ("562b2649b2e42345f113c04d")
    })
    )

    var reoData = reoMock.object
    var expectedResult = { status: true }
    reoMock.expects('save').yields(null, expectedResult)
    reoData.save(function (error, result) {
      reoMock.verify()
      reoMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })
})