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
import Input from '../../../components/ui/Input';
import '../countries/countryTable.css';
import {Button} from '../../../components/ui'
import ItemSelect from '../../../components/ui/itemSelect'
				// 
class AddCity extends Component {
	state={
		countryId:this.props.userCountry.id, 
		cityName:''
	}

	handleNameChange(e) {
    	this.setState({ countryId: e.target.value });
  	}
	
	handleCityNameChange(e) {
    	this.setState({ cityName: e.target.value });
  	}

  	handleSave(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
      this.props.dispatch(actions.addCity(this.props.token, this.props.id, this.state.countryId, this.state.cityName)); 
  	}
  	componentWillReceiveProps(nextProps) {
  		nextProps.isSent&&this.props.router.push('/cities');
  	}
	render() {
		console.log("this", this.props.countries)
		let mapa = {countries:[this.props.userCountry]};
  		let items = this.props.userAccess==1?this.props.countries:mapa;
		// const {countries} = this.props.countries;
		return (
			<div style={{display:'flex', alignItems:'center', padding:'30px 30px 60px 30px', borderBoxing:'border-box', flexDirection:'column'}}>
				<div className="add-country-form" >
					<div className="form-group form-group1">
		              <label className="col-lg-3" style={{lineHeight:'2.5em'}}>Имя</label>
		              <ItemSelect defaultValue={this.state.countryId} onSelect={(e)=>this.handleNameChange(e)} items={items.countries}/>
		            </div>
		            <div className="form-group form-group1">
		              <label className="col-lg-3" style={{lineHeight:'2.5em'}}>Название</label>
		              <Input placeholder="Москва" value={this.state.cityName} onFieldChange={(e)=>this.handleCityNameChange(e)} />
		            </div>
		            <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:'25px'}}>
		            	<Button onClick={(e)=>this.props.router.push('/cities')} label="Назад" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 

		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
				</div>
				<div style={{color:'red'}}>

					{this.props.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    isSent: state.city.addSuccess,
    errors: state.city.errors,
    userAccess: state.app.userAccess,
    userCountry:state.app.country,
  	countries:state.countries


  };
}
export default connect(mapStateToProps)(AddCity);