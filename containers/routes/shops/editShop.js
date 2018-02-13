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
import ShopMap from './map'
import ItemSelect from './itemSelect'
class EditShop extends Component {
	state={retailerId:this.props.params.retailerId, 
		countryId:this.props.params.countryId, 
		cityId:this.props.params.cityId, 
		lat:this.props.params.lat, 
		lng:this.props.params.lng, 
		shopName:this.props.params.name, 
		shopAddress:this.props.params.address.replace('*', '/'),
		cities:[],
		shopId:this.props.params.shopId,
		errors:[]
		 }
	
	handleDelete(e){
      this.props.dispatch(actions.deleteShop(this.props.token, this.props.id, this.state.shopId)); 

	}
	handleRetailerChange(e) {
    	this.setState({ retailerId: e.target.value });
  	}
	
	componentWillMount() {
      this.props.dispatch(actions.getCities(this.props.token, this.props.id, this.state.countryId)); 
		

	}

  	handleSave(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
		this.state.shopName&&
		this.state.shopAddress&&
		this.state.lat&&
		this.state.lng&&
		this.state.countryId&&
		this.state.cityId&&
		this.state.retailerId&&
    	this.props.dispatch(actions.editShop(this.props.token, this.props.id, this.state.shopName, this.state.shopAddress, this.state.lat, this.state.lng, this.state.countryId, this.state.cityId, this.state.retailerId, this.state.shopId)); 
  		
		!this.state.shopName&&this.setState({errors:["Имя магазина не заполнено"]})
		!this.state.shopAddress&&this.setState({errors:["Адрес магазина не заполнен"]})
		!this.state.lat&&this.setState({errors:["Ширина не заполнена"]})
		!this.state.lng&&this.setState({errors:["Долгота не заполнена"]})
		!this.state.countryId&&this.setState({errors:["Страна не заполнена"]})
		!this.state.cityId&&this.setState({errors:["Город не заполнен"]})
		!this.state.retailerId&&this.setState({errors:["Розничная сеть не заполнена"]})
  	}
  	componentDidUpdate() {
  		this.props.isSent&&this.props.dispatch(actions.clearState())
  		this.props.isDeleted&&this.props.dispatch(actions.clearState())

  	}
  	componentWillReceiveProps(nextProps) {
  		this.setState({cities:nextProps.cities})
  		nextProps.isSent&&this.props.router.push('/shops');
  		nextProps.isDeleted&&this.props.router.push('/shops');
		

  	}
  	handleCountryChange(e) {
      this.props.dispatch(actions.getCities(this.props.token, this.props.id, e.target.value)); 
      this.setState({
      	countryId:e.target.value
      })
  		
  	}
  	handleCityChange(e) {
		this.setState({
			cityId:e.target.value
		})
  	}
  	handleShopNameChange(e){
  		this.setState({

  			shopName:e.target.value
  		})
  	}
  	handleShopAdressChange(e){
  		this.setState({
  			shopAddress:e.target.value
  		})
  	}
  	handleMapChange(lat, lng) {
  		this.setState({
  			lat:lat,
  			lng:lng
  		})
  	}

	render() {
		return (
			<div 
				className="route-wrapper"
				style={{display:'flex', alignItems:'center', padding:'30px 30px 60px 30px', borderBoxing:'border-box', flexDirection:'column'}}>
				<div className="add-country-form"  style={{width:'100%'}}>
					<div className="form-group form-group1">
		            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Страна</label>
						<ItemSelect defaultValue={this.state.countryId} items={this.props.countries} defaultOption={'Выберите страну'} onSelect={(e)=>this.handleCountryChange(e)}/>
		            	
		            </div>
		            <div className="form-group form-group1">
		            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Город</label>
						{this.state.cities.length>0?<ItemSelect defaultValue={this.state.cities.length>0&&this.state.cityId} items={this.props.cities} defaultOption={'Выберите город'} onSelect={(e)=>this.handleCityChange(e)}/>:
						<label style={{lineHeight:'2.5em', marginLeft:'-10px'}} >для данной страны отсутствует</label>}
		            	
		            </div>
		            <div className="form-group form-group1">
		            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Розничная сеть</label>
						<ItemSelect defaultValue={this.state.retailerId} items={this.props.retailers} defaultOption={'Выберите розничную сеть'} onSelect={(e)=>this.handleRetailerChange(e)}/>
		            	
		            </div>
		            <div className="form-group form-group1"  >
		            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Имя</label>
		              	<Input required placeholder="Введите название магазина" isFull value={this.state.shopName} onFieldChange={(e)=>this.handleShopNameChange(e)}/>
		            	
		            </div>
		            <div className="form-group form-group1"  >
		            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Адрес</label>
		              	<Input required placeholder="Введите адрес магазина" isFull value={this.state.shopAddress} onFieldChange={(e)=>this.handleShopAdressChange(e)}/>
		            	
		            </div>
		            <div className="form-group" style={{display:'flex', justifyContent:'flex-end'}} >
		            	{
		            		<ShopMap mapCenter={{lat:this.state.lat, lng:this.state.lng}} shops={this.props.shops} setCoords={(lat,lng)=>this.handleMapChange(lat,lng)}/>
						}
		            </div>
		             
		       
		            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>
		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 		         
		            </div>
		            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>
		            	<Button onClick={(e)=>this.handleDelete(e)} label="- Удалить магазин" style={{textAlign:'right', color:'red'}} size="btn-sm" color="btn-default"   /> 		         
		            </div>
				</div>
				<div style={{color:'red'}}>
					{this.state.errors.map((item,i)=> (<div key={i}>{item}</div>))}
					
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
    isSent: state.shop.editSuccess,
    isDeleted:state.shop.deleteSuccess,
    errors: state.shop.errors,
    shops:state.shops.shops,
    countries:state.countries.countries,
	cities:state.cities.cities,
	retailers:state.retailers.retailers
  };
}
export default connect(mapStateToProps)(EditShop);
