const initialState = {
	items:[],
	itemForEdit:{ordering_price:0},
	techItems:[],
	techItemForEdit:{}
};
const convertItems=(items)=> {
	let arr = []
	console.log('items', items)
	items.map(e=>{
		
		arr.push(
		{
			value:e.item_id, 
			label:`${e.item_code} (${e.type})`,
			sort_order:0,
			...e
		})
	})
	return arr
}
const handleEditItem=(item)=> {
	if (item.item_id) {
		console.log('itemEdit', item)
		let custTypes = []
			item.customization_types&&item.customization_types.map(e=> {
			custTypes.push(parseInt(e.id))
		})
		return {...item, customization_types:custTypes}
	} else {
		return item
	}
	
}
export default function loading(state = initialState, action) {
	switch(action.type) {
		case 'GET_ITEMS_LIST':
			return {...state, items:convertItems(action.res.data.data)}
		case 'GET_TECHNICIAN_ITEMS_LIST':
			return {...state, techItems:action.res.data.data}
		case 'SET_ITEM_FOR_EDIT':
			return {...state, itemForEdit:handleEditItem(action.itemForEdit)}
		case 'SET_TECH_ITEM_FOR_EDIT':
			return {...state, techItemForEdit:action.itemForEdit}
		default:
			return state
	}
}