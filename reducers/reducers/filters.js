const initialState = {
	firstName:'',
	lastName:'',
	DOB:'',
	DOA:'',
	phone:'',
	patientId:'',
	DOBValue:'',
	DOAValue:'',
	claimNum:'',
	policyNum:'',
	claim_type_cd:'',
	insurance:''
};

const convertDate=(e)=> {
	let date = new Date(e)
	return date/1000
	
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'SET_FILTER_FIRSTNAME':
			return {...state, firstName:action.item}
		case 'SET_FILTER_LASTNAME':
			return {...state, lastName:action.item}
		case 'SET_FILTER_CLAIM_TYPE_CD':
			return {...state, claim_type_cd:action.item}
		case 'SET_FILTER_INSURANCE':
			return {...state, insurance:action.item}
		case 'SET_FILTER_CLAIMNUM':
			return {...state, claimNum:action.item}
		case 'SET_FILTER_POLICYNUM':
			return {...state, policyNum:action.item}
		case 'SET_FILTER_DOB':
			return {...state, DOB:convertDate(action.item), DOBValue:action.item}
		case 'SET_FILTER_DOA':
			return {...state, DOA:convertDate(action.item),DOAValue:action.item}
		case 'SET_FILTER_PHONE':
			return {...state, phone:action.item}
		case 'SET_FILTER_PATIENTID':
			return {...state, patientId:action.item}
		

		default:
			return state
	}
}