
const initialState = {
	statuses:[],
	deleted_statuses:[],
	currentStatus:0
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{	
			...e,
			value:e.bill_status_id, 
			label:e.bill_status_nm
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_BILL_STATUS_LIST':
			return {...state, statuses:convertItems(action.res.data.data)}
		case 'DELETE_STATUS': {
			return {...state, deleted_statuses:action.status}
		}
		case 'SELECT_CURRENT_STATUS':
			return {
				...state, 
				currentStatus:action.status
			}
		default:
			return state
	}
}