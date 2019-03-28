import * as utils from '../../components/functions/functions'
const initialState = {
	needToSave:false,
	patient:{
		insurances:[]
	},
	visitRegistry:{
		services:[],
		patient_diagnosis_codes:[]

	}
};

const convertItems=(items)=> {
	items.services.forEach(e=>{
		e.visit_dt=utils.convertDateMask(e.visit_dt);
		e.treatments.forEach(n=>{
			n.from_dt=utils.convertDateMask(n.from_dt);
			n.to_dt=utils.convertDateMask(n.to_dt);
			n.pickup_dt=utils.convertDateMask(n.pickup_dt);

		})
	})
	return items	
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'CHOOSE_PATIENT':
			return {...state, patient:action.res.data.data[0]}
		case 'ALERT_TO_SAVE':
			console.log('THISPROPSALERTED')
			return {...state, needToSave:true}
		case 'RESET_ALERT_TO_SAVE':
			console.log('THISPROPSRESET')
			return {...state, needToSave:false}
		case 'CREATE_PATIENT':
			return initialState
		case 'GET_PATIENT_VISIT_REGISTRY':
			return {...state, visitRegistry:convertItems(action.res.data.data)}
		default:
			return state
	}
}