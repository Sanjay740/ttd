const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = require('chai').expect
const should = require('chai').should()
const server = require('../../server')
const sinon = require('sinon')
chai.use(chaiHttp)
const TitleOrderRequest = require('../models/order/titleOrderRequest')

// Test Title Order Request API
describe('Test Save Title Order Request API', function () {
    it('it should be Save a new TitleOrderRequest', function (done) {
        let titleOrderRequest = {
            orderInformation: {
                transactionType: "Purchase",
                closingDate: new Date(1993, 12, 25),
                specialInstructions: 'special instruction',
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
            },
            requestorInformation: {
                name: 'Dipesh',
                currentAddress: {
                    address1: 'Address1',
                    address2: 'Address2',
                    city: 'city',
                    zip: '12345',
                    state: 'MJ5'
                },
                phone: '7210549331',
                fax: '1251425142',
                email: 'dipesh@gmail.com',
                persons: [
                    {
                        firstName: 'Dipesh',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'amit12@gmail.com',
                        title: 'requestor',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    },
                    {
                        firstName: 'amit',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'vikash12@gmail.com',
                        title: 'requestor2',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    }
                ],
                contactType: 'MortgageBroker',
                referenceNumber: 'ref123',
                requestor: true, // reprents if the contact is requestor
                relatedContact: 'none'
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
                qualifier: 'qualifier'
            },
            sellerInformation: {
                name: 'Amit',
                currentAddress: {
                    address1: 'Address1',
                    address2: 'Address2',
                    city: 'city',
                    zip: '12345',
                    state: 'MJ5'
                },
                phone: '7210549331',
                fax: '1251425142',
                email: 'amit@gmail.com',
                persons: [
                    {
                        firstName: 'Amit',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'amit12@gmail.com',
                        title: 'requestor',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    },
                ],
                contactType: 'SELLER',
                referenceNumber: 'ref123',
                requestor: true, // reprents if the contact is requestor
                relatedContact: 'none'
            },
            buyerInformation: {
                name: 'Amit',
                currentAddress: {
                    address1: 'Address1',
                    address2: 'Address2',
                    city: 'city',
                    zip: '12345',
                    state: 'MJ5'
                },
                phone: '7210549331',
                fax: '1251425142',
                email: 'amit@gmail.com',
                persons: [
                    {
                        firstName: 'Amit',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'amit12@gmail.com',
                        title: 'requestor',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    },
                ],
                contactType: 'Buyer',
                referenceNumber: 'ref123',
                requestor: true, // reprents if the contact is requestor
                relatedContact: 'none'
            },
            refinanceInformation: {
                mortgageBrokerName: 'mortgageName',
                mortgageBrokerEmail: 'mortgageEmail',
                mortgageBrokerPhone: '8541254125',
                mortgageBrokerFax: '2514251425'
            }
        }

        chai.request(server).post('/addTitleOrderRequest').send(titleOrderRequest).end(function (error, response) {    
            response.should.have.status(200)
            response.body.should.be.an('object')
            done()
        })
    })
})

//Test Title Order Request model
describe('Title Order Request Model Test', function () {
    it("it should add title order request data", function (done) {
        let toMock = sinon.mock(new TitleOrderRequest({
            orderInformation: {
                transactionType: "Purchase",
                closingDate: new Date(1993, 12, 25),
                specialInstructions: 'special instruction',
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
            },
            requestorInformation: {
                name: 'Dipesh',
                currentAddress: {
                    address1: 'Address1',
                    address2: 'Address2',
                    city: 'city',
                    zip: '12345',
                    state: 'MJ5'
                },
                phone: '7210549331',
                fax: '1251425142',
                email: 'dipesh@gmail.com',
                persons: [
                    {
                        firstName: 'Dipesh',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'amit12@gmail.com',
                        title: 'requestor',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    },
                    {
                        firstName: 'amit',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'vikash12@gmail.com',
                        title: 'requestor2',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    }
                ],
                contactType: 'MortgageBroker',
                referenceNumber: 'ref123',
                requestor: true, // reprents if the contact is requestor
                relatedContact: 'none'
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
                qualifier: 'qualifier'
            },
            sellerInformation: {
                name: 'Amit',
                currentAddress: {
                    address1: 'Address1',
                    address2: 'Address2',
                    city: 'city',
                    zip: '12345',
                    state: 'MJ5'
                },
                phone: '7210549331',
                fax: '1251425142',
                email: 'amit@gmail.com',
                persons: [
                    {
                        firstName: 'Amit',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'amit12@gmail.com',
                        title: 'requestor',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    },
                ],
                contactType: 'SELLER',
                referenceNumber: 'ref123',
                requestor: true, // reprents if the contact is requestor
                relatedContact: 'none'
            },
            buyerInformation: {
                name: 'Amit',
                currentAddress: {
                    address1: 'Address1',
                    address2: 'Address2',
                    city: 'city',
                    zip: '12345',
                    state: 'MJ5'
                },
                phone: '7210549331',
                fax: '1251425142',
                email: 'amit@gmail.com',
                persons: [
                    {
                        firstName: 'Amit',
                        middleName: 'kumar',
                        lastName: 'singh',
                        phone: '7210549331',
                        fax: 2152412541,
                        email: 'amit12@gmail.com',
                        title: 'requestor',
                        cell: '8542145214',
                        licenseNumber: 'LIC',
                        dob: new Date(1993, 12, 05)
                    },
                ],
                contactType: 'Buyer',
                referenceNumber: 'ref123',
                requestor: true, // reprents if the contact is requestor
                relatedContact: 'none'
            },
            refinanceInformation: {
                mortgageBrokerName: 'mortgageName',
                mortgageBrokerEmail: 'mortgageEmail',
                mortgageBrokerPhone: '8541254125',
                mortgageBrokerFax: '2514251425'
            }
        })
        )

        var titleOrderData = toMock.object
        var expectedResult = { status: true }
        toMock.expects('save').yields(null, expectedResult)
        titleOrderData.save(function (error, result) {
            toMock.verify()
            toMock.restore()
            expect(result.status).to.be.true
            done()
        })
    })
})
