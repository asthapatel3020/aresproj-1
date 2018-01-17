const initialState = {
	cityName:'',
	countryId:'',
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
			return Object.assign({}, state, {countryName:action.countryName, phone:action.phone});
		case "ADD_CITY":
			return {...initialState, addSuccess:true}
		case "ADD_CITY_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "EDIT_CITY":
			return {...initialState, editSuccess:true}
		case "EDIT_EDIT_FAILURE":
			return {...state, editSuccess:false, errors:normaliseItems(action.error.data.errors)}
	default:
    	return state;
	}
}