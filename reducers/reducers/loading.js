const initialState = {
	loading:false
};

export default function loading(state = initialState, action) {
	if (action.type.match("_REQUEST")) {
			return {...state, loading:true}
	}
	else if (action.type.match("_SUCCESS")|| action.type.match("_FAILURE")) {
		return {...state, loading:false}
	}
	else return state;
}