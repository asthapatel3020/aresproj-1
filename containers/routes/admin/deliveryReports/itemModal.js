import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Modal from 'react-modal'
import * as utils from '../../../../components/functions/functions'
import ItemsTable from './itemsTable'
Modal.setAppElement('#wrapperContainer')



class ItemModal extends Component  {

	render() {
		const {open, onClose, currentItem} = this.props
		console.log('currentItem', currentItem.rent_items)
		let arr = currentItem?currentItem.rent_items.concat(currentItem.sell_items):[]
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose()}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem', maxHeight:600, overflow:'auto'}}>
					<div className="modal-title" style={{borderBottom:'1px solid grey'}}>Item details</div>
					<div style={{padding:'1rem'}}>
						<ItemsTable items={arr}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
 
  };
}
export default connect(mapStateToProps)(ItemModal);
