const initialState = {
	path:''
};
export default function app(state = initialState, action) {
	switch (action.type) {
		case "ZOOM_PHOTO":
			return {...state, path:action.path}
		
	default:
    	return state;
	}
}