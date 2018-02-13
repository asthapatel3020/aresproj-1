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
import {Button, Pager} from '../../../components/ui';
import ShopsTable from './shopsTable';
class Shops extends Component {

	state={countryId:'',total:'', currentPage:1, retailerId:''}
	componentWillReceiveProps(nextProps) {
		this.setState({total:nextProps.shops.meta.total_pages, currentPage: nextProps.shops.meta.current_page})
	}
	componentWillMount() {
		// this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		this.props.dispatch(actions.getShops(this.props.token, this.props.id, this.state.currentPage))
      this.props.dispatch(actions.getCountries(this.props.token, this.props.id)); 
      this.props.dispatch(actions.getRetailers(this.props.token, this.props.id)); 
		
	}
		handleChangePage=(e)=> {
		this.setState({currentPage:e})
		this.props.dispatch(actions.getShops(this.props.token, this.props.id, e, this.state.retailerId))

	}
	handleNext=()=> {
		this.setState({currentPage:this.state.currentPage+1})
		this.props.dispatch(actions.getShops(this.props.token, this.props.id, this.state.currentPage+1, this.state.retailerId))

	}
	handlePrevious=()=> {
		this.setState({currentPage:this.state.currentPage-1})
		this.props.dispatch(actions.getShops(this.props.token, this.props.id, this.state.currentPage-1, this.state.retailerId))

	}
	handleRetailerChange(e) {
		this.setState({retailerId:e.target.value})
		this.props.dispatch(actions.getShops(this.props.token, this.props.id, this.state.currentPage, e.target.value))
		
	}
	handleShowAll() {
		this.props.dispatch(actions.getShops(this.props.token, this.props.id, this.state.currentPage))

	}
	render() {
		const {shops} = this.props.shops;
		// let cities = [];
		return (
			<div className="route-wrapper">
				{<ShopsTable 
					token={this.props.token} 
					handleRetailerChange={(e)=>this.handleRetailerChange(e)} 
					handleShowAll={()=>this.handleShowAll()}
					userId={this.props.id} retailers={this.props.retailers} 
					dispatch={this.props.dispatch} 
					shops={shops}
				/>}
				{this.state.total>1&&<div style={{marginRight:50}}>
						<Pager 
						currentPage={this.state.currentPage} 
						itemsPerPage={15}
						pages={this.state.total}
						onPage={e=>this.handleChangePage(e)}
						onNext={this.handleNext}
						onPrevious={this.handlePrevious}
						

					/>
				</div>}
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
    shops:state.shops,
    retailers: state.retailers.retailers
  };
}
export default connect(mapStateToProps)(Shops);
