const initialState = {
	users:[],
	meta:''
};
const normaliseItems=(data)=> {

	let map = [];

	data.forEach((item, i)=> map[i]= item);
	// console.log("map", map)
	return map;
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_USERS":
			// console.log("got countries", action.res.data);
			return Object.assign({}, state, {users:normaliseItems(action.res.data.data.users), meta:action.res.data.data.meta});
	default:
    	return state;
	}
}