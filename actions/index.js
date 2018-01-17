import request from 'axios';

const API_URL = 'http://iqlabs.kz/whirlpool/public/';


export const auth=(email, pass)=> {
	return {
		type : "USER_AUTH",
		promise: request.post(`${API_URL}api/login?username=${email}&password=${pass}`)

	}
}


export const getCountries=(token, id)=> {
	return {
		type : "GET_COUNTRIES",
		promise: request.get(`${API_URL}api/country/all?user_id=${id}&api_token=${token}`)
		
	}
}
export const addCountry=(token, id, name, phone)=> {
	return {
		type : "ADD_COUNTRY",
		promise: request.post(`${API_URL}api/country/add?name=${name}&phone=${phone}&user_id=${id}&api_token=${token}`)

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
		promise: request.post(`${API_URL}api/country/update/${countryId}?name=${name}&phone=${phone}&user_id=${id}&api_token=${token}`)

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
		promise: request.get(`${API_URL}api/city/all?country_id=${countryId}&user_id=${id}&api_token=${token}`)
	}
}
export const addCity=(token, id, countryId, name)=> {
	return {
		type : "ADD_CITY",
		promise: request.post(`${API_URL}api/city/add?name=${name}&country_id=${countryId}&user_id=${id}&api_token=${token}`)

	}
}
export const uploadMatrixProducts=(file, token, id, countryId)=> {
	const formData = new FormData();
	formData.append('file', file)
	return {
		type:"UPLOAD_MATRIX_PRODUCTS",
		promise: request.post(`${API_URL}api/product/import?country_id=${countryId}&user_id=${id}&api_token=${token}`,
		formData,{
		headers:{ 'Content-Type':'multipart/form-data'}
		})
	}
}
export const getUsers=(token, id)=> {
	return {
		type : "GET_USERS",
		promise: request.get(`${API_URL}api/user/all?user_id=${id}&api_token=${token}`)
	}
}
export const getRetailers=(token, id)=> {
	return {
		type : "GET_RETAILERS",
		promise: request.get(`${API_URL}api/retail/all?user_id=${id}&api_token=${token}`)
	}
}
export const addRetailer=(token, id, name)=> {
	return {
		type : "ADD_RETAILER",
		promise: request.post(`${API_URL}api/retail/add?name=${name}&&user_id=${id}&api_token=${token}`)
	}
}
export const editRetailer=(token, id, name, retailerId)=> {
	return {
		type : "EDIT_RETAILER",
		promise: request.post(`${API_URL}api/retail/update/${retailerId}?name=${name}&&user_id=${id}&api_token=${token}`)
	}
}
