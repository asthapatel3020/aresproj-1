const initialState = {
	brands:[],
};
const normaliseItems=(data)=> {

	let map = [];

	data.forEach((item, i)=> map[i]= item);
	// console.log("map", map)
	return map;
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_BRANDS":
			return Object.assign({}, state, {brands:normaliseItems(action.res.data.data)});
	default:
    	return state;
	}
}