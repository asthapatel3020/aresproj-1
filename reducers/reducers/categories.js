const initialState = {
	categories:[],
	subcategories:[]
};
const normaliseItems=(data)=> {

	let map = [];

	data.forEach((item, i)=> map[i]= item);
	// console.log("map", map)
	return map;
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_CATEGORIES":
			return Object.assign({}, state, {categories:normaliseItems(action.res.data.data)});
		case "GET_SUBCATEGORIES":
			// console.log("got countries", action.res.data);
			return Object.assign({}, state, {subcategories:normaliseItems(action.res.data.data)});
	default:
    	return state;
	}
}