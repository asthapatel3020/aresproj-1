import React, {Component} from 'react';
import {Link} from 'react-router';
// import * as actions from '../../../../actions';
import { connect } from "react-redux";


class CommentPhoto extends Component  {

	render() {
		console.log("PATH2", this.props.path)
		return (
			<div 
				style={{
					height:'500px', 
					width:'100%', 
					backgroundImage:`url(${this.props.path})`,
					backgroundSize:'cover',
					backgroundRepeat:'no-repeat',
					backgroundPosition:'center'
				}}
			>
				
			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
	path:state.modal.path
  };
}
export default connect(mapStateToProps)(CommentPhoto);
