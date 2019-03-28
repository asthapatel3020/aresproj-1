import React, {Component} from 'react';
import {Link} from 'react-router';
// import * as actions from '../../../../actions';
import { connect } from "react-redux";


class CommentPhoto extends Component  {

	render() {
		console.log("OPENED")
		return (
			<div style={{width:'40%'}}>
				HELLO
			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
  };
}
export default connect(mapStateToProps)(CommentPhoto);
