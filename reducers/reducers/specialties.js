const initialState = {
	specialties:[],
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push({value:e.specialty_cd, label:`${e.specialty_code} - ${e.specialty_nm}`, code:e.specialty_code}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_SPECIALTY_LIST':
			return {...state, specialties:convertItems(action.res.data.data)}
		default:
			return state
	}
}