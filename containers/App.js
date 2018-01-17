/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule App
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Landing from './Landing';
import Header from './Header';
import Menu from './Menu';
import Signup from './Signup';
import * as actions from '../actions';
import { bindActionCreators } from "redux";
import { fetchMe, auth, signup, logout, isAuthenticated } from '../actions';
import '../dist/css/loading.css';
import Loading from 'react-loading-bar'

var shallowCompare = require('react-addons-shallow-compare');

class App extends Component {
  constructor(props) {
    super(props);
  }

  shouldComponentUpdate(nextProps, nextState) {

    return shallowCompare(this, nextProps, nextState);
  }
  
  componentDidMount() {
    this.props.dispatch(isAuthenticated());
  }

  render() {
    const { location, children, loggedIn, user, dispatch } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);
    console.log("log", loggedIn)
    if (!loggedIn) {
      if (value === 'signup') {
        return (
          <Signup onSignup={(email, companyName)=>dispatch(signup(email, companyName))} />
        );
      } else {
        return (
          <Landing onLogin={(email,password)=>dispatch(auth(email, password))} />
        );  
      }
      
    } else {
      return (
        <section className="vbox">
         <Loading
          show={this.props.isLoading}
          color="#ffc333"
          showSpinner={true}
        />
          <section>
              <section className="hbox stretch">
                  <Menu user={user}
                    currentPage={value} />
                  <section id="content">
                    <Header user={user} route={this.props.routes[1]} />
                    {children}
                  </section>
              </section>
          </section>
        </section>
      );      
    }
  }
}

function mapStateToProps(state) {
  return {
    loggedIn: state.app.loggedIn,
    token: state.app.token,
    user: state.user,
    isLoading: state.loading.loading
  };
}
// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(actions, dispatch)
// });
export default connect(mapStateToProps)(App);