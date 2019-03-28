import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Table from './table'
import Form from './form'
import Modal from 'react-modal'
import { arrayPush, arrayInsert, arrayRemove } from 'redux-form';

Modal.setAppElement('#wrapperContainer')


class BillStatus extends Component  {
	state={currentStatus:'', currentStatusIdx:0}

	// selectAttorney(e) {
	// 	this.props.dispatch(actions.selectAttorney(e))
	// }



	render() {
		const {open, onClose, statuses, deleted_statuses} = this.props
		console.log('sTATUSES', this.props.deleted_statuses)
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(3)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title" style={{marginBottom:15}}>Bill Statuses</div>
					<div style={{maxHeight:400, minHeight:200}}>
						<Form 
							deleted_statuses={deleted_statuses}
							handleDelete={()=>this.handleDelete()} 
							handleAdd={()=>this.handleAdd()}
							selectItem={(e,i)=>this.selectItem(e,i)}
							currentItem={this.props.currentStatus}
							statuses={statuses}/>
						
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
  	statuses:state.billStatuses.statuses,
  	deleted_statuses:state.billStatuses.deleted_statuses,
  	currentStatus:state.billStatuses.currentStatus
  };
}
export default connect(mapStateToProps)(BillStatus);

