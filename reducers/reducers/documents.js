const initialState = {
	docs:[],
	deleted_docs:[],
	currentDoc:0
};
const convertItems=(items)=> {
	let arr = []
	items.map(e=>arr.push(
		{	
			...e,
			value:e.doc_type_id, 
			label:e.doc_type_nm
		}))
	return arr
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_DOCS_LIST':
			return {...state, docs:convertItems(action.res.data.data)}
		case 'DELETE_DOC': {
			return {...state, deleted_cities:action.doc}
		}
		case 'SELECT_CURRENT_DOC':
			return {
				...state, 
				currentDoc:action.doc
			}
		default:
			return state
	}
}