import React, { Component } from 'react';
var shallowCompare = require('react-addons-shallow-compare');
import { connect } from 'react-redux';
import * as actions from '../actions';
import Menu from '../components/widgets/menu'

class Header extends Component {

  handleOnScreen() {
      $("#nav").toggleClass('nav-off-screen');
  }
  logout() {
    this.props.dispatch(actions.logout(this.props.token))
    this.props.router.push('/')
  }
  
	render() {
    console.log('USER', this.props.user)
	  return (
      <div className="header" >

        <div className="row align-items-center" style={{width:'100%', height:'100%', padding:'0 1rem'}}>
          <div className="col-4">
            <div className="logo-header"></div>
          </div>
          <div className="col-6 menu">
            <Menu 
              role={this.props.user?this.props.user.role:''} 
              router={this.props.router} 
              dispatch={this.props.dispatch}
              openModal={(e)=>this.props.openModal(e)}/>
          </div>
          <div onClick={()=>this.logout()} className="col-1 offset-1 a-hover" style={{color:'#fff', fontWeight:500, fontSize:'0.9rem'}}>
            LOGOUT
          </div>
        </div>
        
      </div>
		);
	}
}
const mapStateToProps=(state)=> {
  return {
    token: state.app.token,
    loggedIn: state.app.loggedIn,
    token:state.app.token,
    user:state.app.user

  };
}

export default connect(mapStateToProps)(Header)
