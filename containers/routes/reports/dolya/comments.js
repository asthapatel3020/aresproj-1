import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";  

const convertTime=(e)=> {
	let date = new Date(e*1000)
	let s = `${('0'+date.getDate()).slice(-2)}.${('0'+(date.getMonth()+1)).slice(-2)}.${date.getFullYear()} - ${date.getHours()}:${date.getMinutes()}`
	return s;
}	
export default(props)=> {

	return (
		<div >
		{props.comments.map(e=>(
			<div key={e.id} style={{marginTop:10}}>
				<div>
					<div style={{color:'black', fontSize:'0.93em'}}>{`${e.user.username}, ${e.shop.name}, ${e.category.name}, ${e.subcategory.name}`}</div>
					<div style={{fontSize:'0.8em'}}>{e.comment}</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginTop:10, alignItems:'flex-end'}}>
					<div style={{cursor:'pointer'}} className="comments-img" onClick={()=>props.zoomPhoto(e.photo)}>
						<img src={e.photo} alt="" height={40} width={60}/>
					</div>
					<div style={{border:'2px solid #eee', borderRadius:3, padding:'2px', fontSize:'0.8em'}}>
						{convertTime(e.created_at)}
					</div>
				</div>
			</div>)
		)}
		</div>
	)
}


