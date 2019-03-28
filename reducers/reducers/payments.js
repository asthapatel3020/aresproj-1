import * as utils from '../../components/functions/functions'

const initialState = {
	billing:{
		services_to_bill:[],
		treating_providers:[]
	},
	events:[]
};

const convertItems=(items)=> {
	// items.treating_providers.forEach(e=>{
	// 	e.specialties.forEach(t=> {
	// 		t.services.forEach(r=>{
	// 			r.billing_dt=utils.convertDate(e.billing_dt);
	// 		})
	// 	})
		

	// 	})
	return items	
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_BILLING_INFO':
			return {...state, billing:convertItems(action.res.data.data)}
		case 'GET_PATIENT_EVENTS':
			return {...state, events:action.res.data.data}
		default:
			return state
	}
}