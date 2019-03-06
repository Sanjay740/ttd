'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const should = require('chai').should()
const server = require('../../server')
const sinon = require('sinon')
chai.use(chaiHttp)
const OwnerEncumbrance = require('../models/order/ownerAndEncumbranceOrder')
 
//Test Owner&Encumbrance API 
describe('Test Owner&Encumbrance Test API', function () {
    it('O&E API should be save O&E Information', function (done) {
        let ownerAndEncumbrance = {
            requestor: {
                requestedFor: { 
                    name: "Amit Raj" 
                },
                role: 'Buyer',
            },
            servicesRequested: {
                reportType: 'Owners & Encumbrance Report',
                dateNeeded: new Date(1993, 12, 25),
                loanNumber: 121,
                reportDelivery: 'Email'
            },
            propertyAddress: {
                properttype: 'Leased',
                address1: 'Address1',
                address2: 'Address2',
                city: 'city',
                zip: '12345',
                state: 'MJ5',
                block: 'C1',
                lot: 'C2',
                county: 'County',
                qualifier: 'qualifier',
                legalDescription: 'legalDescription',
                parcelNumber: 'parcelNumber'
            },
            ownerInformation:
                {
                    buyer1FirstName: 'Amit',
                    buyer1LastName: 'Raj',
                    ownerType: 'Individual1'
                },
            AdditionalComments: 'This is O&E Form',
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

        chai.request(server).post('/addO&EOrderRequest').send(ownerAndEncumbrance).end(function (error, response) {
            response.should.have.status(200)
            response.body.should.be.an('object')
            done()
        })
    })
})

//Test Owner&Encumbrance order model
describe('Owner&Encumbrance Order Model Test', function () {
    it("it should add Owner&Encumbrance order data", function (done) {
        let oeMock = sinon.mock(new OwnerEncumbrance({
            requestor: {
                requestedFor: {
                    name: "Amit Raj"
                },
                role: 'Buyer',
            },
            servicesRequested: {
                reportType: 'Owners & Encumbrance Report',
                dateNeeded: new Date(1993, 12, 25),
                loanNumber: 121,
                reportDelivery: 'Email'
            },
            propertyAddress: {
                properttype: 'Leased',
                address1: 'Address1',
                address2: 'Address2',
                city: 'city',
                zip: '12345',
                state: 'MJ5',
                block: 'C1',
                lot: 'C2',
                county: 'County',
                qualifier: 'qualifier',
                legalDescription: 'legalDescription',
                parcelNumber: 'parcelNumber'
            },
            ownerInformation:
                {
                    buyer1FirstName: 'Amit',
                    buyer1LastName: 'Raj',
                    ownerType: 'Individual1'
                },
            AdditionalComments: 'This is O&E Form',
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

        var ownerAndEncumbranceOrderData = oeMock.object
        var expectedResult = { status: true }
        oeMock.expects('save').yields(null, expectedResult)
        ownerAndEncumbranceOrderData.save(function (error, result) {
            oeMock.verify()
            oeMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})