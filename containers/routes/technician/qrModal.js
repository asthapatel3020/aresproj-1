import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
// import Table from './table'
// import Form from './form'
import Modal from 'react-modal'
import Form from './form'
import axios from 'axios'
import qs from 'qs'
import { QRCode } from 'react-qr-svg'
import ReactToPrint from 'react-to-print'


Modal.setAppElement('#wrapperContainer')



class QRModal extends Component  {
	state={}
	
	
	render() {
		const {token, onClose, open, itemQR} = this.props
		delete itemQR.value
		console.log('itemQR', itemQR)

		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose()}>

				<div style={{width:400, height:400, background:'#fff', padding:'0.5rem'}} className="d-flex justify-content-center flex-column align-items-center">
					<div ref={el => (this.componentRef = el)} style={{marginBottom:10}}>
						<QRCode
		                    // bgColor="#FFFFFF"
		                    // fgColor="#000000"
		                    // level="Q"
		                    style={{ width: 330 }}
		                    
		                    value={JSON.stringify(itemQR)}
		                />
					</div>
					
                <div className="d-flex justify-content-center">
                	<ReactToPrint
			          trigger={() => <button className="print-btn">PRINT CODE</button>}
			          content={() => this.componentRef}
			        />
                </div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token,
  	itemForEdit:state.items.itemForEdit,
  	items:state.items.items
  };
}
export default connect(mapStateToProps)(QRModal);
