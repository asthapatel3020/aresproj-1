const initialState = {
	retailerName:'',
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
		case "ADD_RETAILER":
			return {...initialState, addSuccess:true}
		case "ADD_RETAILER_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "EDIT_RETAILER":
			return {...initialState, editSuccess:true}
		case "EDIT_RETAILER_FAILURE":
			return {...state, editSuccess:false, errors:normaliseItems(action.error.data.errors)}
	default:
    	return state;
	}
}