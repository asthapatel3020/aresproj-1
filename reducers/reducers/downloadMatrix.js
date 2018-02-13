const initialState = {
	path:'',
	errorsC:[],
	errorsQ:[],
	errorsP:[]
};
export default function app(state = initialState, action) {
	switch (action.type) {
		case "DOWNLOAD_COMMENTS":
			return {...state, path:action.res.data.data.url, errorsC:action.error?action.error.data.errors:''}
		case "DOWNLOAD_QUESTIONS":
			return {...state, path:action.res.data.data.url, errorsQ:action.error?action.error.data.errors:''}
		case "DOWNLOAD_PRODUCTS":
			return {...state, path:action.res.data.data.url, errorsP:action.error?action.error.data.errors:''}
		
	default:
    	return state;
	}
}