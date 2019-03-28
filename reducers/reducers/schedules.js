const initialState = {
	schedules:[]
};

export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_SCHEDULES_LIST':
			return {...state, schedules:action.res.data.data}

		default:
			return state
	}
}