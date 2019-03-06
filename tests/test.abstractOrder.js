'use strict'
const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const should = require('chai').should()
const server = require('../../server')
const sinon = require('sinon')
chai.use(chaiHttp)
const AbstractOrder = require('../models/order/abstractOrder')
 
// test Abstractorder api
describe('Test AbstractOrder Test API', function () {
    it('AbstractOrder API should be save AbstractOrder Information', function (done) {
        let abstractOrder = {
            requestor: {
                requestedFor: { 
                    name: "Ansh"
                },
                role: 'Seller',
            },
            servicesRequested: {
                reportType: 'Stub Abstract',
                dateNeeded: new Date(1993, 12, 25),
                loanNumber: 121,
                reportDelivery: 'Fax'
            },
            propertyAddress: {
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
            AdditionalComments: 'This is O&E Form',
            documents: [
                {
                    name: 'titlePaper',
                    extension: '.pdf',
                    path: '/home/amit/Documents',
                    comment: 'this is a title order paper'
                },
                {
                    name: 'loanPaper',
                    extension: '.pdf',
                    path: '/home/amit/Documents',
                    comment: 'this is a loan paper'
                }
            ]
        }
        chai.request(server).post('/addAbstractOrder').send(abstractOrder).end(function (error, response) {
            response.should.have.status(200)
            response.body.should.be.an('object')
            done()
        })
    })
})

//Test Abstract Order model
describe('Abstract Order Model Test', function () {
    it("it should add abstract order data", function (done) {
        let abMock = sinon.mock(new AbstractOrder({
            requestor: {
                requestedFor: {
                    name: "Ansh"
                },
                role: 'Seller',
            },
            servicesRequested: {
                reportType: 'Stub Abstract',
                dateNeeded: new Date(1993, 12, 25),
                loanNumber: 121,
                reportDelivery: 'Fax'
            },
            propertyAddress: {
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
            AdditionalComments: 'This is O&E Form',
            documents: [
                {
                    name: 'titlePaper',
                    extension: '.pdf',
                    path: '/home/amit/Documents',
                    comment: 'this is a title order paper'
                },
                {
                    name: 'loanPaper',
                    extension: '.pdf',
                    path: '/home/amit/Documents',
                    comment: 'this is a loan paper'
                }
            ]
        })
        )

        var abstractOrderData = abMock.object
        var expectedResult = { status: true }
        abMock.expects('save').yields(null, expectedResult)
        abstractOrderData.save(function (error, result) {
            abMock.verify()
            abMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})