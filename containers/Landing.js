/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Landing
 */

import React, { Component } from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import ModalFactory from '../components/modals/factory';
import Login from '../components/modals/Login';
import Signup from '../components/modals/Signup';
import * as actions from '../actions';
import {Button, I} from '../components/ui/';

const LogoStyle = {
	display: 'inline',
    clear: 'both',
    width: 100,
    marginBottom:20
}
var shallowCompare = require('react-addons-shallow-compare');

class Landing extends Component {

	handleLoginPress(e) {
		e.preventDefault();
		ModalFactory.show('loginModal');
	}

	handleSignupPress(e) {
		e.preventDefault();
		ModalFactory.show('signupModal');
	}

	handleLogin(email,pass) {
		ModalFactory.hide('loginModal');
		this.props.onLogin(email, pass);
	}

	shouldComponentUpdate(nextProps, nextState) {
    	return shallowCompare(this, nextProps, nextState);
  	}

	render() {

		var Factory = ModalFactory.modalFromFactory;
		this.props.loggedIn&&ModalFactory.hide('loginModal');
		return (
			<div className="start-page" >
			<div className="login-form">
				<div>
					<Login/>
				</div>
				
			</div>
				
           
			</div>
		);
	}
}
function mapStateToProps(state) {
  return {
    loggedIn: state.app.loggedIn
  };
}
export default connect(mapStateToProps)(Landing);
