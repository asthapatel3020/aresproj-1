/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Login
 */

import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../../actions';
import Input from '../ui/Input';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      email: '',
	      password: '',
	      error:'',
	      endpoint:''
	    };
	}

	handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}
	
	handlePassChange(e) {
    	this.setState({ password: e.target.value });
  	}

  	handleLogin(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
      this.props.dispatch(actions.auth(this.state.email, this.state.password)); 
  	}

	render() {
    // console.log("app", this.props.app)
    const {dispatch} = this.props;

		return (
			<section className="wrapper-md animated fadeInUp">
        <form role="form">
        	<select name="account" className="form-control m-b"><option>select an endpoint</option> <option>localhost</option></select>
            <div className="form-group"><Input ref="emailRef" autoComplete={'off'} format="email" icon="fa fa-user" required={true} errorMessage="Please verify your email" placeholder="email" value={this.state.email} onFieldChange={(e)=>this.handleEmailChange(e)} /></div>
            <div className="form-group"><Input ref="loginRef" autoComplete={'off'} format="password" icon="fa fa-lock" required={true} errorMessage="Password is required" placeholder="password" value={this.state.password} onFieldChange={(e)=>this.handlePassChange(e)} /></div>
            <p className="help-block">{this.props.errorMessage ? this.props.errorMessage.message : ''}</p>
            <div className="form-group">
                <button type="button" onClick={(e)=>this.handleLogin(e)} className="btn btn-info btn-block w-pad">Login</button>
            </div>
            <div className="form-group">
              <p>{this.state.error}</p>
            </div>
            <div className="text-center">
              <a href="javascript:;" onClick={e=>dispatch(actions.logout())} className="w-login">Forgot your password?</a>
            </div>
        </form>
      </section>
		);
	}
}
const mapStateToProps = state => ({
    app: state.app
});

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(actions, dispatch)
// });

export default connect(mapStateToProps)(Login);
