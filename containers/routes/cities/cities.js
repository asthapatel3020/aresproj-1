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
import CityTable from './cityTable';
import ItemSelect from '../../../components/ui/itemSelect'
import {Button} from '../../../components/ui'

				// 
class Cities extends Component {

	state={countryId:''}

	componentWillMount() {
		this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		this.props.dispatch(actions.getCities(this.props.token, this.props.id, this.props.userCountry.id))
		
	}

	handleNameChange(e) {
    	this.setState({ countryId: e.target.value });
		this.props.dispatch(actions.getCities(this.props.token, this.props.id, e.target.value))

  	}
	render() {
		const {cities} = this.props.cities;
		// let cities = [];
		return (
			<div className="route-wrapper">
			<div style={{display:'flex', justifyContent:'flex-end', padding:'0 3%'}}>
			<Link to="/cities/add">
				<Button label="+ Добавить новый город" size="btn-xs" color="btn-default" style={{color:'#ffc333'}}  />
        	</Link>
			
		</div>
			{this.props.userAccess==1&&<div style={{display:'flex', padding:'0 0 5% 5%', lineHeight:'2.5em'}}>
				<div style={{marginRight:'5px'}}>Выберите страну</div> 

				<ItemSelect defaultValue={this.props.userCountry.id} style={{width:'200px'}} onSelect={(e)=>this.handleNameChange(e)} items={this.props.countries.countries}/>
			</div>}
			{<CityTable countryName={this.props.countryName} dispatch={this.props.dispatch} cities={cities}/>}
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
export default connect(mapStateToProps)(Cities);
