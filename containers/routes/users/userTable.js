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
import SearchInput, {createFilter} from 'react-search-input'

// componentDidMount() {
  
const KEYS_TO_FILTERS = ['username', 'country.name','shops.name', 'access' ]
// }
class UserTable extends Component  {
	state ={searchTerm:''}

	searchUpdated =(term)=> {
		
		this.setState({searchTerm: term})
	}
	componentDidUpdate() {
		console.log("filter", this.filteredUsers)
	}
	render() {
		const {props} = this;
		let arr =[]
		props.users.map(u=>arr.push({...u, q:'22'}))
		console.log("QQQQ", arr)
		this.filteredUsers = props.users.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

	return<div className="wrapper"> 
		<div style={{display:'flex', justifyContent:'flex-end', padding:'0 0 15px 0'}}>
			<Link to="/users/add">
				<Button label="+ Добавить нового пользователя" size="btn-xs" color="btn-default" style={{color:'#ffc333'}}  />
        	</Link>
			
		</div>
			<SearchInput placeholder={"Поиск"} className='search-input' onChange={this.searchUpdated} />

		<table className="table-country" style={{width:'90%'}}> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th>Имя</th> 
                            <th>Доступ</th> 
                            <th>Страна</th> 
                            <th>Список магазинов</th> 
                           
                          </tr> 
                        </thead> 
                        <tbody> 
                        	{this.filteredUsers.map((item,i)=>(
			                    <tr key={i} style={{borderBottom:'1px solid #dadada'}}>
			                        <td>{item.username}</td>
			                        <td>
			                        	{
			                        		item.access==1&&'Супер админ'||
			                        		item.access==2&&'Админ'||
			                        		item.access==3&&'Пользователь'
			                        	}
			                        </td>
			                        <td>{item.country.name}</td>
			                        <td>{item.shops.map((s,i)=>i!==0?`, ${s.name} `:`${s.name}`)}</td>

			                        <td className="td-btn">
              							<Link to={`/users/edit/`}>
              								<Button 
              									onClick={()=>props.dispatch(actions.setUserEdit(item))} 
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
const mapStateToProps = state => ({
    token:state.app.token,
    id:state.app.id,
});
export default connect(mapStateToProps)(UserTable);
