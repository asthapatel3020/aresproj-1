const initialState = {
	codes:[],
	patient_diagnosis_codes:[]
};

export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_CODES_LIST':
			return {...state, codes:action.res.data.data}
		case 'LOAD_CODES':
			return {...state, patient_diagnosis_codes:action.codes}
		default:
			return state
	}
}