'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const sinon = require('sinon')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)
const Foreclosure = require('../models/order/foreclosureOrder')

//model test with foreclosure data
describe('save foreclosure data', function () {
    it("should add foreclosure form", function (done) {
        let fcMock = sinon.mock(new Foreclosure({
            mortgageForeclosure: false,
            coop: false,
            yearsTaxSaleForeclosure20: false,
            yearsTaxSaleForeclosure60: false,
            selfReviewUpperCourtJudgements: false,
            selfOrderTaxAssessmentsAndUtilities: false,
            propertyInformation: {
                address1: 'add1',
                address2: 'add2',
                city: 'city',
                zip: '12345',
                state: 'AX',
                block: 'RX',
                lot: 'AQ',
                county: 'QW',
                qualifier: 'EE'
            },
            lender: {
                name: 'ss',
                address: {
                    address1: 'add1',
                    address2: 'add2',
                    city: 'city',
                    zip: '12345',
                    state: 'AX',
                    block: 'RX',
                    lot: 'AQ',
                    county: 'QW',
                    qualifier: 'EE'
                },
                phone: '555',
                fax: '5555',
                email: 'kkk@gmail.com',
                Persons: [],
                mortgageAmount: '777', // TODO: it needs to be decimal , find out the way soon to sort it out.
                mortgageBook: '55',
                mortgagePage: '99'
            },
            AdditionalComments: "5ab108ec15j9f4570253f2cc",
            contactInformation: {
                name: 'shail',
                address: {
                    ddress1: 'add1',
                    ddress2: 'add2',
                    city: 'city',
                    zip: '12345',
                    state: 'AX',
                    block: 'RX',
                    lot: 'AQ',
                    county: 'QW',
                    qualifier: 'EE'
                },
                phone: '8855554477',
                fax: '9999999999',
                email: 'abc@gmail.com',
                persons: [],
                contactType: 'Abstractor',
                referenceNumber: '234'
            },
            other: false,
            foreclosedParties: []
        })
        )

        var foreclosuredata = fcMock.object
        var expectedResult = { status: true }
        fcMock.expects('save').yields(null, expectedResult)
        foreclosuredata.save(function (error, result) {
            fcMock.verify()
            fcMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})

// test with foreclosure  api 
describe('api test with foreclosure order data', function () {
    it('it should POST a foreclosure data', (done) => {
        let foreclosuredata = {
            mortgageForeclosure: false,
            coop: false,
            yearsTaxSaleForeclosure20: false,
            yearsTaxSaleForeclosure60: false,
            selfReviewUpperCourtJudgements: false,
            selfOrderTaxAssessmentsAndUtilities: false,
            propertyInformation: {
                address1: 'add1',
                address2: 'add2',
                city: 'city',
                zip: '12345',
                state: 'AX',
                block: 'RX',
                lot: 'AQ',
                county: 'QW',
                qualifier: 'EE'
            },
            lender: {
                name: 'ss',
                address: {
                    address1: 'add1',
                    address2: 'add2',
                    city: 'city',
                    zip: '12345',
                    state: 'AX',
                    block: 'RX',
                    lot: 'AQ',
                    county: 'QW',
                    qualifier: 'EE'
                },
                phone: '555',
                fax: '5555',
                email: 'kkk@gmail.com',
                Persons: [],
                mortgageAmount: '777', // TODO: it needs to be decimal , find out the way soon to sort it out.
                mortgageBook: '55',
                mortgagePage: '99'
            },
            AdditionalComments: "5ab108ec15j9f4570253f2cc",
            contactInformation: {
                name: 'shail',
                address: {
                    ddress1: 'add1',
                    ddress2: 'add2',
                    city: 'city',
                    zip: '12345',
                    state: 'AX',
                    block: 'RX',
                    lot: 'AQ',
                    county: 'QW',
                    qualifier: 'EE'
                },
                phone: '8855554477',
                fax: '9999999999',
                email: 'abc@gmail.com',
                persons: [],
                contactType: 'Abstractor',
                referenceNumber: '234'
            },
            other: false,
            foreclosedParties: []
        }

        chai.request(server).post('/addForeClosureData').send(foreclosuredata).end(function (error, response) {
            response.should.have.status(200)
            response.body.should.be.an('object')
            done()
        })
    })
})
