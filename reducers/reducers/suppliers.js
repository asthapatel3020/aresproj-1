const initialState = {
	suppliers:[],
	lines:[]
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			value:e.supplier_company_id, 
			label:e.supplier_company_name,
		}))
	return arr
}
const convertLines=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			...e,
			value:e.supplier_company_line_id, 
			label:e.supplier_company_line_name,
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_SUPPLIERS':
			return {...state, suppliers:convertItems(action.res.data.data)}
		case 'GET_LINES':
			return {...state, lines:convertLines(action.res.data.data)}
		default:
			return state
	}
}