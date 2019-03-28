const initialState = {
	insurances:[]
};

export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_INSURANCES':
			return {...state, insurances:action.res.data.data}

		default:
			return state
	}
}