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
import {Button, Pager} from '../../../components/ui'
import UserTable from './userTable'
				// 
class Users extends Component {

	state={countryId:'', total:'', currentPage:1}

	componentWillMount() {
		console.log("mounted")
		// this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		this.props.dispatch(actions.getUsers(this.props.token, this.props.id, this.state.currentPage))
		
	}
	componentWillReceiveProps(nextProps) {
		this.setState({total:nextProps.users.meta.total_pages, currentPage: nextProps.users.meta.current_page})
	}
	handleChangePage=(e)=> {
		this.setState({currentPage:e})
		this.props.dispatch(actions.getUsers(this.props.token, this.props.id, e))

	}
	handleNext=()=> {
		this.setState({currentPage:this.state.currentPage+1})
		this.props.dispatch(actions.getUsers(this.props.token, this.props.id, this.state.currentPage+1))

	}
	handlePrevious=()=> {
		this.setState({currentPage:this.state.currentPage-1})
		this.props.dispatch(actions.getUsers(this.props.token, this.props.id, this.state.currentPage-1))

	}
	render() {
		console.log("users", this.props.users)
		const {users} = this.props.users;
		const usersToShow = this.props.userAccess==2?this.props.users.users.filter(u=>u.access==3&&u.country.id==this.props.userCountry.id):this.props.users.users
		// let cities = [];
		return (
			<div className="route-wrapper">
			{<UserTable dispatch={this.props.dispatch} users={usersToShow}/>}
				{this.state.total>1&&<Pager 
					currentPage={this.state.currentPage} 
					itemsPerPage={15}
					pages={this.state.total}
					onPage={e=>this.handleChangePage(e)}
					onNext={this.handleNext}
					onPrevious={this.handlePrevious}
					
				/>}
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
    users:state.users
  };
}
export default connect(mapStateToProps)(Users);
