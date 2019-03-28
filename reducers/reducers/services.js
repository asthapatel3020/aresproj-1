const initialState = {
	services:[],
	currentService:'',
	deletedServices:[]
};

const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push({value:e.visit_type_id, label:e.visit_type_nm, fullName:`${e.visit_type_id} ${e.visit_type_nm}`}))
	return arr
}

export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_SERVICE_LIST':
			return {...state, services:convertItems(action.res.data.data)}
		case 'DELETE_SERVICE':
			return {...state, deletedServices:action.services}	
	
		case 'SELECT_CURRENT_SERVICE':
			return {...state, currentService:action.service}
		default:
			return state
	}
}