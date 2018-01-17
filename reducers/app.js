/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule app
 */

import Cookies from 'cookies-js';
import Config from '../config';

// import {
//   USER_AUTH, USER_AUTH_REQUEST, USER_IS_AUTHENTICATED, USER_LOGOUT
// } from '../actions';

const initialState = {
	loggedIn:false,
	id:'',
	token:'',
	userAccess:'',
	fullname:'',
	country:{}
};

function setCookie(expires_in, token, id, access, fullname, country) {
	var cookie_expiration_date = Date.now() + expires_in;
	console.log
	console.log("date expire", cookie_expiration_date)
	Cookies.set("auth", JSON.stringify({	
			token:token, 
			userId:id, 
			userAccess:access,
			fullname: fullname,
			userCountry:country }), 
	{ expires: 86400 });
}

function checkCookie() {
	// let map =
	// let data = Cookies.get();
	// data.forEach(elem=>map[elem.id]=elem)
	console.log("checkedCookie",Cookies.get("auth")&&JSON.parse(Cookies.get("auth")));
	return Cookies.get("auth")?true:false;
}

function destroyCookie() {
	// Cookies.expire(Config.TOKEN_COOKIE_KEY);
	Cookies.expire("auth");
}

export default function app(state = initialState, action) {
	switch (action.type) {
		case "IS_AUTHENTICATED":
			
			// checkCookie();
			return Object.assign(
				{}, 
				state, 
				{ 	loggedIn:checkCookie(), 
					token: Cookies.get("auth")?JSON.parse(Cookies.get("auth")).token:'', 
					id:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).userId:'',
					userAccess:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).userAccess:'',
					fullname:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).fullname:'',
					country:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).userCountry:''
				}
				);
			
		case "USER_AUTH_REQUEST":
			return state;
		case "USER_AUTH":
			console.log("action",action.res.data.data)
			setCookie(
				1, 
				action.res.data.data.api_token, 
				action.res.data.data.id,
				action.res.data.data.access,
				action.res.data.data.fullname,
				action.res.data.data.country
				);
			
			// return {
			// 	...state,
			// 	loggedIn:true,
			// 	token:action.res.data.data.api_token,
			// 	id: action.res.data.data.id
			// 	// param:action.param
			// }
			return Object.assign({}, state, {loggedIn:true, token: action.res.data.data.api_token});
		case "USER_LOGOUT":
			console.log("logouted");
			destroyCookie();
			return Object.assign({}, initialState);
	default:
    	return state;
	}
}