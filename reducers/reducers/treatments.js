const initialState = {
	treatments:[]
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			value:e.pc_id, 
			label:`${e.pc_code} ${e.pc_code_description}`,
			...e
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_TREATMENTS_LIST':
			return {...state, treatments:convertItems(action.res.data.data)}

		default:
			return state
	}
}