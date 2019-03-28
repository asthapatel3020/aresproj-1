import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
// import Form from './form'
import Modal from 'react-modal'

Modal.setAppElement('#wrapperContainer')



class Item extends Component  {
	

	render() {
		const {open, onClose, attornies, currentAttorney} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(15)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title">Add item</div>
					<div>
					qwe
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	attornies:state.attorney.attornies,
  	currentAttorney:state.attorney.currentAttorney,
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(Item);
