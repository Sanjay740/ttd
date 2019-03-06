// DSH: OrderType mapping with its models (mongoose).

module.exports = [
  {
    type: "ForeClosure",
    id: 3,
    name: "ForeClosure",
    model: "foreclosureOrder",
    imageName: "foreclosure_icon_32x32"
  },
  {
    type: "Abstract",
    id: 1,
    name: "Abstract",
    model: "abstractOrder",
    imageName: "abstract_icon_32x32"
  },
  {
    type: "DeedInLieu",
    id: 2,
    name: "Deed In Lieu",
    model: "deedInLieuOrder",
    imageName: "deedInLieu_icon_32x32"
  },
  {
    type: "InformationSearch",
    id: 4,
    name: "Information Search",
    model: "informationSearchOrder",
    imageName: "informational_icon_32x32"
  },
  {
    type: "LimitedLoanCoveragePolicy",
    id: 5,
    name: "Limited Loan Coverage Policy",
    model: "limitedLoanCoveragePolicy",
    imageName: "llcPolicy_icon_32x32"
  },
  {
    type: "OwnerAndEncumbrance",
    id: 6,
    name: "Owner & Encumbrance",
    model: "ownerAndEncumbranceOrder",
    imageName: "ownerAndEnc_icon_32x32"
  },
  {
    type: "REO",
    name: "REO",
    id: 7,
    model: "reoOrder",
    imageName: "reo_icon_32x32"
  },
  {
    type: "TitleRequestOrder",
    id: 8,
    name: "Title Request Order",
    model: "titleRequestOrder",
    imageName: "order_request_icon_32x32"
  }
];
