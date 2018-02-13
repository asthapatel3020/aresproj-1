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
		modelId:''
	}
const checkFilter=(filter, type, state)=> {
	return true
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "ADD_FILTER":
			switch(action.filterType) {
				case "period":

					return {...state, to:action.filter.to, from:action.filter.from, periodType:action.periodType}
				case "country":
					return {...state, countryId:action.filter}
				case "city":
					return {...state, cityId:action.filter}
				case "retailer":
					return {...state, retailerId:action.filter}
				case "shop":
					return {...state, shopId:action.filter}
				case "category":
					return {...state, catId:action.filter}
				case "subcategory":
					return {...state, subCatId:action.filter}
				case "user":
					return {...state, userId:action.filter}
				case "brand":
					return {...state, brandId:action.filter}
				case "model":
					return {...state, modelId:action.filter}
				default:
					return state
			}
		case "ADD_FILTER_FULFILLED":
			return initialState;

	default:
    	return state;
	}
}