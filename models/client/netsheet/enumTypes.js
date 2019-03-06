module.exports.downPaymentType = {
    percentage: 0,
    flat: 1
}

module.exports.loanType = {
    conventional: 0,
    CTL: 1,
    FHA: 2,
    ownerCarryBack: 3,
    VA: 4,
    USDA: 5,
    cash: 6
}

module.exports.financeType = {
    loan: 0,
    cash: 1
}
module.exports.financingRequirementType = {
    required: 0,
    optional: 1,
    notApplicable: 2
}
module.exports.splitType = {
    buyer: 0,
    seller: 1,
    split: 2
}
module.exports.calculationType = {
    blank: 0,
    flatAmount: 1,
    escrowFee: 2,
    newLoanEscrowFee: 3,
    ownersTitleInsurancePremium: 4,
    lendersTitleInsurancePremium: 5,
    originationFee: 6,
    prepaidInterestAmount: 7,
    propertyTaxImpounds: 8,
    hazardInsuranceImpounds: 9,
    MPI_PMIImpounds: 10,
    brokerageFee: 11,
    downPayment: 12,
    propertyTaxProration: 13,
    USDAfee: 14
}