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
import {Button} from '../../../components/ui';
import RetailerTable from './retailerTable';
class Users extends Component {

	state={countryId:''}

	componentWillMount() {
		console.log("mounted")
		// this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		this.props.dispatch(actions.getRetailers(this.props.token, this.props.id))
		
	}
	render() {
		console.log("retailers", this.props.retailers)
		const {retailers} = this.props.retailers;
		// let cities = [];
		return (
			<div>
				{<RetailerTable dispatch={this.props.dispatch} retailers={retailers}/>}
			
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    userAccess: state.app.userAccess,
    userCountry:state.app.country,
    phone:state.country.phone,
    retailers:state.retailers
  };
}
export default connect(mapStateToProps)(Users);
