const initialState = {
	countries:[]
};
const normaliseItems=(data)=> {

	let map = [];

	data.forEach((item, i)=> map[i]= item);
	// console.log("map", map)
	return map;
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_COUNTRIES":
			// console.log("got countries", action.res.data);
			return Object.assign({}, state, {countries:normaliseItems(action.res.data.data)});
	default:
    	return state;
	}
}