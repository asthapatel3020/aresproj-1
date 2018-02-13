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
import {Button} from '../../../components/ui'
import ItemSelect from '../shops/itemSelect'
import ShopTable from './shopTable'

				// 
class AddUser extends Component {
	state={userName:'',userFullName:'', userAccess:'', countryId:'', userPassword:'', checkedShops:[], errors:[], isLoginValid: true}

	handleNameChange(e) {
    	this.setState({ userFullName: e.target.value });
  	}
	
	handleCountryChange(e) {
    	this.setState({ countryId: e.target.value });
  	}
	componentWillMount() {
		this.props.dispatch(actions.getShops(this.props.token, this.props.id))
		this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		
	}
	componentWillReceiveProps(nextProps) {
  		nextProps.isSent&&this.props.router.push('/users');

  	}
	componentDidMount() {
  		this.props.isSent&&this.props.dispatch(actions.clearState())
  	}
  	handleSave(e) {
  		// username, password, fullname, access, country_id, shops
		this.state.userName&&
		this.state.userAccess&&
		this.state.countryId&&
		this.state.userPassword&&
    	this.props.dispatch(actions.addUser(this.props.token, this.props.id, this.state.userName, this.state.userPassword, this.state.userAccess, this.state.countryId, this.state.checkedShops)); 
  		
  		!this.state.userName&&this.setState({errors:[{message:'Логин должен быть заполнен'}]})
  		!this.state.userAccess&&this.setState({errors:[{message:'Доступ должен быть указан'}]})
  		!this.state.countryId&&this.setState({errors:[{message:'Страна должна быть указана'}]})
  		!this.state.userPassword&&this.setState({errors:[{message:'Пароль должен быть заполнен'}]})

	}
  	componentWillReceiveProps(nextProps) {
  		nextProps.isSent&&this.props.router.push('/users');
  	}
  	handleCheck(e) {
		this.setState({checkedShops:e})
  	}
  	handleAccessChange(e) {
		this.setState({userAccess:e.target.value})
  	}
  	handleLoginChange(e) {
  		e.target.value.match(" ")?this.setState({isLoginValid:false}):this.setState({isLoginValid:true})
  		this.setState({userName:e.target.value})
  	}
  	handlePassChange(e) {
  		this.setState({userPassword:e.target.value})
  	}
	render() {
		// const {countries} = this.props.countries;
		// console.log("ADD", this.state)
		const accessList = [{id:1, name:'Суперадмин'}, {id:2, name:'Админ'}, {id:3, name:'Пользователь'}]
		return (
			<div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
				<div
					className="route-wrapper" style={{marginBottom:20, padding:'3%', paddingBottom:'2%', width:'100%'}}>
						<div
							className="form-group form-group1">
			              <label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Логин</label>
			              <Input required format={"login"}errorMessage={"Логин должен содержать одно слово из латинских букв, цифр, ./-/_"} isValid={this.state.isLoginValid} placeholder="Введите логин пользователя"  value={this.state.userName} onFieldChange={(e)=>this.handleLoginChange(e)}/>
			            </div>
			            <div className="form-group form-group1">
			              <label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Пароль</label>
			              <Input required format={"password"} errorMessage={"Пароль не должен содержать буквы кириллицы и состоять больше чем из одного слова"} placeholder="Введите пароль пользователя "  value={this.state.userPassword} onFieldChange={(e)=>this.handlePassChange(e)}/>
			            </div>
			          
						<div className="form-group form-group1">
			            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Доступ</label>
							<ItemSelect  defaultOption={"Выберите доступ"} onSelect={(e)=>this.handleAccessChange(e)} items={accessList}/>
			            	
			            </div>
			            <div className="form-group form-group1">
			            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Страна</label>
							<ItemSelect defaultOption={"Выберите страну"} onSelect={(e)=>this.handleCountryChange(e)} items={this.props.countries}/>
			 
			            </div>
			            
					
				
				</div>
				<div className="route-wrapper" style={{padding:'3%', width:'100%'}}>
					
					<ShopTable  checkedItems={[]} getItems={e=>this.handleCheck(e)} router={this.props.router} items={this.props.shops}/>
					<div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>

		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
		            <div style={{color:'red'}}>

					{this.state.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
				</div>

			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    isSent: state.user.addSuccess,
    errors: state.user.errors,
    shops:state.shops.shops,
    countries:state.countries.countries

  };
}
export default connect(mapStateToProps)(AddUser);
