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

// componentDidMount() {
  
// }
export default ({...props}) => {
	return<div className="wrapper"> 
		
		<table className="table-city"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th>Название города</th> 
                          </tr> 
                        </thead> 
                        <tbody> 
                        	{props.cities.map((item,i)=>(
			                    <tr key={i} style={{borderBottom:'1px solid #dadada'}}>
			                        <td>{item.name}</td>
			                        <td className="td-btn">
              							<Link to={`/cities/edit/${item.name}&${item.country.id}&${item.id}`}>
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
