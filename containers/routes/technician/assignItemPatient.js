import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
// import Table from './table'
// import Form from './form'
import Modal from 'react-modal'
import Form from './assignFormPatient'
import axios from 'axios'
import qs from 'qs'
import {reset} from 'redux-form';

Modal.setAppElement('#wrapperContainer')



class AssignItemPatient extends Component  {
	state={}
	
	handleSubmit(e) {
		console.log(e)
		let finalArr = []
		e.items.map(r=>finalArr.push({
			patient_id:e.patient_id.value,
			item_id:r.item.item_id,
			quantity:r.quantity,
			company_id:'AR'
		}))
		console.log('finalArr', finalArr)
		this.props.dispatch({type:'DO_REQUEST'})
         	axios.put(`${actions.API_URL}patients/${e.patient_id.value}/inventory`,
					qs.stringify({items:finalArr}),
		         {
		        headers:{ 'Authorization': "bearer " + this.props.token}
		        }).then(res=> {
		        	// this.props.dispatch(actions.getItems(this.props.token))
					this.props.dispatch({type:'DO_SUCCESS'})
					this.props.dispatch(reset('assignItemFormPatient'))
					this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully edited!'})
					console.log('res',res)
		          return res;
		        }).catch(err=> {
					this.props.dispatch({type:'DO_FAILURE'})
		        	console.log('err', err)
		        	return false
		        })
	}
	getAsyncPatients(e) {
		e&&this.props.dispatch(actions.getAsyncPatients(e, this.props.token))
	}
	render() {
		const {token, onClose, open, itemForEdit, items, patientsList} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose()}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem', maxHeight:600, overflow:'auto'}}>
					<div className="modal-title">Add item to inventory</div>
					<div style={{padding:'1rem'}}>
						<Form 
							items={items} 
							getAsyncPatients={(e)=>this.getAsyncPatients(e)}
							patientsList={patientsList} 
							onSubmit={(e)=>this.handleSubmit(e)}/>
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
  	items:state.items.items,
  	patientsList:state.patients.patientsForSelect
  };
}
export default connect(mapStateToProps)(AssignItemPatient);
