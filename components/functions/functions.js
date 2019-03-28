import moment from 'moment'


// export const convertDate=(e)=> {
// 	  let date = new Date(e*1000)
// 	  let s = `${('0'+date.getDate()).slice(-2)}.${('0'+(date.getMonth()+1)).slice(-2)}.${date.getFullYear()} ${date.getHours()}:${('0'+(date.getMinutes())).slice(-2)}`
// 	  return s;
// 	} 
// export const convertDateWithTime=(e)=> {
// 	if (e) {
// 		let date = new Date(e*1000)
// 	  let s = `${('0'+(date.getMonth()+1)).slice(-2)}/${('0'+date.getDate()).slice(-2)}/${(''+date.getFullYear()).slice(-2)} ${}`
// 	  return s;
// 	}
// 	else return ''
	  
// 	} 
export const convertDate=(e)=> {
	if (e) {
		let date = new Date(e*1000)
	  let s = `${('0'+(date.getMonth()+1)).slice(-2)}/${('0'+date.getDate()).slice(-2)}/${(''+date.getFullYear()).slice(-2)}`
	  return s;
	}
	else return ''
	  
	} 
export const convertDateMask=(e)=> {
	if (e) {
		let date = new Date(e*1000)
	  let s = `${('0'+(date.getMonth()+1)).slice(-2)}${('0'+date.getDate()).slice(-2)}${(''+date.getFullYear()).slice(-2)}`
	  return s;
	}
	else return ''
	  
} 
export const convertDateMaskFullYear=(e)=> {
	if (e) {
		let date = new Date(e*1000)
	  let s = `${('0'+(date.getMonth()+1)).slice(-2)}${('0'+date.getDate()).slice(-2)}${(''+date.getFullYear())}`
	  return s;
	}
	else return ''
	  
} 
export const handleNumbers=(n, str1, str2, str5)=> {
	return n + ' ' + ((((n%10)==1)&&((n%100)!=11))?(str1):(((((n%10)>=2)&&((n%10)<=4))&&(((n%100)<10)||((n%100)>=20)))?(str2):(str5)))
}
// function plural(n,str1,str2,str5){}

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const reverseDateMask=(date)=> {
	let s = date?`${date.substring(0,2)} ${date.substring(2,4)} ${date.substring(4,6)}`:''
	return date?
		moment(new Date(s)).utcOffset(0,true)/1000:
		''
}
export const reverseDateMaskFullyear=(date)=> {
	let s = date?`${date.substring(0,2)} ${date.substring(2,4)} ${date.substring(4,8)}`:''
	// console.log('dATE', new Date(s)/1000, moment.utc(new Date(s)).unix())
	// console.log('date', moment.utc([`${date.substring(4,8)} ${date.substring(2,4)} ${date.substring(0,2)}`]))
	return date?
		moment.utc(new Date(s)).unix():
		''
}
export const setSequence=(el, arr)=> {
	let seq = 0;
	console.log('q', arr)
	
		for (let i=0;i<arr.length;i++) {
			console.log('qwe', el.pc_id, arr[i].pc_id)
			seq = el.pc_id==arr[i].pc_id&&seq<=parseInt(arr[i].seq_order)?parseInt(arr[i].seq_order)+1:0
			console.log('ff', seq)
		}
	
	
	return seq
}

export const setOrder=(el, arr)=> {
	let seq = 0;
		// seq = el.item.item_order==arr[i].item.item_order&&seq<=parseInt(arr[i].item.sort_order)?parseInt(arr[i].item.sort_order)+1:0
	
		// let duplicateArr = arr.filter(e=>e.item.item_id==el.item.item_id)
		console.log('dupliarr', arr)
		// duplicateArr.map((e,i)=>e.item.sort_order=i)
		for (let i=0;i<arr.length;i++) {
			console.log('qwe', el.item.item_id, arr[i].item.item_id)
			seq = el.item.item_id==arr[i].item.item_id&&seq<=arr[i].item.sort_order?arr[i].item.sort_order+1:0
			
		}
	console.log('ff', seq)
	return seq
}

export const handlePhoneNumber=(num)=> {
	if (num) {
		return `(${num.substring(0,3)}) ${num.substring(3,6)}-${num.substring(6)}`
	} else {
		return ''
	}
}