
const initialState = {
	modal:0,
	report:{procedures:[], pagination:'', billing_history:[], patients:[]},
	params:''
	
};
const handleItems=(data)=> {
	let finalArr = []

	const result = Object.values(data.procedures.reduce((acc, x) => {
	  acc[x.office_name] = [...(acc[x.office_name] || []), x ];
	  return acc;
	}, {}));
	console.log('result', result)
	return {procedures:result, pagination:data.pagination}
}
const handleArbitrationItems=(data)=> {
	let finalArr = []

	const result = Object.values(data.procedures.reduce((acc, x) => {
	  acc[x.lw_last_name] = [...(acc[x.lw_last_name] || []), x ];
	  return acc;
	}, {}));
	console.log('resultARBITR', result)
	return {procedures:result, pagination:data.pagination}
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'OPEN_REPORTS_MODAL':
			return {...state, modal:action.modal}
		case 'GET_REPORT':
			return {...state, report:action.res.data.data, params:action.params}
		case 'GET_REPORT_BILLING_BY_PROVIDER':
			return {...state, report:handleItems(action.res.data.data), params:action.params}
		case 'GET_REPORT_ARBITRATION_BY_PROVIDER':
			return {...state, report:handleArbitrationItems(action.res.data.data), params:action.params}
		default:
			return state
	}
}