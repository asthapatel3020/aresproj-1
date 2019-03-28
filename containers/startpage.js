import React, { Component } from 'react';
import { connect } from 'react-redux';

class Startpage extends Component {
	render() {
		return (
			<div className="start-page d-flex align-items-center justify-content-center" style={{height:'100%'}}>
				<div className="logo-main"></div>
			</div>
		)
	}
}
export default Startpage