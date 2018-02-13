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
class EditUser extends Component {
	state={
		userName:this.props.user.username,
		userFullName:this.props.user.fullname, 
		userAccess:this.props.user.access, 
		countryId:this.props.user.country.id, 
		userPassword:this.props.user.password, 
		checkedShops:[], 
		errors:[], 
		isLoginValid: true}

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
	componentDidUpdate() {
		
		this.props.isSent&&this.props.dispatch(actions.clearState())
  		this.props.isDeleted&&this.props.dispatch(actions.clearState())
	}
	componentDidMount() {
  		
		
		let arr =[]
		this.props.user.shops.map(s=>arr.push(s.id))
		this.props.user.shops!==this.state.checkedShops&&this.setState({checkedShops:arr})
	}
  	handleSave(e) {
  		// username, password, fullname, access, country_id, shops
  		this.state.userName&&
		this.state.userAccess&&
		this.state.countryId&&
		this.state.userPassword&&
     	this.props.dispatch(actions.editUser(this.props.token, this.props.id, this.props.user.id, this.state.userName, this.state.userPassword, this.state.userAccess, this.state.countryId, this.state.checkedShops)); 
  		
  		!this.state.userName&&this.setState({errors:[{message:'Логин должен быть заполнен'}]})
  		!this.state.userAccess&&this.setState({errors:[{message:'Доступ должен быть указан'}]})
  		!this.state.countryId&&this.setState({errors:[{message:'Страна должна быть указана'}]})
  		!this.state.userPassword&&this.setState({errors:[{message:'Пароль должен быть заполнен'}]})
  	}
  	componentWillReceiveProps(nextProps) {
  		nextProps.isSent&&this.props.router.push('/users');
  		nextProps.isDeleted&&this.props.router.push('/users');

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
  	handleDelete=(e)=> {
      this.props.dispatch(actions.deleteUser(this.props.token, this.props.id, this.props.user.id ))

  	}
	render() {

		// const {countries} = this.props.countries;
		console.log("EDIT", this.props.user, this.props.shops)
		const accessList = [{id:1, name:'Суперадмин'}, {id:2, name:'Админ'}, {id:3, name:'Пользователь'}]
		return (
			<div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
				<div className="route-wrapper" style={{marginBottom:20, padding:'3%', paddingBottom:'2%', width:'100%'}}>
						<div className="form-group form-group1">
			              <label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Логин</label>
			              <Input errorMessage={"WRONG"} isValid={this.state.isLoginValid} placeholder="Введите логин пользователя"  value={this.state.userName} onFieldChange={(e)=>this.handleLoginChange(e)}/>
			            </div>
			            <div className="form-group form-group1">
			              <label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Пароль</label>
			              <Input placeholder="Введите пароль пользователя "  value={this.state.userPassword} onFieldChange={(e)=>this.handlePassChange(e)}/>
			            </div>
						<div className="form-group form-group1">
			            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Доступ</label>
							<ItemSelect  defaultOption={"Выберите доступ"} defaultValue={this.state.userAccess} onSelect={(e)=>this.handleAccessChange(e)} items={accessList}/>
			            	
			            </div>
			            <div className="form-group form-group1">
			            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Страна</label>
							<ItemSelect defaultOption={"Выберите страну"} defaultValue={this.state.countryId} onSelect={(e)=>this.handleCountryChange(e)} items={this.props.countries}/>
			 
			            </div>
			            
					
				
				</div>
				<div className="route-wrapper" style={{padding:'3%', width:'100%'}}>
					
					<ShopTable  checkedItems={this.state.checkedShops} getItems={e=>this.handleCheck(e)} router={this.props.router} items={this.props.shops}/>
					<div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>

		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
		            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>

		            	<Button onClick={(e)=>this.handleDelete(e)} label="- Удалить пользователя" style={{textAlign:'right', color:'red'}} size="btn-sm" color="btn-default"   /> 
		            	
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
    isSent: state.user.editSuccess,
    isDeleted:state.user.deleteSuccess,
    errors: state.user.errors,
    shops:state.shops.shops,
    countries:state.countries.countries,
    user:state.user.user

  };
}
export default connect(mapStateToProps)(EditUser);
