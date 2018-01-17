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
import ItemSelect from '../../../components/ui/itemSelect'
import {Button} from '../../../components/ui'

				// 
class UploadMatrix extends Component {
	state={file:null, countryId:this.props.userCountry.id}
	componentWillMount() {
		this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		
	}
	handleCountryChange=(e)=>{
		this.setState({
			countryId:e.target.value
		})
	}
	onChange=(e)=>{
		this.setState({
			file:e.target.files[0]
		})
	}
	
	
	render() {
		let mapa = {countries:[this.props.userCountry]};
  		let items = this.props.userAccess==1?this.props.countries:mapa;
		return (
			<div style={{padding:'0 5% 5% 3%'}}>
				<div style={{display:'flex', padding:'0 0 5% 0', lineHeight:'2.5em'}}>
				<div style={{marginRight:'5px'}}>Выберите страну</div> 

				<ItemSelect defaultValue={this.props.userCountry.id} style={{width:'300px'}} onSelect={(e)=>this.handleCountryChange(e)} items={items.countries}/>
			</div>
			<div style={{display:'flex'}}>
				<input type="file" onChange={this.onChange}/>
		        <Button 
		        	onClick={(e)=>this.props.dispatch(actions.uploadMatrixProducts(this.state.file,this.props.token,this.props.id, this.state.countryId))} 
		        	label="Загрузить" 
		        	style={{textAlign:'right'}} 
		        	size="btn-sm" 
		        	color="btn-warning"   
		        /> 

			</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
  	countries:state.countries,
  	cities:state.cities,
    token:state.app.token,
    id:state.app.id,
    userAccess: state.app.userAccess,
    userCountry:state.app.country,
    countryName:state.country.countryName,
    phone:state.country.phone
  };
}
export default connect(mapStateToProps)(UploadMatrix);
