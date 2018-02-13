const initialState = {
	commentsSubCat:[],
	commentsBrand:[],
	commentsProduct:[],
	metaSubCat:'',
	metaBrand:'',
	metaProduct:''
};
export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_COMMENTS_SUBCAT":
			return Object.assign({}, state, {commentsSubCat:action.res.data.data.comments, metaSubCat: action.res.data.data.meta});
		case "GET_COMMENTS_BRAND":
			return Object.assign({}, state, {commentsBrand:action.res.data.data.comments, metaBrand: action.res.data.data.meta});
		case "GET_COMMENTS_PRODUCT":
			return Object.assign({}, state, {commentsProduct:action.res.data.data.comments, metaProduct: action.res.data.data.meta});
		case "SEARCH_COMMENTS_PRODUCT":
			return Object.assign({}, state, {commentsProduct:action.res.data.data.comments, metaProduct: action.res.data.data.meta});
		case "SEARCH_COMMENTS_BRAND":
			return Object.assign({}, state, {commentsBrand:action.res.data.data.comments, metaBrand: action.res.data.data.meta});
		case "SEARCH_COMMENTS_SUBCATEGORY":
		console.log("ewew")
			return Object.assign({}, state, {commentsSubCat:action.res.data.data.comments, metaSubCat: action.res.data.data.meta});
	default:
    	return state;
	}
}