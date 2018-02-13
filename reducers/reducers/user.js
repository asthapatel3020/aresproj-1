const initialState = {
	addSuccess:false,
	editSuccess:false,
	deleteSuccess:false,
	user:'',
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
		case "SET_EDIT_USER": 
			return {...state, user:action.user}
		case "ADD_USER":
			return {...initialState, addSuccess:true}
		case "ADD_USER_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "EDIT_USER":
			return {...initialState, editSuccess:true}
		case "EDIT_USER_FAILURE":
			return {...state, editSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "DELETE_USER":
			return {...initialState, deleteSuccess:true}
		case "DELETE_USER_FAILURE":
			return {...state, deleteSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "CLEAR":
			return initialState;
	default:
    	return state;
	}
}