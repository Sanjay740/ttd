/**add more contact type to enum definition , when more contacts get introduced in system */
const CONTACTTYPES = [
    'Abstractor',
    'Appraiser',
    'Attorney',
    'Buyer',
    'GeneralContractor',
    'Government',
    'HOA',
    'HOAManagement',
    'HomeInspector',
    'Lender',
    'ListingAgentBroker',
    'LoanServicer',
    'MortgageBroker',
    'Other',
    'PayoffLender',
    'PestInspector',
    'QualifiedIntermediary',
    'Seller',
    'SellingAgentBroker',
    'SettlementAgent',
    'Subcontractor',
    'Surveyor',
    'TitleCompany',
    'Underwriter',
    'EscrowCompany',
    'Builder',
    'HazardInsuranceAgent',
    'Portal'
]
const ClosingMember = ['Closer', 'EscrowOfficer', 'EscrowAgent', 'Seller', 'Lender', 'Buyer', 'Attorney', 'SettlementAgent', 'RealEstateAgent', 'ListingAgentBroker', 'SellingAgentBroker']

const CONTACTTYPESJSON = [
    { name: 'Abstractor', isSystemRole: true, views: [] },
    { name: 'Appraiser', isSystemRole: true, views: [] },
    { name: 'Attorney', isSystemRole: true, views: [] },
    { name: 'Buyer', isSystemRole: false, views: [] },
    { name: 'GeneralContractor', isSystemRole: true, views: [] },
    { name: 'Government', isSystemRole: true, views: [] },
    { name: 'HOA', isSystemRole: true, views: [] },
    { name: 'HOAManagement', isSystemRole: true, views: [] },
    { name: 'HomeInspector', isSystemRole: true, views: [] },
    { name: 'Lender', isSystemRole: true, views: [] },
    { name: 'ListingAgentBroker', isSystemRole: true, views: [] },
    { name: 'LoanServicer', isSystemRole: true, views: [] },
    { name: 'MortgageBroker', isSystemRole: true, views: [] },
    { name: 'Other', isSystemRole: false, views: [] },
    { name: 'PayoffLender', isSystemRole: true, views: [] },
    { name: 'PestInspector', isSystemRole: true, views: [] },
    { name: 'QualifiedIntermediary', isSystemRole: true, views: [] },
    { name: 'Seller', isSystemRole: false, views: [] },
    { name: 'SellingAgentBroker', isSystemRole: true, defaultView: 'TransactionsDashboard', views: [] },
    { name: 'SettlementAgent', isSystemRole: true, defaultView: 'TransactionsDashboard', views: [] },
    { name: 'Subcontractor', isSystemRole: true, views: [] },
    { name: 'Surveyor', isSystemRole: true, views: [] },
    { name: 'TitleCompany', isSystemRole: true, defaultView: 'TransactionsDashboard', views: [] },
    { name: 'Underwriter', isSystemRole: true, views: [] },
    { name: 'EscrowCompany', isSystemRole: true, defaultView: 'TransactionsDashboard', views: [] },
    { name: 'Builder', isSystemRole: true, views: [] },
    { name: 'HazardInsuranceAgent', isSystemRole: true, views: [] },
    { name: 'EscrowAgent', isSystemRole: true, views: [] },
    { name: 'EscrowAssistant', isSystemRole: true, views: [] },
    { name: 'EscrowOfficer', isSystemRole: true, views: [] },
    { name: 'Closer', isSystemRole: true, views: [] },
    { name: 'RealEstateAgent', isSystemRole: true, views: [] },
    { name: 'HomeOwnerInsurance', isSystemRole: true, views: [] },
    { name: 'Portal', isSystemRole: false, defaultView:'TransactionsDashboard', views: [{name:'TransactionsDashboard', acess:'grant'}] },
]
module.exports.contactTypes = CONTACTTYPES;
module.exports.contactTypeJson = CONTACTTYPESJSON