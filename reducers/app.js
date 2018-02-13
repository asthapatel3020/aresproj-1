
import Cookies from 'cookies-js';
import Config from '../config';



const initialState = {
	loggedIn:false,
	id:'',
	token:'',
	userAccess:'',
	fullname:'',
	country:{}, 
	username:'',
	errors:[]
};

function setCookie(expires_in, token, id, access, fullname, country, username) {
	var cookie_expiration_date = Date.now() + expires_in;
	console.log("date expire", cookie_expiration_date)
	Cookies.set("auth", JSON.stringify({	
			token:token, 
			userId:id, 
			userAccess:access,
			fullname: fullname,
			userCountry:country,
			username:username }), 
	{ expires: 86400 });
}

function checkCookie() {
	// let map =
	// let data = Cookies.get();
	// data.forEach(elem=>map[elem.id]=elem)
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
					country:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).userCountry:'',
					username:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).username:'',
				}
				);
			
		case "USER_AUTH_REQUEST":
			return state;
		case "USER_AUTH_FAILURE":
			console.log("FAILURE")
			return {...state, errors:action.error&&action.error.data.errors}
		case "USER_AUTH":
			
			if (action.res.data.data.access!==3) {
				setCookie(
					1, 
					action.res.data.data.api_token, 
					action.res.data.data.id,
					action.res.data.data.access,
					action.res.data.data.fullname?action.res.data.data.fullname:'',
					action.res.data.data.country,
					action.res.data.data.username

					)
				return Object.assign({}, state, {loggedIn:true, token: action.res.data.data.api_token})
			}
			else {
				return {...state, errors:[{message:'Нужно владеть правами администратора/супер администратора.'}]}
			}
		case "USER_LOGOUT":
			destroyCookie();
			return Object.assign({}, initialState);
	default:
    	return state;
	}
}