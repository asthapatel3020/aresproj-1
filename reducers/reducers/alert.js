const initialState = {
	openState:0,
	msg:''
};

export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'OPEN_ALERT':
			return {...state, openState:state.openState+1, msg:action.msg}
		default:
			return state
	}
}