import request from 'axios';

export const API_URL = 'http://iqlabs.kz/whirlpool/public/';
// const API_URL = 'https://api.whirlpool-kz.net/';


export const auth=(email, pass)=> {
	return {
		type : "USER_AUTH",
		promise: request.post(`${API_URL}login?username=${email}&password=${pass}`)

	}
}


export const getCountries=(token, id)=> {
	return {
		type : "GET_COUNTRIES",
		promise: request.get(`${API_URL}country/all?uid=${id}&api_token=${token}`)
		
	}
}
export const addCountry=(token, id, name, phone)=> {
	return {
		type : "ADD_COUNTRY",
		promise: request.post(`${API_URL}country/add?name=${name}&phone=${phone}&uid=${id}&api_token=${token}`)

	}
}

export const chooseEditCountry=(name, phone)=> {
	return {
		type : "CHOOSE_EDIT_COUNTRY",
		countryName:name,
		phone:phone
	}
}
export const editCountry=(token, id, name, phone, countryId)=> {
	return {
		type : "EDIT_COUNTRY",
		promise: request.post(`${API_URL}country/update/${countryId}?name=${name}&phone=${phone}&uid=${id}&api_token=${token}`)

	}
}
export const logout=()=> {
	return {
		type : "USER_LOGOUT"
	}
}

export const isAuthenticated=()=> {
	return {
		type : "IS_AUTHENTICATED"
	}
}

export const getCities=(token, id, countryId)=> {
	return {
		type : "GET_CITIES",
		promise: request.get(`${API_URL}city/all?country_id=${countryId}&uid=${id}&api_token=${token}`)
	}
}
export const addCity=(token, id, countryId, name)=> {
	return {
		type : "ADD_CITY",
		promise: request.post(`${API_URL}city/add?name=${name}&country_id=${countryId}&uid=${id}&api_token=${token}`)

	}
}
export const editCity=(token, id, countryId, name, cityId)=> {
	return {
		type : "EDIT_CITY",
		promise: request.post(`${API_URL}city/update/${cityId}?name=${name}&country_id=${countryId}&uid=${id}&api_token=${token}`)

	}
}
export const uploadMatrixProducts=(file, token, id, countryId)=> {
	const formData = new FormData();
	formData.append('file', file)
	return {
		type:"UPLOAD_MATRIX_PRODUCTS",
		promise: request.post(`${API_URL}product/import?country_id=${countryId}&uid=${id}&api_token=${token}`,
		formData,{
		headers:{ 'Content-Type':'multipart/form-data'}
		})
	}
}

export const uploadMatrixCompetitors=(file, token, id, countryId)=> {
	const formData = new FormData();
	formData.append('file', file)
	return {
		type:"UPLOAD_MATRIX_COMPETITORS",
		promise: request.post(`${API_URL}competitor/import?uid=${id}&api_token=${token}&country_id=${countryId}`,
		formData,{
		headers:{ 'Content-Type':'multipart/form-data'}
		})
	}
}
export const getUsers=(token, id, page)=> {
	let isPage = page?`&page=${page}`:''
	return {
		type : "GET_USERS",
		promise: request.get(`${API_URL}user/all?uid=${id}&api_token=${token}`)
	}
}
export const getRetailers=(token, id, page)=> {
	let isPage = page?`&page=${page}`:''
	return {
		type : "GET_RETAILERS",
		promise: request.get(`${API_URL}retail/all?uid=${id}&api_token=${token}`+isPage)
	}
}
export const addRetailer=(token, id, name)=> {
	return {
		type : "ADD_RETAILER",
		promise: request.post(`${API_URL}retail/add?name=${name}&uid=${id}&api_token=${token}`)
	}
}
export const editRetailer=(token, id, name, retailerId)=> {
	return {
		type : "EDIT_RETAILER",
		promise: request.post(`${API_URL}retail/update/${retailerId}?name=${name}&uid=${id}&api_token=${token}`)
	}
}
export const getShops=(token, id, page, retailerId)=> {
	let isPage = page?`&page=${page}`:''
	let string = retailerId?`&retail_id=${retailerId}`:''
	return {
		type : "GET_SHOPS",
		promise: request.get(`${API_URL}shop/all?uid=${id}&api_token=${token}`+string+isPage)
	}
}
export const getCategories=(token, id)=> {
	return {
		type : "GET_CATEGORIES",
		promise: request.get(`${API_URL}category/all?uid=${id}&api_token=${token}`)
	}
}
export const getSubCategories=(token, id, catId)=> {
	return {
		type : "GET_SUBCATEGORIES",
		promise: request.get(`${API_URL}category/all?parent=${catId}&uid=${id}&api_token=${token}`)
	}
}
export const getQuestionsWh=(token, id, subCatId)=> {
	return {
		type : "GET_QUESTIONSWH",
		promise: request.get(`${API_URL}question/all/subcategory?uid=${id}&api_token=${token}`)
	}
}
export const getCheckedQuestionsWh=(token, id, subCatId, catId)=> {
	const subCat = subCatId!==''?`&subcategory_id=${subCatId}`:'';
	const Cat = catId!==''?`&category_id=${catId}`:'';

	return {
		type : "GET_CHECKED_QUESTIONSWH",
		promise: request.get(`${API_URL}question/all/subcategory?uid=${id}&api_token=${token}`+subCat+Cat)
	}
}

export const getQuestionsOther=(token, id)=> {
	return {
		type : "GET_QUESTIONS_OTHER",
		promise: request.get(`${API_URL}question/all/brand?uid=${id}&api_token=${token}`)
	}
}
export const getCheckedQuestionsOther=(token, id, brandId, catId, subCatId)=> {
	const brand = brandId!==''?`&brand_id=${brandId}`:'';
	const cat = catId!==''?`&category_id=${catId}`:'';
	const subCat = subCatId!==''?`&subcategory_id=${subCatId}`:'';

	return {
		type : "GET_CHECKED_QUESTIONS_OTHER",
		promise: request.get(`${API_URL}question/all/brand?uid=${id}&api_token=${token}`+brand+cat+subCat)
	}
}
export const getBrands=(token, id)=> {
	return {
		type : "GET_BRANDS",
		promise: request.get(`${API_URL}brand/all?uid=${id}&api_token=${token}&own=0`)
	}
}
export const createQuestionWh=(question, answers)=> {
	return {
		type : "CREATE_QUESTIONWH",
		question:question,
		answers:answers
		
	}
}
export const createQuestionOther=(question, answers)=> {
	return {
		type : "CREATE_QUESTION_OTHER",
		question:question,
		answers:answers
		
	}
}
export const setEditQuestionWh=(question)=> {
	return {
		type : "SET_EDIT_QUESTIONWH",
		question:question
		
	}
}
export const deleteLocalQuestionWh=(question)=> {
	return {
		type : "DELETE_LOCAL_QUESTION_WH",
		question:question
		
	}
}
export const editLocalQuestionWh=(question)=> {
	return {
		type : "EDIT_LOCAL_QUESTION_WH",
		question:question
		
	}
}
export const deleteLocalQuestionOther=(question)=> {
	return {
		type : "DELETE_LOCAL_QUESTION_OTHER",
		question:question
		
	}
}
export const setEditQuestionOther=(question)=> {
	return {
		type : "SET_EDIT_QUESTIONOTHER",
		question:question
		
	}
}
export const editLocalQuestionOther=(question)=> {
	return {
		type : "EDIT_LOCAL_QUESTION_OTHER",
		question:question
		
	}
}
export const editQuestion=(token, id, question, options, questionId)=> {
	return {
		type : "EDIT_QUESTION",
		promise: request.post(`${API_URL}question/update/${questionId}?question=${question}&options=${options}&uid=${id}&api_token=${token}`)
	}
}
export const deleteQuestion=(token, id, questionId)=> {
	return {
		type : "DELETE_QUESTION",
		promise: request.post(`${API_URL}question/delete/${questionId}?uid=${id}&api_token=${token}`)
	}
}
export const addQuestionCategory=(token, id, questions, catId, subCatId)=> {
	return {
		type : "ADD_QUESTIONCAT",
		promise: request.post(`${API_URL}question/add/subcategory?questions=${JSON.stringify(questions)}&category_id=${catId}&subcategory_id=${subCatId}&uid=${id}&api_token=${token}`)
	}
}
export const addUser=(token, id, username, password, access, country_id, shops)=> {
	let isShops = shops.length>0?`&shops=${shops.toString()}`:''
	return {
		type : "ADD_USER",
		promise: request.post(`${API_URL}user/add?username=${username}&password=${password}&access=${access}&country_id=${country_id}&uid=${id}&api_token=${token}`+isShops)
	}
}
export const editUser=(token, id, userId, username, password, access, country_id, shops)=> {
	console.log("usq", shops)
	let isShops = shops.length>0?`&shops=${shops.toString()}`:''
	return {
		type : "EDIT_USER",
		promise: request.post(`${API_URL}user/update/${userId}?username=${username}&password=${password}&access=${access}&country_id=${country_id}&uid=${id}&api_token=${token}`+isShops)
	}
}
export const deleteUser=(token, id, userId)=> {
	return {
		type : "DELETE_USER",
		promise: request.post(`${API_URL}user/delete/${userId}?uid=${id}&api_token=${token}`)
	}
}
export const deleteRetailer=(token, id, retailerId)=> {
	return {
		type : "DELETE_RETAILER",
		promise: request.post(`${API_URL}retail/delete/${retailerId}?uid=${id}&api_token=${token}`)
	}
}
export const addQuestionBrand=(token, id, questions, catId, subCatId, brandId)=> {
	return {
		type : "ADD_QUESTIONBRAND",
		promise: request.post(`${API_URL}question/add/brand?questions=${JSON.stringify(questions)}&category_id=${catId}&subcategory_id=${subCatId}&brand_id=${brandId}&uid=${id}&api_token=${token}`)
	}
}
export const addShop=(token, id, shopName, address, latitude, longitude, countryId, cityId, retailId)=> {
	return {
		type : "ADD_SHOP",
		promise: request.post(`${API_URL}shop/add?name=${shopName}&address=${address}&latitude=${latitude}&longitude=${longitude}&country_id=${countryId}&city_id=${cityId}&retail_id=${retailId}&uid=${id}&api_token=${token}`)
	}
}
export const setUserEdit=(user)=> {
	return {
		type : "SET_EDIT_USER",
		user:user
		
	}
}
export const editShop=(token, id, shopName, address, latitude, longitude, countryId, cityId, retailId, shopId)=> {
	return {
		type : "EDIT_SHOP",
		promise: request.post(`${API_URL}shop/update/${shopId}?name=${shopName}&address=${address}&latitude=${latitude}&longitude=${longitude}&country_id=${countryId}&city_id=${cityId}&retail_id=${retailId}&uid=${id}&api_token=${token}`)
	}
}
export const deleteShop=(token, id, shopId)=> {
	return {
		type : "DELETE_SHOP",
		promise: request.post(`${API_URL}shop/delete/${shopId}?uid=${id}&api_token=${token}`)
	}
}

export const clearState=()=> {
	return {type:"CLEAR"}
}
export const addFilter=(filter, filterType, periodType)=> {

	return {type:"ADD_FILTER", filter:filter, filterType:filterType, periodType:periodType}
}
export const applyFilter=(filters)=> {
	return {
		type : "APPLY_FILTER", filters:filters
	}
}

export const checkFilters=(filters)=> {
	let finalQuery = '';
	let period = filters.from&&filters.to?`&from=${filters.from}&to=${filters.to}`:'';
	let country = filters.countryId?`&country_id=${filters.countryId}`:'';
	let city = filters.cityId?`&city_id=${filters.cityId}`:'';
	let retailer = filters.retailerId?`&retail_id=${filters.retailerId}`:'';
	let shop = filters.shopId?`&shop_id=${filters.shopId}`:'';
	let category = filters.categoryId?`&category_id=${filters.catId}`:'';
	let subcategory = filters.subcategoryId?`&subcategory_id=${filters.subCatId}`:'';
	let brand = filters.brandId?`&brand_id=${filters.brandId}`:'';
	let model = filters.modelId?`&model_id=${filters.modelId}`:'';
	let user = filters.userId?`&user_id=${filters.userId}`:'';
	
	finalQuery= period+country+city+retailer+shop+category+subcategory+brand+model+user;
	return finalQuery;

	
}
export const downloadCommentsGoogle=(token, id, commentsType, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "DOWNLOAD_COMMENTS",
		promise: request.get(`${API_URL}comment/${commentsType}/export?uid=${id}&api_token=${token}&google=1`+filterQuery)
	}
}
export const downloadQuestionsGoogle=(token, id, commentsType, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "DOWNLOAD_QUESTIONS",
		promise: request.get(`${API_URL}question/export/${commentsType}?uid=${id}&api_token=${token}&google=1`+filterQuery)
	}
}
export const downloadProductsGoogle=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "DOWNLOAD_PRODUCTS",
		promise: request.get(`${API_URL}product/export?uid=${id}&api_token=${token}&google=1`+filterQuery)
	}
}


export const getDolya=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	console.log("dolya", filters)
	let isyear = filters.periodType=='days7'||filters.periodType=='days30'||filters.periodType=='period'?'0':'1'
	return {
		type : "GET_DOLYA_GRAPHIC",
		promise: request.get(`${API_URL}stats/share/trend?is_year=${isyear}&uid=${id}&api_token=${token}`+filterQuery),
		filters:filters
	}
}
export const getDolyaPie=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_DOLYA_PIECHART",
		promise: request.get(`${API_URL}stats/share/piechart?uid=${id}&api_token=${token}`+filterQuery )
	}
}
export const getDolyaRetailStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	
	return {
		type : "GET_DOLYA_RETAIL_STATS",
		promise: request.get(`${API_URL}stats/share/retails?uid=${id}&api_token=${token}`+filterQuery )
	}
}
export const getDolyaCategoryStats=(token, id, filters)=> {

	let filterQuery = checkFilters(filters);
	return {
		type : "GET_DOLYA_CAT_STATS",
		promise: request.get(`${API_URL}stats/share/categories?uid=${id}&api_token=${token}`+filterQuery )
	}
}
export const getCommentsSubCat=(token, id, filters, page)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_COMMENTS_SUBCAT",
		promise: request.get(`${API_URL}comment/subcategory/all?uid=${id}&api_token=${token}&page=${page}`+filterQuery )
	}
}
export const getCommentsBrand=(token, id, filters, page)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_COMMENTS_BRAND",
		promise: request.get(`${API_URL}comment/brand/all?uid=${id}&api_token=${token}&page=${page}`+filterQuery )
	}
}

export const getCommentsProduct=(token, id, filters, page)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_COMMENTS_PRODUCT",
		promise: request.get(`${API_URL}comment/product/all?uid=${id}&api_token=${token}&page=${page}`+filterQuery )
	}
}
export const zoomPhoto=(path)=> {
	return {
		type: "ZOOM_PHOTO",
		path:path
	}
}
export const getAuditsLineChart=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	let isyear = filters.periodType=='days7'||filters.periodType=='days30'||filters.periodType=='period'?'0':'1'
	return {
		type : "GET_AUDITS_GRAPHIC",
		promise: request.get(`${API_URL}stats/audit/trend?is_year=${isyear}&uid=${id}&api_token=${token}`+filterQuery),
		filters:filters
	}
}
export const getAuditsRetailStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_AUDITS_RETAIL_STATS",
		promise: request.get(`${API_URL}stats/audit/retails?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getAuditsUserStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_AUDITS_USER_STATS",
		promise: request.get(`${API_URL}stats/audit/users?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getAllStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_ALL_STATS",
		promise: request.get(`${API_URL}stats/summary?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getPricesLineChart=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	let isyear = filters.periodType=='days7'||filters.periodType=='days30'||filters.periodType=='period'?'0':'1'
	return {
		type : "GET_PRICES_GRAPHIC",
		promise: request.get(`${API_URL}stats/price/trend?is_year=${isyear}&uid=${id}&api_token=${token}`+filterQuery),
		filters:filters
	}
}
export const getPricesRetailStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_PRICES_RETAIL_STATS",
		promise: request.get(`${API_URL}stats/price/retails?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getPricesCategoryStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_PRICES_CATEGORY_STATS",
		promise: request.get(`${API_URL}stats/price/categories?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getPricesProductStats=(token, id, filters, page)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_PRICES_PRODUCT_STATS",
		promise: request.get(`${API_URL}stats/price/products?uid=${id}&api_token=${token}&page=${page}`+filterQuery)
	}
}
// amount
export const getAmountLineChart=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	let isyear = filters.periodType=='days7'||filters.periodType=='days30'||filters.periodType=='period'?'0':'1'
	return {
		type : "GET_AMOUNT_GRAPHIC",
		promise: request.get(`${API_URL}stats/amount/trend?is_year=${isyear}&uid=${id}&api_token=${token}`+filterQuery),
		filters:filters
	}
}
export const getAmountRetailStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_AMOUNT_RETAIL_STATS",
		promise: request.get(`${API_URL}stats/amount/retails?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getAmountCategoryStats=(token, id, filters)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_AMOUNT_CATEGORY_STATS",
		promise: request.get(`${API_URL}stats/amount/categories?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const getAmountProductStats=(token, id, filters, page)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_AMOUNT_PRODUCT_STATS",
		promise: request.get(`${API_URL}stats/amount/products?uid=${id}&api_token=${token}&page=${page}`+filterQuery)
	}
}
export const getQuestionStats=(token, id, filters, qid)=> {
	console.log("FILT", filters)
	let filterQuery = checkFilters(filters);
	return {
		type : "GET_QUESTION_STATS",
		promise: request.get(`${API_URL}question/info/${qid}?uid=${id}&api_token=${token}`+filterQuery)
	}
}
export const searchComments=(token, id, filters, page, search, sType)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : `SEARCH_COMMENTS_${sType.toUpperCase()}`,
		promise: request.get(`${API_URL}comment/${sType}/search?uid=${id}&api_token=${token}&page=${page}&search=${search}`+filterQuery)
	}
}
export const setQuestion=(question)=> {
	return {
		type:'SET_QUESTION',
		question:question
	}
}

export const getAuditHistory=(token, id, filters, page)=> {
	let filterQuery = checkFilters(filters);
	return {
		type : `GET_AUDIT_HISTORY`,
		promise: request.get(`${API_URL}audit/history?uid=${id}&api_token=${token}&page=${page}`+filterQuery)
	}
}
