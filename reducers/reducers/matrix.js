const initialState = {
	addSuccess:false,
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
		case "UPLOAD_MATRIX_COMPETITORS":
			return {...initialState, addSuccess:true}
		case "UPLOAD_MATRIX_COMPETITORS_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "UPLOAD_MATRIX_PRODUCTS":
			return {...initialState, addSuccess:true}
		case "UPLOAD_MATRIX_PRODUCTS_FAILURE":
			return {...state, addSuccess:false, errors:normaliseItems(action.error.data.errors)}
		case "CLEAR":
			return initialState;
	default:
    	return state;
	}
}