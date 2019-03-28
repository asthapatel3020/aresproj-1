const initialState = {
	attornies:[],
	currentAttorney:''
}

const handleItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{	
			...e,
			value:e.lw_id, 
			label:`${e.lw_office_name}(${e.lw_address})`
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_ATTORNIES':
			return {...state, attornies:handleItems(action.res.data.data)}
		case 'SELECT_ATTORNEY':
			return {...state, currentAttorney:action.attorney}
		case 'UPDATE_ATTORNEY_SUCCESS':
			console.log("SUCCESS")
			return state
		default:
			return state
	}
}