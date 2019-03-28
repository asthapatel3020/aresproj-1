const initialState = {
	patients:[],
	pagination:'',
	patientsForSelect:[],
	patientsForLastName:[]
};

const convertItems=(items)=> {
	console.log('items',items)
	let arr = []
	items.map(e=>arr.push({...e, value:e.patient_id, label:`${e.patient_first_nm} ${e.patient_last_nm}`}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_PATIENTS_LIST':
			return {...state, patients:action.res.data.data.patients, pagination:action.res.data.data.pagination}
			// return {...state, patients:action.res.data.data}
		case 'GET_PATIENTS_FOR_SELECT':
			return {...state, patientsForSelect:convertItems(action.res.data.data)}
		case 'GET_PATIENTS_FOR_LASTNAME':
			return {...state, patientsForLastName:action.res.data.data.patients}
		case 'RESET_PATIENTS_FOR_LASTNAME':
			return {...state, patientsForLastName:[]}
		default:
			return state
	}
}
