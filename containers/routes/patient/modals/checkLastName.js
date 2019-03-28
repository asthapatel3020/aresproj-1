import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
import Table from '../tables/checkLastNameTable'
import SearchInput, {createFilter} from 'react-search-input'
import { arrayPush} from 'redux-form';
import Modal from 'react-modal'


Modal.setAppElement('#wrapperContainer')

class AddTreatment extends Component  {
	state={searchTerm:''}
	
	choosePatient(id) {
		if (window.confirm('Are you sure you want to load this patient?')) {

			this.props.dispatch(actions.choosePatient(id, this.props.token))
	  		this.props.dispatch(actions.getBillingInfo(id, this.props.token))
	  		this.props.dispatch(actions.getPatientVisitRegistry(id, this.props.token))
	  		this.props.dispatch(actions.getPayments(id, this.props.token))
	  		this.props.dispatch(actions.getInsurances(id, this.props.token))
	  	}
	  	this.props.onClose('noalert')
	}
	render() {
		// console.log('asd', this.props)
		const {patients, open, onClose} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		// style={styles}
           		onRequestClose={()=>onClose()}>
				<div style={{width:500, maxHeight:500, overflow:'auto', minHeight:500, background:'#fff'}}>
					
					<div style={{minHeight:160}}>
						<Table patients={patients} choosePatient={(id)=>this.choosePatient(id)}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	patients:state.patients.patientsForLastName,
  	token:state.app.token

  };
}
export default connect(mapStateToProps)(AddTreatment);
