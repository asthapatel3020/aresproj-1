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
import './countryTable.css';
import {Button} from '../../../components/ui';

// componentDidMount() {
  
// }
export default ({...props}) => {
	return<div className="wrapper"> 
		<div style={{display:'flex', justifyContent:'flex-end', padding:'0 10%'}}>
			<Link to="/countries/add">
				<Button label="Добавить новую страну" size="btn-xs" color="btn-default" style={{color:'#ffc333'}}  />
        	</Link>
			
		</div>
		<table className="table-country"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th>Имя</th> 
                            <th>Контактный телефон</th> 
                           
                          </tr> 
                        </thead> 
                        <tbody> 
                        	{props.countries.map((item,i)=>(
			                    <tr key={i} style={{borderBottom:'1px solid #dadada'}}>
			                        <td>{item.name}</td>
			                        <td>+{item.phone}</td>
			                        <td className="td-btn">
              							<Link to={`/countries/edit/${item.name}&${item.phone}&${item.id}`}>
              								<Button 
              									// onClick={()=>props.dispatch(actions.chooseEditCountry(item.name, item.phone))} 
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
	
	
		// const {countries} = props;
		
		// countries.forEach(item=><div>{item.name}</div>)
	// return (
	// 	<div>hello</div>
	
	// );
}
