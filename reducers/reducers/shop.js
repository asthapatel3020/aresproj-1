const initialState = {
	addSuccess:false,
	editSuccess:false,
	deleteSuccess:false,
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
		case "ADD_SHOP":
			return {...initialState, addSuccess:true}
		case "ADD_SHOP_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "EDIT_SHOP":
			return {...initialState, editSuccess:true}
		case "EDIT_SHOP_FAILURE":
			return {...state, editSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "DELETE_SHOP":
			return {...initialState, deleteSuccess:true}
		case "DELETE_SHOP_FAILURE":
			return {...state, deleteSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "CLEAR":
			return initialState;
	default:
    	return state;
	}
}