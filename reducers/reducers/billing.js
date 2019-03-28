import * as utils from '../../components/functions/functions'

const initialState = {
	currentProvider:0,
	currentServiceType:0,
	currentBill:0,
	billDetailsToShow:[],
	setBilled:[],
	diagnosisCodes:[],
	billing:{
		services_to_bill:[],
		treating_providers:[]
	}
};

const convertItems=(items)=> {
	items.treating_providers.map(e=>{
		e.services_to_bill.forEach((s)=> {
			console.log('billingvisitid', s.visit_dt, e)
			s['bill_status_id']=s.bill_status_id==1?true:false
			s['visit_dt']=utils.convertDate(s.visit_dt)
		})
		e.specialties.forEach(t=> {
			t.services.forEach(r=>{
				let treatments = []

				r['billing_dt']=utils.convertDateMask(r.billing_dt);
				r.treatments.map((n, i)=> {
					n['visit_type_cd']=r.visit_type_cd
					n['visit_dt']=utils.convertDate(r.visit_dt)
					n['dc_1']=n.dc_1==null||n.dc_1=='N'?false:true
					n['dc_2']=n.dc_1==null||n.dc_1=='N'?false:true
					n['dc_3']=n.dc_1==null||n.dc_1=='N'?false:true
					n['dc_4']=n.dc_1==null||n.dc_1=='N'?false:true

				})
			})
		})
		

		})
	return items	
}

const showDetails=(currentBillIdx, state)=> {
	// const {billing, currentProvider, currentServiceType} = state
	const details = []
	// let currentBill = ''
	// if (billing.treating_providers.length>0) {
	// 	if (billing.treating_providers[currentProvider].specialties.length>0) {
	// 		currentBill = billing.treating_providers[currentProvider].specialties[currentServiceType].services[currentBillIdx]
	// 	}
	// }
	// currentBill&&currentBill.treatments.map(e=> {
	// 	details.push({
	// 		visit_dt:utils.convertDate(currentBill.visit_dt),
	// 		visit_type_cd:currentBill.visit_type_cd,
	// 		pc_code:e.pc_code,
	// 		pc_code_description:e.pc_code_description,
	// 		pc_charge:e.pc_charge,
	// 		units:e.units,
	// 		dc_1:e.dc_1=='N'||e.dc_1==null?false:true,
	// 		dc_2:e.dc_2=='N'||e.dc_2==null?false:true,
	// 		dc_3:e.dc_3=='N'||e.dc_3==null?false:true,
	// 		dc_4:e.dc_4=='N'||e.dc_4==null?false:true,
	// 		pc_modifier:e.pc_modifier
	// 	})
	// })
	return details
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_BILLING_INFO':
			return {
				...state, 
				billing:convertItems(action.res.data.data), 
				// billDetailsToShow:showDetails(state.currentBill, {...state, billing:convertItems(action.res.data.data)})
			}

		case 'SELECT_PROVIDER': 
			return {
				...state, 
				currentProvider:action.provider, 
			}

		case 'SELECT_SERVICE_TYPE': 
			return {
				...state, 
				currentServiceType:action.serviceType,
			}

		case 'SELECT_BILL': 
			return {
				...state, 
				currentBill:action.bill, 
			}

		case 'SET_BILLED':
			return {
				...state,
				setBilled:action.bill
			}
		case 'LOAD_CODES':
			return {...state, diagnosisCodes:action.codes}
		default:
			return state
	}
}