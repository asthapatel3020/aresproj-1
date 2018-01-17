const initialState = {
	cities:[]
};
const normaliseItems=(data)=> {

	let map = [];

	data.forEach((item, i)=> map[i]= item);
	// console.log("map", map)
	return map;
}
export default function cities(state = initialState, action) {
	switch (action.type) {
		case "GET_CITIES":
			// console.log("got countries", action.res.data);
			return Object.assign({}, state, {cities:normaliseItems(action.res.data.data)});
	default:
    	return state;
	}
}