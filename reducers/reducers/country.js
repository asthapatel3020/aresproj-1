const initialState = {
	countryName:'',
	phone:'',
	addSuccess:false,
	editSuccess:false,
	errors:[]
};
const normaliseItems=(data)=> {

	let map = [];

	data.forEach((item, i)=> map[i]= item);
	// console.log("map", map)
	return map;
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "CHOOSE_EDIT_COUNTRY":
		// return state;
			// console.log("got countries", action.res.data);
			return Object.assign({}, state, {countryName:action.countryName, phone:action.phone});
		case "ADD_COUNTRY":
			return {...initialState, addSuccess:true}
		case "ADD_COUNTRY_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "EDIT_COUNTRY":
			return {...initialState, editSuccess:true}
		case "EDIT_COUNTRY_FAILURE":
			return {...state, editSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "CLEAR":
			return initialState;
	default:
    	return state;
	}
}