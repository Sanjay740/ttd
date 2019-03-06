'use strict'
const chai = require('chai')
const expect = require('chai').expect
const should = require('chai').should()
const chaiHttp = require('chai-http')
const server = require('../../server')
const sinon = require('sinon')
chai.use(chaiHttp)
const LimitedLoan = require('../models/order/limitedLoanCoveragePolicy')

// test limited loan and coverage policy with api
describe('Limited Loan Coverage order API Test', function () {
    it('it saves a new limmited loan order', function (done) {
        let limitedLoanData = {
            requestor: {
                requestedFor: {
                    name :"Sonali Das"
                },
                dateNeeded: new Date(1994, 11, 20),
                loanNumber: 12155345,
                mortgagePolicy: 2553545,
                mortgageReadyForPickUp: {
                    readyForPickUp: true,
                    where: "Anand Vihar"
                }
            },
            propertyAddress: {
                properttype: 'Unimproved Land',
                address1: 'Address1',
                address2: 'Address2',
                city: 'city',
                zip: '12345',
                state: 'Delhi',
                block: 'B2',
                lot: 'Lot',
                county: 'County',
                qualifier: 'qualifier',
                legalDescription: 'legalDescription',
                parcelNumber: 'parcelNumber'
            },
            ownerInformation: {
                buyer1FirstName: 'Sonali',
                buyer1LastName: 'Das',
                buyer2FirsttName: 'Dipesh',
                buyer2LastName: 'Dhawan',
                ownerType: 'Individual',
                buyerSameAsPropertyAddress: true,
                address: {
                    address1: "Address 1",
                    address2: "Address 2",
                    city: "City",
                    zip: "12344",
                    state: "MJ5"
                }
            },
            AdditionalComments: 'Want to Buy a Loan',
            documents: [
                {
                    name: 'Balloon Payment',
                    extension: '.pdf',
                    path: '/home/agami/Documents',
                    comment: 'this is about balloon payment'
                },
                {
                    name: 'Recording Fees',
                    extension: '.pdf',
                    path: '/home/agami/Documents',
                    comment: 'this is about recording fee'
                }
            ]
        }

        chai.request(server).post('/addLimitedLoanOrder').send(limitedLoanData).end(function (error, response) {
            response.should.have.status(200)
            response.body.should.be.an('object')
            done()
        })
    })
})

//model test in limited loan and coverage policy data
describe('Limited Loan And Coverage Order Model Test', function () {
    it("it should add limited loan data", function (done) {
        let lcMock = sinon.mock(new LimitedLoan({
            requestor: {
                requestedFor: {
                    name: "Sonali Das"
                },
                dateNeeded: new Date(1994, 11, 20),
                loanNumber: 12155345,
                mortgagePolicy: 2553545,
                mortgageReadyForPickUp: {
                    readyForPickUp: true,
                    place: "Anand Vihar"
                }
            },
            propertyAddress: {
                properttype: 'Unimproved Land',
                address1: 'Address1',
                address2: 'Address2',
                city: 'city',
                zip: '12345',
                state: 'Delhi',
                block: 'B2',
                lot: 'Lot',
                county: 'County',
                qualifier: 'qualifier',
                legalDescription: 'legalDescription',
                parcelNumber: 'parcelNumber'
            },
            ownerInformation: {
                buyer1FirstName: 'Sonali',
                buyer1LastName: 'Das',
                buyer2FirsttName: 'Dipesh',
                buyer2LastName: 'Dhawan',
                ownerType: 'Individual',
                buyerSameAsPropertyAddress: true,
                address: {
                    address1: "Address 1",
                    address2: "Address 2",
                    city: "City",
                    zip: "12344",
                    state: "MJ5"
                }
            },
            AdditionalComments: 'Want to Buy a Loan',
            documents: [
                {
                    name: 'Balloon Payment',
                    extension: '.pdf',
                    path: '/home/agami/Documents',
                    comment: 'this is about balloon payment'
                },
                {
                    name: 'Recording Fees',
                    extension: '.pdf',
                    path: '/home/agami/Documents',
                    comment: 'this is about recording fee'
                }
            ]
        })
        )

        var limitedLoanCoverageData = lcMock.object
        var expectedResult = { status: true }
        lcMock.expects('save').yields(null, expectedResult)
        limitedLoanCoverageData.save(function (error, result) {
            lcMock.verify()
            lcMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})