const initialState = {
	companies:[]
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			value:e.ic_id, 
			label:`${e.ic_name} (${e.ic_address}, ${e.ic_city})`,
			ic_id:e.ic_id
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_INS_COMPANIES':
			return {...state, companies:convertItems(action.res.data.data)}

		default:
			return state
	}
}