const initialState = {
	question:[],
	setQuestion:''
};

export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_QUESTION_STATS":
			return {...state, question:action.res.data.data}
		case "SET_QUESTION":
			return {...state, setQuestion:action.question}
	default:
    	return state;
	}
}