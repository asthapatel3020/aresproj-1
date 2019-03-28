import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Table from './table'
import Form from './form'
import Modal from 'react-modal'
import { arrayPush, arrayInsert, arrayRemove } from 'redux-form';

Modal.setAppElement('#wrapperContainer')


class Docs extends Component  {
	state={currentDoc:'', currentDocIdx:0}

	// selectAttorney(e) {
	// 	this.props.dispatch(actions.selectAttorney(e))
	// }



	render() {
		const {open, onClose, docs, deleted_docs, token} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(8)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title" style={{marginBottom:15}}>Document types</div>
					<div style={{maxHeight:400, minHeight:200}}>
						<Form 
							deleted_docs={deleted_docs}
							handleDelete={()=>this.handleDelete()} 
							handleAdd={()=>this.handleAdd()}
							selectItem={(e,i)=>this.selectItem(e,i)}
							currentItem={this.props.currentDoc}
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
  	docs:state.documents.docs,
  	deleted_docs:state.city.deleted_docs,
  	currentDoc:state.city.currentDoc,
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(Docs);

