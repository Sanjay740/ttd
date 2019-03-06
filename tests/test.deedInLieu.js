'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../../server')
const sinon = require('sinon')
const expect = chai.expect
const should = chai.should()
chai.use(chaiHttp)
const DeedInLieu = require('../models/order/deedInLieuOrder')

// model test with deed in lieu data
describe('save deedInlieu data', function () {
    it("should add deedInlieu form", function (done) {
        let dilMock = sinon.mock(new DeedInLieu({
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
            buyer: {
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
                contactType: "Buyer",
                referenceNumber: "587",
            },
            attorney: {
                name: 'sssd',
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
                contactType: "Buyer",
                referenceNumber: "587",
            },
            sellers: [],
            AdditionalComments: "testing",
            ClientId: ("562b2649b2e42345f113c04d"),
            policy: {
                amount: "555", // this property is decimal
                policyType: "Loan"
            },
            prepareSettlementNotice: true
        })
        )

        var deedInLieudata = dilMock.object
        var expectedResult = { status: true }
        dilMock.expects('save').yields(null, expectedResult)
        deedInLieudata.save(function (error, result) {
            dilMock.verify()
            dilMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})

//api test with deedInlieu order data
describe('api test with deedInlieu order data', function () {
    it('it should POST a deedInlieu data', (done) => {
        let deedInLieu = {
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
            buyer: {
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
                contactType: "Buyer",
                referenceNumber: "587",
            },
            attorney: {
                name: 'sssd',
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
                contactType: "Buyer",
                referenceNumber: "587",
            },
            sellers: [],
            AdditionalComments: "testing",
            ClientId: ("562b2649b2e42345f113c04d"),
            policy: {
                amount: "555", // this property is decimal
                policyType: "Loan"
            },
            prepareSettlementNotice: true
        }
        chai.request(server).post('/addDeedInLieuData').send(deedInLieu).end(function (error, response) {
            response.should.have.status(200)
            response.body.should.be.an('object')
            done()
        })
    })
})
