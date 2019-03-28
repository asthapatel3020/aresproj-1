
import Cookies from 'cookies-js';



const initialState = {
	loggedIn:false,
	token:'',
	errors:'',
	user:''
};



function setCookie(user, token) {
	// var cookie_expiration_date = Date.now() + expires_in;
	// console.log("date expire", cookie_expiration_date)
	Cookies.set("auth", JSON.stringify({	
			token:token.token, 
			user:user}), 
	{ expires: 86400 });
}

function destroyCookie() {
	Cookies.expire("auth");
}
function checkCookie() {
	return Cookies.get("auth")?true:false;
}
const normalizeErrors=(errors)=> {
	let map = []
	errors.email&&errors.email.forEach(e=> map.push(e))
	errors.password&&errors.password.forEach(e=> map.push(e))
	errors.auth&&errors.auth.forEach(e=> map.push(e))
	return map
}
export default function app(state = initialState, action) {
	switch (action.type) {
		case "IS_AUTHENTICATED":
			console.log('ISAUTH')
			return {
				...state, 
				loggedIn:checkCookie(), 
				user:Cookies.get("auth")?JSON.parse(Cookies.get("auth")).user:'',
				token: Cookies.get("auth")?JSON.parse(Cookies.get("auth")).token:''
			}
		case "SIGN_IN_REQUEST":
			return state;
		case "SIGN_IN_FAILURE":
			console.log('asdqqq')
			return {...state, errors:action.error.data.data.user}
		case "SIGN_IN":
				setCookie(action.res.data.data.user, action.res.data.data.token)
				return {
					...state, 
					loggedIn:true, 
					user:action.res.data.data.user,
					token:action.res.data.data.token.token, 
					errors:''}
		
		case "USER_LOGOUT":
			// console.log("qwe")
			destroyCookie();
			return Object.assign({}, initialState);
	default:
    	return state;
	}
}