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
import CountryTable from './countryTable';

				// 
class Countries extends Component {
	// constructor(props) {
	// 	super(props);

		
	// 	this.state = {
	// 		countries:props.countries;
	// 	}
	// }
	// state={countries:this.props.countries}
	componentWillMount() {
		this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
	}
	// componentWillReceiveProps(nextProps) {
	// 	this.setState({
	// 		countries:nextProps.countries
	// 	})
	// }
	render() {
		const {countries} = this.props.countries;
		return (
			<div className="route-wrapper">
			{<CountryTable countryName={this.props.countryName} dispatch={this.props.dispatch} countries={countries}/>}
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
  	countries:state.countries,
    token:state.app.token,
    id:state.app.id,
    countryName:state.country.countryName,
    phone:state.country.phone
  };
}
export default connect(mapStateToProps)(Countries);
