import React, { Component } from 'react';
import { connect } from 'react-redux';
import BillingInfoTable from './tables/billingInfoTable'
import ServicesAvailableTable from './tables/servicesAvailableTable'
import DiagnosisCodesTablePayments from './tables/diagnosisCodesTablePayments'
import { FieldArray, reduxForm, Field } from 'redux-form'
import BillDetailTable from './tables/billDetailTable'
import * as formValidates from '../../../components/form/formValidates'
import * as submitFuncs from './submitFunctions'
import * as actions from '../../../actions/index'
import * as forms from '../../../components/form/renderField'
import AddCode from './modals/addCode'
import * as utils from '../../../components/functions/functions'

const validate = formValidates.validate

class Billing extends Component {
	state={currentProvider:0, currentServiceType:0, currentBill:0, currentBillDetail:0, diagnosisCodes:'', codesModalOpen:false}
	componentWillMount() {
		const {billing} = this.props
		// billing.treating_providers.length>0&&
		// billing.treating_providers[0].specialties.length>0&&
		// billing.treating_providers.length>0&&this.setState({currentBill:billing.treating_providers[0].specialties[this.state.currentServiceType].services[0]})
		this.props.dispatch(actions.loadCodes([]))
		this.props.dispatch(actions.setBilled([]))
	}
	chooseBill(e) {
		this.setState({currentBill:e})
		this.props.dispatch(actions.selectBill(e))
	}
	addCodes() {

	}
	componentWillUnmount() {
		this.props.dispatch(actions.selectProvider(0))
	}
	openModal() {
		this.setState({codesModalOpen:true})
	}
	hideModal() {
		this.setState({codesModalOpen:false})
	}
	chooseDetail(e) {

	}
	selectProvider(e) {
		this.setState({currentProvider:e})
		this.props.dispatch(actions.selectProvider(e))
	}
	selectServiceType(e) {
		this.setState({currentServiceType:e})
		this.props.dispatch(actions.selectServiceType(e))
	}
	setBilled(e) {
		console.log('setBilled', e.visit_id)
		this.props.dispatch(actions.setBilled([...this.props.setBilled, e]))
	}
	render() {
		const {billing, dispatch, visitRegistry} = this.props
		const {currentProvider, currentServiceType, codesModalOpen} = this.state
		// const filteredProviders = billing.treating_providers.filter(e=>e.provider_id)
		console.log('currentProivder', this.props.setBilled)
		return (
			<div className="screen-container d-flex">
         		<AddCode 
         			payment 
         			hideModal={()=>this.hideModal()} 
         			open={codesModalOpen} 
         			onClose={()=>this.setState({addCodeState:false})}
         			currentProvider={this.props.currProvider}
					currentServiceType={this.props.currentServiceType}/>

				<form className="d-flex" style={{width:'100%'}}>
					<div className="registry-block d-flex" style={{marginRight:'0.3rem', width:'60%', borderTop:'none'}}>
						<div style={{width:'63%', maxWidth:'63%', borderRight:'1px solid grey', marginRight:'0.6rem', borderTop:'1px solid grey'}}>
							<div className="d-flex" style={{minHeight:120}}>
								<div style={{width:'50%', borderRight:'1px solid grey'}}>
									<div className="table-title" >Treating Providers Office</div>
									<div className="bar" style={{display:'block'}}>
											{billing.treating_providers.map((e,i)=>(
												 <div 
												 	className="hover-block"
												 	style={{background:currentProvider==i&&'#cff3ff'}}
												 	onClick={()=>this.selectProvider(i)} 
												 	key={i}>{e.provider_name}</div>
											))}
									</div>
									
								</div>
								<div style={{width:'50%'}}>
									<div className="table-title">Service type</div>
									<div className="bar">
										{billing.treating_providers.length>0&&
											billing.treating_providers[currentProvider].specialties.map((e,i)=> (
											<div 
												className="d-flex hover-block"
												onClick={()=>this.selectServiceType(i)}
												key={i}
												style={{background:currentServiceType==i&&'#cff3ff', padding:0}}>
												<div style={{borderRight:'1px solid grey', width:'25%'}}>{e.specialty_code}</div>
												<div>{e.specialty_nm}</div>
											</div>
										))}
									</div>
								</div>
							</div>

							<div >
								<div className="table-title">Billing Info</div>
								<BillingInfoTable 
									chooseBill={(e)=>this.chooseBill(e)}
									currentBill={this.state.currentBill}
									currentProvider={currentProvider}
									data={billing.treating_providers.length>0&&
										billing.treating_providers[currentProvider].specialties.length>0?
										billing.treating_providers[currentProvider].specialties[currentServiceType].services:
										[]}/>
							</div>
							
						</div>
						<div style={{width:'37%', maxWidth:'37%', borderLeft:'1px solid grey', borderTop:'1px solid grey'}}>
							<div style={{minHeight:'250px'}}>
								<div className="table-title">Services Available for Billing</div>
								<ServicesAvailableTable 
									currentProvider={this.props.currProvider}
									setBilled={(e)=>this.setBilled(e)}
								/>
							</div>
							<div >
								<div className="table-title">Diagnosis Codes assigned to Bill</div>
								{
									<DiagnosisCodesTablePayments 
									dispatch={dispatch}
									addCodes={()=>this.openModal()}
									// selectCode={(e)=>this.selectCode(e)}
									currentProvider={this.props.currProvider}
									currentServiceType={this.props.currentServiceType}
									currentBill={this.props.currentBill}
									loadCodes={()=>this.props.load(visitRegistry.patient_diagnosis_codes)}/>
								}
							</div>
						</div>
					</div>
					<div className="registry-block" style={{marginLeft:'0.3rem', width:'40%', minHeight:200}}>
						<div className="table-title" >Bill Detail</div>
						<BillDetailTable 
							currentBill={this.state.currentBill}
							chooseDetail={(e)=>this.chooseDetail(e)}
							currentProvider={this.props.currProvider}
							currentServiceType={this.props.currentServiceType}
						/>
					</div>
				</form>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    billing:state.billing.billing,
    visitRegistry:state.patient.visitRegistry,
    currProvider:state.billing.currentProvider,
    setBilled:state.billing.setBilled,
    currentServiceType:state.billing.currentServiceType,
    currentBill:state.billing.currentBill
  };
}

const TempVisitRegistry = connect(mapStateToProps)(Billing);


const Form = reduxForm({ 
  form: 'billing',
  onSubmit:submitFuncs.submitBilling,
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(TempVisitRegistry);

export default connect(
	state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
		setBilled:state.billing.setBilled,

		initialValues: {
			token:state.app.token,
			allBills:state.billing.billing,
			patientId:state.patient.patient.patient_id,
			
		},
	}),
  {load:actions.loadCodes}
)(Form)