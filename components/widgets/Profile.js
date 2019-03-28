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
import * as actions from '../../actions';
import { connect } from "react-redux";
import {Fa, Button} from '../../components/ui'
/*
<li onClick={e=>this.props.dispatch(actions.logout())}>
            <Link  to="/">Logout</Link>
          </li>

          */
class Profile extends Component {
	render() {
    // console.log("w", this.props)
		return (
			<div className="prof-section">
        <div style={{textAlign:'center', padding:'0 25px'}}>
          <div style={{fontSize:'1.1em', color:'black'}}>{this.props.name}</div>
          <div>{this.props.countryName}</div>
        </div>
        <div >
          <Button onClick={(e)=>{this.props.dispatch(actions.logout()), this.props.router.push('/')}} label="Выйти" style={{textAlign:'right', padding:'7px 8px'}} size="btn-xs" color="btn-warning"   /> 
        </div>
      </div>
		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    name:state.app.username,
    isSent: state.retailer.addSuccess,
    errors: state.retailer.errors,
    countryName: state.app.country&&state.app.country.name

  };
}
export default connect(mapStateToProps)(Profile);
