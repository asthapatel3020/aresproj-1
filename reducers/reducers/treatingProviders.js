const initialState = {
	providers:[]
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			value:e.doctor_id, 
			label:`${e.doctor_first_nm} ${e.doctor_last_nm}(${e.office_address}, ${e.office_city})`,
			firstName:e.doctor_first_nm,
			lastName:e.doctor_last_nm,
			officeName:e.office_name,
			fullName:`${e.doctor_last_nm}, ${e.doctor_first_nm}`,
			fullProvider:`${e.office_name}(${e.office_address}, ${e.office_city})`,
			officeAddress:e.office_address,
			doctor_id:e.doctor_id,
			doctor_city:e.office_city,
			doctor_state:e.office_state
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_PROVIDER_LIST':
			return {...state, providers:convertItems(action.res.data.data)}

		default:
			return state
	}
}