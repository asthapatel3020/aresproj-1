import React, { Component } from 'react';
import { connect } from 'react-redux';
import BillingInfoTable from './tables/billingInfoTable'
import ServicesAvailableTable from './tables/servicesAvailableTable'
import DiagnosisCodesTables from './tables/diagnosisCodesTables'
import BillDetailTable from './tables/billDetailTable'
import InsuranceTable from './tables/insuranceTable'
import BillingInfoPaymentsTable from './tables/billingInfoPaymentsTable'
import PaymentRegistryTable from './tables/paymentRegistryTable'
import {reduxForm, formValueSelector, arrayPush, arrayRemove } from 'redux-form'
import * as submitFuncs from './submitFunctions'
import * as formValidates from '../../../components/form/formValidates'
import Notes from './tables/notesTable'
import * as actions from '../../../actions'
import TreatmentsInfo from './treatmentsInfoForm'

const validate = formValidates.validate


class PaymentsAndCollection extends Component {
	selectTreatment(e) {
		this.props.dispatch(actions.selectCurrentTreatment(e))
	}
	selectPayment(e) {
		console.log('yes')
		this.props.dispatch(actions.selectCurrentPayment(e))
	}
	addPayment() {
    	this.props.dispatch(arrayPush('paymentsCollectionsForm', `paymentsCollections[${this.props.currentTreatment}].payments`, {}))
		
	}
	
	deletePayment() {
		if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
    		this.props.dispatch(arrayRemove('paymentsCollectionsForm', `paymentsCollections[${this.props.currentTreatment}].payments`, this.props.currentPayment))
          }
		
	}
	deleteNote(e) {
		this.props.dispatch(arrayRemove('paymentsCollectionsForm', `events`, e))
	}
	render() {
		console.log('totals', this.props.insurances )
		const {totals, insurances, currentTreatment, paymentSources, currentPayment, events, subjects} = this.props
		return (
			<div className="screen-container d-flex">
			<form action="" className="d-flex" style={{width:'100%'}}>
				<div className="registry-block" style={{marginRight:'0.5rem', width:'80%'}}>
					<div>
						<InsuranceTable insurances={insurances.length>0?insurances[0]:[]}/>
					</div>
					<div className="d-flex flex-column justify-content-between align-items-end" style={{minHeight:400, overflowX:'auto'}}>
						<div style={{width:'100%'}}>
							<div className="table-title" >Billing Info</div>
							<BillingInfoPaymentsTable 
								data={this.props.services} 
								selectTreatment={(e)=>this.selectTreatment(e)}
								currentTreatment={currentTreatment}
								billStatuses={this.props.billStatuses}/>
							<div style={{marginTop:10, marginLeft:'65%'}} className="d-flex">
								<div style={{minWidth:50, fontWeight:500, border:'1px solid gray', padding:2}}>{totals.totalBilled}</div>
								<div style={{minWidth:50, fontWeight:500, border:'1px solid gray', padding:2}}>{totals.totalPaid}</div>
								<div style={{minWidth:50, fontWeight:500, border:'1px solid gray', padding:2}}>{totals.totalAdjust}</div>
								<div style={{minWidth:50, fontWeight:500, border:'1px solid gray', padding:2}}>{totals.totalBalance}</div>
							</div>
						</div>
						
					</div>
					<div className="d-flex">
						<div style={{width:'55%', borderRight:'1px solid grey'}}>
							<div className="table-title" >Payment Registry</div>
							<PaymentRegistryTable 
								paymentSources={paymentSources}
								currentTreatment={currentTreatment}
								selectPayment={(e)=>this.selectPayment(e)}
								currentPayment={currentPayment}
							/>
						</div>
						<div style={{width:'45%', borderTop:'1px solid grey'}}>
							<TreatmentsInfo  
								attornies={this.props.attornies}
								currentTreatment={currentTreatment}
								addPayment={()=>this.addPayment()}
								deletePayment={()=>this.deletePayment()}
							/>
						</div>
					</div>
				</div>
				<div className="registry-block" style={{width:'22%'}}>
					<div className="table-title">Notes</div>
					<Notes  
						events={events} 
						subjects={subjects}
						deleteNote={(e)=>this.deleteNote(e)}/>
				</div>
			</form>
				

			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    services:state.paymentsCollections.services,
    billStatuses:state.billStatuses.statuses,
    totals:state.paymentsCollections.totals,
    insurances:state.insurances.insurances,
    currentTreatment:state.paymentsCollections.currentTreatment,
    attornies:state.attorney.attornies,
    paymentSources:state.paymentsCollections.paymentSources,
    currentPayment:state.paymentsCollections.currentPayment,
    events:state.paymentsCollections.events,
    subjects:state.notes.subjects
  };
}
const TempPaymentsCollections = connect(mapStateToProps)(PaymentsAndCollection);

const selector = formValueSelector('paymentsCollectionsForm');

const Form = reduxForm({ 
  form: 'paymentsCollectionsForm',
  onSubmit:submitFuncs.submitPayments,
  validate,
  keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
})(TempPaymentsCollections);

export default connect(
	state =>({
    	currentTreatmentObj: selector(state, `paymentsCollections[${state.paymentsCollections.currentTreatment}]`),
    	patient:state.patient.patient,
		token:state.app.token,
		initialValues: {
			// paymentsCollections:[{bill_id:123}]
			paymentsCollections:state.paymentsCollections.services,
			events:state.paymentsCollections.events
		}
	}),
  // {load:actions.loadCodes}
)(Form)
