const initialState = {
	company:''
};

export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_COMPANY_INFO':
			return {...state, company:action.res.data.data}

		default:
			return state
	}
}