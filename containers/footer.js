import React, { Component } from 'react';
import { connect } from 'react-redux';

class Footer extends Component {
	render() {
		return (
			<div >
				
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient
  };
}
export default connect(mapStateToProps)(Footer);