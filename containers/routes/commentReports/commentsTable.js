import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
// import './countryTable.css';
import {Button} from '../../../components/ui';

const convertTime=(e)=> {
	let date = new Date(e*1000)
	let s = `${('0'+date.getDate()).slice(-2)}.${('0'+(date.getMonth()+1)).slice(-2)}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
	return s;
}	
export default ({...props}) => {
	return<div style={{marginTop:'2%', marginBottom:'3%', width:'100%'}}> 
		<table style={{width:'100%'}}> 
                        <thead className="table-thead"> 
                          <tr> 
                            
                            	{props.type=='product'&&<th style={{width:'15%'}}>Бренд/товар/магазин</th>}
                            	{props.type=='brand'&&<th style={{width:'15%'}}>Бренд/подкатегория/магазин</th>}
                            	{props.type=='subcat'&&<th style={{width:'15%'}}>Подкатегория/магазин</th>}
                             
                            <th style={{padding:'0 15px'}}>Дата и время</th> 
                            <th style={{padding:'0 15px'}}>Пользователь</th>
                            <th style={{padding:'0 15px', width:'40%'}}>Комментарий</th>
                            <th>Фото</th>
                           
                          </tr> 
                        </thead> 
                        <tbody> 
                        	{props.items.map((item,i)=>(
			                    <tr key={i} style={{paddingBottom:10}}>
			                        	{props.type=='product'&&<td style={{padding:'7px 0'}}>{item.product.brand.name}<br/> {item.product.model.name} {item.product.code.code}<br/> {item.shop.name}</td>}
			                        	{props.type=='brand'&&<td style={{padding:'7px 0'}}>{item.brand.name}<br/> {item.subcategory.name}<br/> {item.shop.name}</td>}
			                        	{props.type=='subcat'&&<td style={{padding:'7px 0'}}>{item.subcategory.name}<br/> {item.shop.name}</td>}
										
			                    	<td style={{padding:'7px 15px'}}>{convertTime(item.created_at)}</td>
			                    	<td style={{padding:'7px 15px'}}>{item.user.username}</td>
			                    	<td style={{padding:'7px 15px'}}>{item.comment}</td>
			                    	<td style={{padding:'7px 0'}}>
										<div style={{cursor:'pointer'}}  onClick={()=>props.zoomPhoto(item.photo)}>
											<img src={item.photo} alt="" height={40} width={60} className="comments-img"/>
										</div>
			                    	</td>
			                    </tr>
					        ))}
                        </tbody>
        </table>
		
	</div>
	
}
