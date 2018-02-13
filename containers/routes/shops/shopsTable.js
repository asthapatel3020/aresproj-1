/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Profile
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
import '../countries/countryTable.css';
import {Button} from '../../../components/ui';
import ItemSelect from './itemSelect'

// componentDidMount() {
  
// }
class ShopsTable extends Component {
	state ={searchTerm:''}
	searchUpdated =(term)=> {
	   this.setState({searchTerm: term})
	}
	render() {
		const {props} = this;
		return<div className="wrapper"> 
			<div style={{display:'flex', justifyContent:'flex-end', padding:'0 0 15px 0'}}>
				<Link to="/shops/add">
					<Button label="+ Добавить новый магазин" size="btn-xs" color="btn-default" style={{color:'#ffc333'}}  />
	        	</Link>
				
			</div>
			<div style={{width:'380px', display:'flex', marginBottom:'15px'}}>
		            	<div  style={{lineHeight:'2.5em', marginRight:'10px', width:'100%', fontWeight:'600'}}>Розничная сеть</div>
						<ItemSelect style={{width:'250px'}}items={props.retailers} defaultOption={'Все'} onSelect={(e)=>this.props.handleRetailerChange(e)}/>
		            	
		            </div>
			<table className="table-country" style={{width:'80%'}}> 
	                        <thead className="table-thead"> 
	                          <tr> 
	                            <th>Имя</th> 
	                            <th>Розничная сеть</th> 
	                            <th>Адрес</th> 
	                            <th>Страна</th> 
	                            <th>Город</th> 

	                          </tr> 
	                        </thead> 
	                        <tbody> 
	                        	{props.shops.map((item,i)=>(
				                    <tr key={i} style={{borderBottom:'1px solid #dadada'}}>
				                        <td>{item.name}</td>
				                        <td>{item.retail.name}</td>
				                        <td>{item.address}</td>
				                        <td>{item.country.name}</td>
				                        <td>{item.city.name}</td>

				                        <td className="td-btn">
	              							<Link to={`/shops/edit/${item.id}&${item.name}&${item.address.replace('/', '*')}&${item.latitude}&${item.longitude}&${item.country.id}&${item.city.id}&${item.retail.id}`}>
	              								<Button 
	              									// onClick={()=>props.dispatch(actions.getCities(props.token, props.userId, item.country.id))} 
	              									label="Изменить" 
	              									size="btn-xs" 
	              									color="btn-warning"   
	              								/> 
				                        	</Link>
				                        </td>
				                    </tr>
						        ))}
	                        </tbody>
	        </table>
			
		</div>
	}
	

}
export default connect()(ShopsTable);

