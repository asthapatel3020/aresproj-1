const initialState = {
	cities:[],
	deleted_cities:[],
	currentCity:0
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{	
			...e,
			value:e.city_id, 
			label:e.city_name
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_CITIES_LIST':
			return {...state, cities:convertItems(action.res.data.data)}
		case 'DELETE_CITY': {
			return {...state, deleted_cities:action.city}
		}
		case 'SELECT_CURRENT_CITY':
			return {
				...state, 
				currentCity:action.city
			}
		default:
			return state
	}
}