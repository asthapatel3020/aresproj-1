const initialState = {
	addSuccess:false,
	editSuccess:false,
	question:'',
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
		case "ADD_QUESTIONCAT":
			return {...initialState, addSuccess:true}
		case "ADD_QUESTIONCAT_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "SET_EDIT_QUESTIONWH":
			return {...state, question:action.question}
		case "EDIT_QUESTION":
			return {...initialState, editSuccess:true}
		case "DELETE_QUESTION":
			return {...initialState, editSuccess:true}
		// case "EDIT_RETAILER_FAILURE":
		// 	return {...state, editSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "CLEAR":
			return initialState;
	default:
    	return state;
	}
}