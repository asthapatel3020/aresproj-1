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
import './countryTable.css';
import {Button} from '../../../components/ui'
				// 
class AddCountry extends Component {
	state={countryName:this.props.params.name, phone:this.props.params.phone, countryId:this.props.params.id}

	handleNameChange(e) {
    	this.setState({ countryName: e.target.value });
  	}
	
	handlePhoneChange(e) {
    	this.setState({ phone: e.target.value });
  	}

  	handleSave(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
      this.props.dispatch(actions.editCountry(this.props.token, this.props.id, this.state.countryName, this.state.phone, this.state.countryId)); 
  	}
  	componentWillReceiveProps(nextProps) {
  		nextProps.isSent&&this.props.router.push('/countries');
  	}
  	componentDidMount() {
  		this.props.isSent&&this.props.dispatch(actions.clearState())
  	}
	render() {
		// const {countries} = this.props.countries;
		return (
			<div 
				className="route-wrapper"
				style={{display:'flex', alignItems:'center', padding:'30px 30px 60px 30px', borderBoxing:'border-box', flexDirection:'column'}}>
				<div className="add-country-form" >
					<div className="form-group form-group1">
		              <label style={{lineHeight:'2.5em', width:'20%'}} style={{lineHeight:'2.5em'}}>Имя</label>
		              <Input required format={"noNumbers"} errorMessage={"Название должно состоять из букв кириллицы"} placeholder="Введите название страны"  value={this.state.countryName} onFieldChange={(e)=>this.handleNameChange(e)}/>
		            </div>
		            <div className="form-group form-group1">
		              <label style={{lineHeight:'2.5em', width:'20%'}} style={{lineHeight:'2.5em'}}>Контактный телефон</label>
		              <Input required format={"numbers"} errorMessage={"Телефон должен состоять из цифр, +, ()"} placeholder="+375(17) 227-46-74" value={this.state.phone} onFieldChange={(e)=>this.handlePhoneChange(e)} />
		            </div>
		            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>

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
    isSent: state.country.editSuccess,
    errors: state.country.errors

  };
}
export default connect(mapStateToProps)(AddCountry);
