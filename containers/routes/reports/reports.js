import React, { Component } from 'react';
import { connect } from 'react-redux';
import PaymentsByProvider from './billing/paymentsByProvider/paymentsByProvider'
import BillingByProvider from './billing/billingByProvider/billingByProvider'
import PatientBillingHistory from './billing/patientBillingHistory/patientBillingHistory'
import PaymentRegister from './billing/paymentRegister/paymentRegister'
import ArbitrationByProvider from './billing/arbitrationByProvider/arbitrationByProvider'
import ListOfPatients from './patients/listOfPatients/listOfPatients'
import WithoutPickup from './patients/withoutPickup/withoutPickup'
import ReadyForBilling from './patients/readyForBilling/readyForBilling'
import ActivePatientIns from './patients/activePatientIns/activePatientIns'
import * as actions from '../../../actions'
class Reports extends Component {
	state = {
		modalState1:false,
	    modalState2:false,
	    modalState3:false,
	    modalState4:false,
	    modalState5:false,
	    modalState6:false,
	    modalState7:false,
	    modalState8:false,
	    modalState9:false,
	    modalState10:false,
	    modalState11:false,
	    modalState12:false,
	    modalState13:false,
	    modalState14:false,
	    modalState15:false,
	    modalState16:false
	}
	componentWillMount() {
	}
	componentWillReceiveProps(nextProps) {
		this.props.modal!==nextProps.modal&&this.setState({[`modalState${nextProps.modal}`]:true})
	}
	openModal(modal) {
	    this.setState({[`modalState${modal}`]:true})
	  }
	  closeModal(modal, withoutAlert) {
	    	
	      if (window.confirm('Are you sure you want to close the window?')) {
	        this.setState({[`modalState${modal}`]:false})
			this.props.dispatch(actions.openReportsModal(0))

	      }
	    
	  }
	render() {
		console.log('reportsModals', this.props.modal)
		return (
			<div>
				<ArbitrationByProvider open={this.state.modalState5} onClose={(e)=>this.closeModal(e)}/>
				<ReadyForBilling open={this.state.modalState8} onClose={(e)=>this.closeModal(e)}/>
				<ActivePatientIns open={this.state.modalState9} onClose={(e)=>this.closeModal(e)}/>
				<WithoutPickup open={this.state.modalState7} onClose={(e)=>this.closeModal(e)}/>
				<ListOfPatients open={this.state.modalState6} onClose={(e)=>this.closeModal(e)}/>
				<PatientBillingHistory open={this.state.modalState2} onClose={(e)=>this.closeModal(e)}/>
				<PaymentsByProvider open={this.state.modalState1} onClose={(e)=>this.closeModal(e)}/>
				<BillingByProvider open={this.state.modalState3} onClose={(e)=>this.closeModal(e)}/>
				<PaymentRegister open={this.state.modalState4} onClose={(e)=>this.closeModal(e)}/>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    token:state.app.token,
    modal:state.reports.modal
  };
}
export default connect(mapStateToProps)(Reports);