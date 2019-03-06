var common = require('../util/common')

module.exports.render = function (estimate) {
	let html = ``;
	html = `
    <style type="text/css">
	table, tbody, tr, td {
		border: 1px solid transparent;
	}
</style>
	
	<div style="display: flex;font-family: arial">
		<div style="font-size: 12px;width: 900px;margin: 0 auto;float: none;background: #fff;padding: 5px">
			<table width="100%" cellSpacing="0" cellPadding="0" style="table-layout: fixed;" border="0">
				<tbody>
					<tr>
						<td style="padding: 20px 5px; font-weight:bold!important;text-align:center;color:#6434aa; font-weight: normal; font-size: 18px; word-wrap: break-word; background-color:#e6e3ec;display: flex; justify-content: center;">
							Netsheet Estimate
						</td>
					</tr>
				</tbody>
			</table>
			<table width="100%" cellSpacing="4" cellPadding="2" style="background:#fcfaff; table-layout: fixed; border:1px solid #fcfaff" border="0	">
				<tbody>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Seller :
						</td>
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.sellerName ? estimate.sellerName : '-'}
						</td>
                    </tr>
                    <tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Buyer :
						</td>
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.buyerName ? estimate.buyerName : '-'}
						</td>
					</tr>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Property Address :
						</td>	
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.propertyAddress ? estimate.propertyAddress : '-'}
						</td>								
                    </tr>
                    <tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Property County :
						</td>	
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.propertyCounty}
						</td>								
					</tr>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Purchase Price :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.purchasePrice}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Estimated Closing Date :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${common.checkDate(estimate.estimatedClosingDate)}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Estimate Prepared By :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.firstName} ${estimate.lastName}, ${estimate.contactCompany}
						</td>
					</tr>
				</tbody>
			</table>

			${renderClosingCostData(estimate)}

			<table width="100%" cellSpacing="0" cellPadding="0" style="table-layout: fixed;" border="0">
				<tbody>
					<tr>
						<td style="padding: 10px 0px; color: #333; font-weight: normal; font-size: 14px; word-wrap: break-word;font-weight: bold">
							<div style=" font-size: 12px; color: #fff;font-weight: 400px; display: flex; flex-direction: row; flex-wrap: wrap; flex: 1; min-width: 92px; background-color: #6434aa; 	padding:10px 20px 10px 30px;">Estimated Proceeds Due Seller
							</div>
						</td>
					</tr>
					
				</tbody>
			</table>

			<table width="100%" cellSpacing="4" cellPadding="2" style="background:#fcfaff; table-layout: fixed; border:1px solid #fcfaff" border="0	">
				<tbody>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Purchase Price :
						</td>
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.purchasePrice}
						</td>
					</tr>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Less Estimated Costs :
						</td>	
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.sellerTotalAmount}
						</td>								
					</tr>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        Estimated Net Amount :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.netSellerProceeds}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        Less Owner Financing :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.ownerFinancingAmount}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        Estimated Proceeds at COE : 
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.closingSellerProceeds}
						</td>
					</tr>
				</tbody>
			</table>

			<table width="100%" cellSpacing="0" cellPadding="0" style="table-layout: fixed;" border="0">
				<tbody>
					<tr>
						<td style="padding: 10px 0px; color: #333; font-weight: normal; font-size: 14px; word-wrap: break-word;font-weight: bold">
							<div style=" font-size: 12px; color: #fff;font-weight: 400px; display: flex; flex-direction: row; flex-wrap: wrap; flex: 1; min-width: 92px; background-color: #6434aa; 	padding:10px 20px 10px 30px;">Buyer Monthly Payment
							</div>
						</td>
					</tr>
					
				</tbody>
			</table>

			<table width="100%" cellSpacing="4" cellPadding="2" style="background:#fcfaff; table-layout: fixed; border:1px solid #fcfaff" border="0	">
				<tbody>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        Loan Amount :
						</td>
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.loanAmount}
						</td>
					</tr>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        Type of Loan :
						</td>	
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.loanType}
						</td>								
					</tr>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Term of Loan :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.loanTermYears}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Interest Rate (%) : 
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.loanRate}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Principal &amp; Interest :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.monthlyPrincipalAndInterest}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							Taxes/Servicing :
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.monthlyPropertyTaxes}
						</td>
					</tr>

					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
							 Insurance :	
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.monthlyHazardInsurance}
						</td>
                    </tr>
                    
                    <tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        MPI/PMI :	
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.monthlyMortgageInsurance}
						</td>
                    </tr>
                    
                    <tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        HOA and/or P&amp;I (2nd Loan) :	
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.additionalMonthlyCost}
						</td>
                    </tr>
                    
                    <tr>
						<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
                        Estimated Monthly Payment :	
						</td> 
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
							${estimate.totalMonthlyLoanPayment}
						</td>
					</tr>
				</tbody>
			</table>



			${getCostExplanations(estimate.explanations)}

		</div>
	</div>
    
    `


	return html;
}


function renderClosingCostData(estimate) {
	let html = `
    <table width="100%" cellSpacing="0" cellPadding="0" style="table-layout: fixed;" border="0">
				<tbody>
					<tr>
						<td style="padding: 10px 0px; color: #333; font-weight: normal; font-size: 14px; word-wrap: break-word;font-weight: bold">
							<div style=" font-size: 12px; color: #fff;font-weight: 400px; display: flex; flex-direction: row; flex-wrap: wrap; flex: 1; min-width: 92px; background-color: #6434aa; 	padding:10px 20px 10px 30px;">Net Sheet
							</div>
						</td>
						
					</tr>
					
				</tbody>
			</table>

			<table width="100%" cellSpacing="0" cellPadding="0" style="border: 1px solid #ddd; margin-bottom: 0x; table-layout: fixed;" border="1">
				<tbody>
					<tr>
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word; font-weight: bold;text-align: center;">
							Line 
						</td>
						
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word; font-weight: bold;">
							Description
						</td>
						
						<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word; font-weight: bold;">
							${estimate.loanType}
						</td>
						${(estimate.netSheetType == 'Seller' || estimate.netSheetType == 'Both') ? '<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word; font-weight: bold;">Seller Amount ($)</td>' : ''}
						${(estimate.netSheetType == 'Buyer' || estimate.netSheetType == 'Both') ? '<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word; font-weight: bold;">Buyer Amount ($)</td>' : ''}
                    </tr>
					
    `

	for (let index = 0; index < estimate.netSheetSection.length; index++) {
		const element = estimate.netSheetSection[index];
		html += `
        <tr style="background-color: #efe6fc;" >
            <td  colspan="5" style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
            ${element.description}
            </td>
        </tr>
        `;

		for (let i = 0; i < element.closingCost.length; i++) {
			const el = element.closingCost[i];
			html += `
            <tr>
                <td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;text-align: center;">
                   ${el.lineNumber}
                </td>
                
                <td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
                    ${el.description}
                </td>

                <td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
                    ${common.getEnumPropName('financingRequirementType', el.financingRequirements.financingRequirement)} 
                </td>
				${(estimate.netSheetType == 'Seller' || estimate.netSheetType == 'Both') ? '<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">' + el.sellerAmount + '</td>' : ''}
				${(estimate.netSheetType == 'Buyer' || estimate.netSheetType == 'Both') ? '<td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">' + el.buyerAmount + '</td>' : ''}
            </tr>
            `
		}
	}

	// The result row and end of table .
	html += `
    <tr style="background-color:#efefef;">
							<td colspan="2" style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
								
							</td>
							<td style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">
								Total Amount 
							</td>
							${(estimate.netSheetType == 'Seller' || estimate.netSheetType == 'Both') ? '<td  style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">' + estimate.sellerTotal + '</td>' : ''}
							${(estimate.netSheetType == 'Buyer' || estimate.netSheetType == 'Both') ? '<td  style="padding: 10px 5px; color: #333; font-weight: bold; font-size: 12px; word-wrap: break-word;">' + estimate.buyerTotal + '</td>' : ''}
						</tr>
				</tbody>
			</table>
    `;

	return html;
}

function getCostExplanations(explanations) {
	let html = `
    <table width="100%" cellSpacing="0" cellPadding="0" style="table-layout: fixed;" border="0">
				<tbody>
					<tr>
						<td style="padding: 10px 0px; color: #333; font-weight: normal; font-size: 14px; word-wrap: break-word;font-weight: bold">
							<div style=" font-size: 12px; color: #6434aa;font-weight: 400px; display: flex; flex-direction: row; flex-wrap: wrap; flex: 1; min-width: 92px;	padding:10px 10px;">ESTIMATED	COSTS	EXPLANATION
							</div>
						</td>
					</tr>
					
				</tbody>
			</table>

		<table width="100%" cellSpacing="4" cellPadding="2" style="background:#fcfaff; table-layout: fixed; border:1px solid #fcfaff" border="0	">
     <tbody>`;

	for (let index = 0; index < explanations.length; index++) {
		const element = explanations[index];
		html += `
                        <tr>
                            <td style="padding: 10px 5px; color: #333; font-weight: normal; font-size: 12px; word-wrap: break-word;">
                                <span style="color:#6434aa">${element.line}. ${element.description}	-</span>${element.explanation}
                            </td>
					    </tr>
                        `
	}
	html += `
            </tbody>
			</table>
        `;

	return explanations.length > 0 ? html : '';
}