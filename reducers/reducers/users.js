const initialState = {
	users:[],
};
const convertItems=(users)=> {
	let arr = []
	users.map(e=>arr.push(
		{
			value:e.user_id, 
			label:`${e.first_name} ${e.last_name}`,
			sort_order:0,
			...e
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_USERS_LIST':
			return {...state, users:convertItems(action.res.data.data)}
		default:
			return state
	}
}