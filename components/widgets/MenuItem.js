/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule MenuLink
 */

import React from 'react';
import { Link } from 'react-router';

const getRouteName=(name)=> {

  switch (name.split("/")[0]) {
    case'graphic_by_doctor':
      return 'graphic by doctor'
    case'uploadMatrix':
      return 'upload matrix'
    case '':
      return 'graphic';
  }
}

export default class MenuItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open : false
    }
  }

  renderSubMenu() {
    if (!this.props.children) return null;
    return (
      <ul className="nav lt" style={this.state.open ? {display:'block'} : {}}>
        {this.props.children}
      </ul>
    )
  }

  toggleOpen(e) {
    e.preventDefault();
    this.setState({open:!this.state.open});
  }

	render() {
		var iconClasses = 'm-l-md fa icon ' + this.props.icon;
    var itemClass = this.props.linkText.toLowerCase() == this.props.currentPage ? 'active' : '';
    let thisRoute = getRouteName(this.props.currentPage);
    var isActive = this.props.linkText.toLowerCase() == thisRoute ? true : false;
		var badge = this.props.badgeCount ? <b className="badge bg-danger">{this.props.badgeCount}</b> : null; 

    if (this.props.children) {
      return (
        <li className={itemClass}>
          <a className={itemClass} href="#" onClick={(e)=>this.toggleOpen(e)}>
            <i className={iconClasses}></i>
              {badge}
            <span>{this.props.linkText}</span>
          </a>
          {this.renderSubMenu()}
        </li>
      );
    } else {
      return (
        <li className={`''${itemClass}`}>
          <Link className={itemClass} to={this.props.link}>
            <div className="menu-block">
              <div>
                <span>{this.props.linkText}</span>
              </div>
              <div className="radio-menu">
                <input type="radio" id={this.props.linkText} readOnly checked={isActive&&"true"}/>
                <label htmlFor={this.props.linkText}></label>
              </div>
            </div>
          </Link>
        </li>
		  );
    }
	}
}
