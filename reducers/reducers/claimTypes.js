const initialState = {
	claims:[]
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{	
			...e,
			value:e.claim_type_cd, 
			label:e.claim_type_nm
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_CLAIMS_LIST':
			return {...state, claims:convertItems(action.res.data.data)}
		
		default:
			return state
	}
}