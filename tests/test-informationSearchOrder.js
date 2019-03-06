'use strict'
const chai = require('chai')
const expect = require('chai').expect
const should = require('chai').should()
const chaiHttp = require('chai-http')
const sinon = require('sinon')
const server = require('../../server')
chai.use(chaiHttp)
const InformationSearchOrder = require('../models/order/informationSearchOrder')

// Test information search with api
describe('Information Search Order API Test', function () {
  it('it saves a new information search order', function (done) {
     let informationData = {
      searchType: "Other",
      searchText: "other",
      propertyInformation: {
        address1: "Nirman Vihar",
        address2: "Krishna Nagar",
        city: "Delhi",
        zip: "12345",
        state: "IA",
        block: "2",
        lot: "lot",
        country: "India",
        qualifier: "xzczczc"
      },
      requestor: {
        name: "XYZ",
        address: {
          address1: "Address 1",
          address2: "Address 2",
          city: "City",
          zip: "12344",
          state: "IA"
        },
        phone: "5345345345",
        fax: "XYSADAD",
        email: "sonali12@gmail.com",
        persons: [
          {
            firstName: "sonali",
            middleName: "kumari",
            lastName: "das",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Appraiser",
        referenceNumber: "132423423",
        requestor: false,
        relatedContact: "fsdfsfdfdsf"
      },
      lender: {
        name: " lender",
        address: {
          address1: "szdsad",
          address2: "asdfdasdasdaksjdf",
          city: "dssdfsfd",
          zip: "3242335435435",
          state: "USDD"
        },
        phone: "34543534534",
        fax: "5324534543",
        email: "lender12@gmail.com",
        Persons: [
          {
            firstName: "vinay",
            middleName: "asdfsadf",
            lastName: "sharma",
            phone: "23432434324234",
            fax: "dsdsdfsdf",
            email: "vinay@gmail.com",
            title: "lease",
            cell: "355345345345",
            licenseNumber: "dfgd34523"
          }
        ],
        contactType: "Surveyor",
        mortgageAmount: "$5000000",
        mortgageBook: "Investopedia",
        mortgagePage: "F16"
      },
      additionalComments: "additionalInformation",
      contactInformation: {
        name: "XYZ",
        address: {
          address1: "Address 1",
          address2: "Address 2",
          city: "City",
          zip: "12344",
          state: "IA"
        },
        phone: "5345345345",
        fax: "XYSADAD",
        email: "sonali12@gmail.com",
        persons: [
          {
            firstName: "sonali",
            middleName: "kumari",
            lastName: "das",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Appraiser",
        referenceNumber: "132423423",
        requestor: false,
        relatedContact: "fsdfsfdfdsf"
      },
      ownerInformation: [ {
        name: "XYZ",
        address: {
          address1: "Address 1",
          address2: "Address 2",
          city: "City",
          zip: "12344",
          state: "IA"
        },
        phone: "5345345345",
        fax: "XYSADAD",
        email: "sonali12@gmail.com",
        persons: [
          {
            firstName: "sonali",
            middleName: "kumari",
            lastName: "das",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          } ],
          contactType: "Appraiser",
          referenceNumber: "132423423",
          requestor: false,
          relatedContact: "fsdfsfdfdsf"}],
      clientId: ("5ac72767bb8891357444abe3")
    }

    chai.request(server).post('/addInformationSearchOrder').send(informationData).end((error, response) => {
      response.should.have.status(200)
      response.body.should.be.an('object')
      done()
    })
  })
})

// model test in information search 
describe('Informatiomn Search Order Model Test', function () {
  it("it should add information search data", function (done) {
    let isMock = sinon.mock(new InformationSearchOrder({
      searchType: "Other",
      searchText: "other",
      propertyInformation: {
        address1: "Nirman Vihar",
        address2: "Krishna Nagar",
        city: "Delhi",
        zip: "12345",
        state: "IA",
        block: "2",
        lot: "lot",
        country: "India",
        qualifier: "xzczczc"
      },
      requestor: {
        name: "XYZ",
        address: {
          address1: "Address 1",
          address2: "Address 2",
          city: "City",
          zip: "12344",
          state: "IA"
        },
        phone: "5345345345",
        fax: "XYSADAD",
        email: "sonali12@gmail.com",
        persons: [
          {
            firstName: "sonali",
            middleName: "kumari",
            lastName: "das",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Appraiser",
        referenceNumber: "132423423",
        requestor: false,
        relatedContact: "fsdfsfdfdsf"
      },
      lender: {
        name: " lender",
        address: {
          address1: "szdsad",
          address2: "asdfdasdasdaksjdf",
          city: "dssdfsfd",
          zip: "3242335435435",
          state: "USDD"
        },
        phone: "34543534534",
        fax: "5324534543",
        email: "lender12@gmail.com",
        Persons: [
          {
            firstName: "vinay",
            middleName: "asdfsadf",
            lastName: "sharma",
            phone: "23432434324234",
            fax: "dsdsdfsdf",
            email: "vinay@gmail.com",
            title: "lease",
            cell: "355345345345",
            licenseNumber: "dfgd34523"
          }
        ],
        contactType: "Surveyor",
        mortgageAmount: "$5000000",
        mortgageBook: "Investopedia",
        mortgagePage: "F16"
      },
      additionalComments: "additionalInformation",
      contactInformation: {
        name: "XYZ",
        address: {
          address1: "Address 1",
          address2: "Address 2",
          city: "City",
          zip: "12344",
          state: "IA"
        },
        phone: "5345345345",
        fax: "XYSADAD",
        email: "sonali12@gmail.com",
        persons: [
          {
            firstName: "sonali",
            middleName: "kumari",
            lastName: "das",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Appraiser",
        referenceNumber: "132423423",
        requestor: false,
        relatedContact: "fsdfsfdfdsf"
      },
      ownerInformation: [{
        name: "XYZ",
        address: {
          address1: "Address 1",
          address2: "Address 2",
          city: "City",
          zip: "12344",
          state: "IA"
        },
        phone: "5345345345",
        fax: "XYSADAD",
        email: "sonali12@gmail.com",
        persons: [
          {
            firstName: "sonali",
            middleName: "kumari",
            lastName: "das",
            phone: "234324",
            fax: "98489759823475",
            email: "xyz@gmail.com",
            title: "lease",
            cell: "58304853453",
            licenseNumber: "34523495cv34523"
          }
        ],
        contactType: "Appraiser",
        referenceNumber: "132423423",
        requestor: false,
        relatedContact: "fsdfsfdfdsf"
      }],
      clientId: ("5ac72767bb8891357444abe3")
    })
    )

    var informationSearchData = isMock.object
    var expectedResult = { status: true }
    isMock.expects('save').yields(null, expectedResult)
    informationSearchData.save(function (error, result) {
      isMock.verify()
      isMock.restore()
      expect(result.status).to.be.true
      done()
    })
  })
})