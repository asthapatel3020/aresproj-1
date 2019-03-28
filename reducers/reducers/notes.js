const initialState = {
	notes:[],
	subjects:[],
	editNote:''
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			value:e.item_id, 
			label:`${e.item_code} (${e.type})`,
			sort_order:0,
			...e
		}))
	return arr
}
const convertSubjects=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{
			value:e.subject_id, 
			label:e.subject_description,
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_SUBJECTS_LIST':
			return {...state, subjects:convertSubjects(action.res.data.data)}
		case 'GET_TECHNICIAN_ITEMS_LIST':
			return {...state, techItems:action.res.data.data}
		case 'GET_NOTES_LIST':
			return {...state, notes:action.res.data.data.events}
		case 'EDIT_NOTE':
			return {...state, editNote:action.note}
		default:
			return state
	}
}