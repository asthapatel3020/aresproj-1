const initialState = {
	offices:[],
	currentOffice:''
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			...e,
			value:e.office_id, 
			label:`${e.office_name}(${e.office_address})`,
			fullAddress:`${e.office_address}, ${e.office_city}`
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_OFFICES':
			return {...state, offices:convertItems(action.res.data.data)}
		case 'SELECT_CURRENT_OFFICE':
			return {...state, currentOffice:state.office}
		default:
			return state
	}
}