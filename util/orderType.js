module.exports.orderTypes = {
    titleRequestOrder: "Title Request Order",
    reoOrder: "REO Order",
    ownerAndEncumbranceOrder: "Owners And Encumbrance Order",
    limitedLoanCoveragePolicy: "Limited Loan Coverage Policy",
    informationSearchOrder: "Information Search Order",
    deedInLieuOrder:"Deed In Lieu Order",
    abstractOrder: "Abstract Order",
    foreclosureOrder:"Foreclosure Order"
}

module.exports.getOrderName = function(orderType) {
    let val = "";
    switch(orderType){
   case "titleRequestOrder":
     val =  "Title Request Order";
     break;
     case "reoOrder":
     val =  "REO Order";
     break;
     case "ownerAndEncumbranceOrder":
     val =   "Owners And Encumbrance Order";
     break;
     case "limitedLoanCoveragePolicy":
     val = "Limited Loan Coverage Policy";
     break;
     case "informationSearchOrder":
     val =  "Information Search Order";
     break;
     case "deedInLieuOrder":
     val =  "Deed In Lieu Order";
     break;

     case "abstractOrder":
     val =   "Abstract Order";
     break;

     case "foreclosureOrder":
     val = "Foreclosure Order";
     break;
default:
val=""; 
  }
return val;
}