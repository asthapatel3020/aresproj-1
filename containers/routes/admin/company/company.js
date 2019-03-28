import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Form from './form'
import Modal from 'react-modal'
import { arrayPush, arrayInsert, arrayRemove } from 'redux-form';

Modal.setAppElement('#wrapperContainer')


class Company extends Component  {




	render() {
		const {open, onClose, token} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(2)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title" style={{marginBottom:15}}>Company info</div>
					<div style={{maxHeight:400, minHeight:200, overflow:'auto'}}>
						<Form 
							handleAdd={()=>this.handleAdd()}
							token={token}
							/>
						
					</div>
					<div>
						
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(Company);

