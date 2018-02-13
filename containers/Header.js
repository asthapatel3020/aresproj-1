/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Header
 */

import React, { Component } from 'react';

import Profile from '../components/widgets/Profile';
var shallowCompare = require('react-addons-shallow-compare');

export default class Header extends Component {

  constructor(props) {
      super(props)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleOnScreen() {
      $("#nav").toggleClass('nav-off-screen');
  }
  
	render() {
    const {route} = this.props;
    let breadCrumbs=[], currPath;
    if (route.path) {
    const routes =route.pageDescription.split("/")
    
    routes.forEach((item, i)=> breadCrumbs[i]={name:item, url:i==0?"/"+route.path.split("/")[1]:"/"+route.path.split("/")[1]+"/"+route.path.split("/")[2]})
    currPath = route.path.match(":")?route.path.split(":")[0].slice(0,-1):route.path;
    }
	  return (
      <div className="lock-header subheader m-b-lg"> 
        <div className="container full"> 
          <div className="m-b-lg"> 
            {route.path&&<div className="pull-left w50 breads m-t-xs">
              {breadCrumbs.map((item, i)=>
                <span 
                  onClick={()=>this.props.router.push(item.url)} 
                  key={i} 
                  className={currPath==item.url?"current-route":""}
                >{item.name} / </span>)}
            </div>}
            <div className="pull-right w50 text-right">
              <ul style={{verticalAlign: 'top',marginLeft: 10}} className="nav navbar-nav navbar-right  nav-user">
                <Profile router={this.props.router} onLogout={this.props.onLogout} profile={this.props.user} />
              </ul>
            </div>
          </div> 
        </div> 
      </div>
		);
	}
}
