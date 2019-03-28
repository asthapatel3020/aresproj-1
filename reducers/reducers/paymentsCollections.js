import * as utils from '../../components/functions/functions'

const initialState = {
	events:[],
	currentTreatment:0,
	services:[],
	currentPayment:0,
	paymentSources:[],
	totals:{
		totalBilled:0,
		totalPaid:0,
		totalAdjust:0,
		totalBalance:0
	}
};

const convertItems=(items)=> {
	let arr = []
	items.map(e=>{
		let payments = []

		let totalBilled, totalPaid, totalAdjust, totalBalance = 0;
		e.treatments.map(r=>{
			r.payments.map(t=>{
				payments.push({
					...t,
					check_issued_dt:utils.convertDateMask(t.check_issued_dt),
					payment_dt:utils.convertDateMask(t.payment_dt)
				})
			})
			totalBilled+=r.billed_am
			arr.push({
				...r,
				payments:payments,
				bill_id:e.bill_id,
				billing_dt:utils.convertDate(e.billing_dt),
				mailing_dt:utils.convertDate(e.mailing_dt),
				billing_period:`${utils.convertDate(r.from_dt)} - ${utils.convertDate(r.to_dt)}`,
				code_units:`${r.pc_code} ${r.pc_modifier}*${r.units}`,
				denied_dt:utils.convertDateMask(r.denied_dt),
				balance:Number(r.pc_charge-r.paid_am-r.write_off_am).toFixed(2),
				pc_charge:r.pc_charge,
				office_name:e.office_name,
				recovered_dt:utils.convertDateMask(r.recovered_dt),
				sent_to_attorney_dt:utils.convertDateMask(r.sent_to_attorney_dt)

			})
		})
		
		
	})
	console.log('paymentsFinal', arr)
	return arr	
}
const findTotals=(items)=> {
	let totalBilled = 0
	let totalPaid = 0
	let totalAdjust = 0
	let totalBalance = 0
	items.map(e=>{
		e.treatments.map(r=>{
			console.log('mappe', r)
			totalBilled+=(r.pc_charge)
			totalPaid+=r.paid_am
			totalAdjust+=r.write_off_am
			totalBalance+=Number(r.pc_charge-r.paid_am-r.write_off_am)
	})
	})
	return {
		totalBilled:Number((totalBilled).toFixed(2)), 
		totalPaid:Number((totalPaid).toFixed(2)), 
		totalAdjust:Number((totalAdjust).toFixed(2)), 
		totalBalance:Number((totalBalance).toFixed(2))
	}
}
const convertPaymentSources=(data)=> {
	let arr = []
	data.map(e=>arr.push(
		{
			value:e.payment_source_id, 
			label:e.payment_source_nm,
			...e
		}))
	return arr
}
const convertEvents=(data)=> {
	let arr = []
	data.map(e=> {
		arr.push({
			...e,
			when_created:utils.convertDateMask(e.when_created),
			when_to_do:utils.convertDateMask(e.when_to_do)

		})
	})
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_PAYMENTS':
			return {
				...state, 
				totals:findTotals(action.res.data.data.services), 
				services:convertItems(action.res.data.data.services), 
				events:convertEvents(action.res.data.data.events)
			}
		case 'SELECT_CURRENT_TREATMENT':
			return {...state, currentTreatment:action.treatment}

		case 'SELECT_CURRENT_PAYMENT':
			return {...state, currentPayment:action.payment}
		case 'GET_PAYMENT_SOURCES':
			return {...state, paymentSources:convertPaymentSources(action.res.data.data)}
		default:
			return state
	}
}