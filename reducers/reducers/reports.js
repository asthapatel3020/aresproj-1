const initialState = {
	allStats:[],
	graphic:[],
	piechart:'',
	retailStats:[],
	catStats:[],
	auditsGraphic:[],
	auditsRetailStats:[],
	auditsUsers:[],
	pricesGraphic:[],
	pricesRetailStats:[],
	pricesCategoryStats:[],
	pricesProductStats:[],
	productMeta:'',
	amountProductMeta:'',
	amountGraphic:[],
	amountRetailStats:[],
	amountCategoryStats:[],
	amountProductStats:[],
};

const removeZero=(n)=> {
	return n[0]==0?n[1]:n
}
const addZero=(n)=> {
	return n<10?`0${n}`:n
}
const normalizeGraphic=(data, action)=> {
	let arr = [];
	const months = ['ЯНВ', 'ФЕВ', 'МАР', 'АПР', 'МАЙ', 'ИЮН', 'ИЮЛ', 'АВГ', 'СЕН', 'ОКТ', 'НОЯ', 'ДЕК'];
	if (data.is_year==1) {

		data.data.forEach((item, i)=> arr[i]= {name:months[removeZero(item.date.split('.')[1])-1], value:item.value})
		return arr;
	}
	else {
		let from = new Date(action.filters.from*1000);
		let to = new Date(action.filters.to*1000);
		let start = addZero(from.getDate())+'.'+addZero((from.getMonth()+1))
		let end = addZero(to.getDate())+'.'+addZero((to.getMonth()+1))
		let names = data.data.slice(data.data.lastIndexOf(start), (data.data.lastIndexOf(end)+1))
		let k,j = '';

		data.data.forEach((item,i)=> {
			let date = item.date.split('.')[0]+'.'+item.date.split('.')[1]
			if (date==start) k=i;
			else if (date==end) j=i
		})
		let finalData = data.data.slice(k, j+1)
		finalData.forEach((item, i)=> arr[i]= {name:item.date.split('.')[0]+'.'+item.date.split('.')[1], value:item.value})
		return arr;
	}
}

export default function app(state = initialState, action) {
	switch (action.type) {
		case "GET_DOLYA_GRAPHIC":
			return Object.assign({}, state, {graphic:normalizeGraphic(action.res.data.data, action)});
		case "GET_DOLYA_PIECHART":
			return Object.assign({}, state, {piechart:action.res.data.data});
		case "GET_DOLYA_RETAIL_STATS":
			return Object.assign({}, state, {retailStats:action.res.data.data});
		case "GET_DOLYA_CAT_STATS":
			return Object.assign({}, state, {catStats:action.res.data.data});
		case "GET_AUDITS_GRAPHIC":
			return Object.assign({}, state, {auditsGraphic:normalizeGraphic(action.res.data.data, action)});
		case "GET_AUDITS_RETAIL_STATS":
			return Object.assign({}, state, {auditsRetailStats:action.res.data.data});
		case "GET_AUDITS_USER_STATS":
			return Object.assign({}, state, {auditsUsers:action.res.data.data});
		case "GET_ALL_STATS":
			return Object.assign({}, state, {allStats:action.res.data.data});
		case "GET_PRICES_GRAPHIC":
			return Object.assign({}, state, {pricesGraphic:normalizeGraphic(action.res.data.data, action)});
		case "GET_PRICES_RETAIL_STATS":
			return Object.assign({}, state, {pricesRetailStats:action.res.data.data});
		case "GET_PRICES_CATEGORY_STATS":
			return Object.assign({}, state, {pricesCategoryStats:action.res.data.data});
		case "GET_PRICES_PRODUCT_STATS":
			return Object.assign({}, state, {pricesProductStats:action.res.data.data.products, productMeta:action.res.data.data.meta});
		case "GET_AMOUNT_GRAPHIC":
			return Object.assign({}, state, {amountGraphic:normalizeGraphic(action.res.data.data, action)});
		case "GET_AMOUNT_RETAIL_STATS":
			return Object.assign({}, state, {amountRetailStats:action.res.data.data});
		case "GET_AMOUNT_CATEGORY_STATS":
			return Object.assign({}, state, {amountCategoryStats:action.res.data.data});
		case "GET_AMOUNT_PRODUCT_STATS":
			return Object.assign({}, state, {amountProductStats:action.res.data.data.products, amountProductMeta:action.res.data.data.meta});
		case "CLEAR_PERIOD":
			return {...initialState, graphic:state.graphic, pricesGraphic:state.pricesGraphic, auditsGraphic:state.auditsGraphic, amountGraphic:state.amountGraphic }
	default:
    	return state;
	}
}