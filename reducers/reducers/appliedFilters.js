const initialState = {
		from:'', 
		to:'', 
		countryId:'',
		cityId:'',
		retailerId:'',
		shopId:'',
		catId:'',
		subCatId:'',
		userId:'',
		brandId:'',
		periodType:'',
		modelId:'',
		triggered:0
	}
const checkFilter=(filter, type, state)=> {
	return true
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "APPLY_FILTER":

			return {
				...state, 
				from:action.filters.from=='clear'?'':action.filters.from?action.filters.from:state.from,
				to:action.filters.to=='clear'?'':action.filters.to?action.filters.to:state.to,
				countryId:action.filters.countryId=='clear'?'':action.filters.countryId?action.filters.countryId:state.countryId,
				cityId:action.filters.cityId=='clear'?'':action.filters.cityId?action.filters.cityId:state.cityId,
				retailerId:action.filters.retailerId=='clear'?'':action.filters.retailerId?action.filters.retailerId:state.retailerId,
				shopId:action.filters.shopId=='clear'?'':action.filters.shopId?action.filters.shopId:state.shopId,
				catId:action.filters.catId=='clear'?'':action.filters.catId?action.filters.catId:state.catId,
				subCatId:action.filters.subCatId=='clear'?'':action.filters.subCatId?action.filters.subCatId:state.subCatId,
				userId:action.filters.userId=='clear'?'':action.filters.userId?action.filters.userId:state.userId,
				brandId:action.filters.brandId=='clear'?'':action.filters.brandId?action.filters.brandId:state.brandId,
				periodType:action.filters.periodType=='clear'?'':action.filters.periodType?action.filters.periodType:state.periodType,
				modelId:action.filters.modelId=='clear'?'':action.filters.modelId?action.filters.modelId:state.modelId,
				triggered:state.triggered+1
				
			}
		default:
			return state
	}
}