import React, { Component } from 'react';
import { connect } from 'react-redux';
import ServicesTable from './tables/servicesTable'
import TreatmentsTable from './tables/treatmentsTable'
import Select from '../../../components/ui/itemSelect'
import DiagnosisCodesTable from './tables/diagnosisCodesTables'
import { FieldArray, reduxForm, Field, arrayRemove, formValueSelector } from 'redux-form'
import * as formValidates from '../../../components/form/formValidates'
import * as submitFuncs from './submitFunctions'
import * as forms from '../../../components/form/renderField'
import * as actions from '../../../actions/index'
import AddTreatment from './modals/addTreatment'
import AddCode from './modals/addCode'

const validate = formValidates.validate

class VisitRegistry extends Component {
	state={providerOffice:'', currentService:0, currentTreatment:0, currentCode:0, addCodeState:false}

	handleSelect(e) {
		this.setState({providerOffice:e})
	}
	componentWillMount() {
		this.props.dispatch(actions.resetDeletedServices())
	}
	componentDidMount() {
		this.props.dispatch(actions.selectCurrentService(0, this.props.visitRegistry.services[0]))

	}
	chooseService(e) {
		this.setState({currentService:e})
		this.props.dispatch(actions.selectCurrentService(e))
	}
	selectTreatment(e) {
		this.setState({currentTreatment:e})
	}
	selectCode(e) {
		this.setState({currentCode:e})
	}

	addTreatments() {
		this.setState({addTreatmentState:true})
	}
	hideModal() {
		this.setState({addTreatmentState:false})
	}
	hideModal1() {
		this.setState({addCodeState:false})
	}
	addCodes() {
    	this.setState({addCodeState:true})
	}
	deleteService(e) {
		const {currentService, deleted_services, currentServiceObject, dispatch} = this.props
		console.log('currentServObj', currentServiceObject)
		if (currentServiceObject.visit_id == undefined) {
          console.log('netid', currentService)
          if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
            dispatch(arrayRemove('visitRegistry', `serviceList`, currentService))
          }
        } else  {
          console.log('estid', currentService)
          if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
          	console.log('estid', currentService)
            dispatch(arrayRemove('visitRegistry', `serviceList`, currentService))
            dispatch(actions.deleteService([...deleted_services, currentServiceObject.visit_id]))
          }
          
        }
	}
	render() {
		const {visitRegistry, dispatch, providers, currentServiceObject} = this.props
		const {currentService, addCodeState, addTreatmentState} = this.state
		console.log('servicesLIST', this.props.initialValues)
		console.log('DELETEDSERVICES', this.props.deleted_services)
		return (
			<div className="screen-container d-flex  align-items-start">
         		<AddCode hideModal={()=>this.hideModal1()} open={addCodeState} onClose={()=>this.setState({addCodeState:false})}/>
         		<AddTreatment hideModal={()=>this.hideModal()} open={addTreatmentState} onClose={()=>this.setState({addTreatmentState:false})}/>
				<form onSubmit={this.handleSubmit}></form>
				<div className="registry-block" style={{width:'20%', marginRight:10}}>
					<div >
						<div className="table-title">Treating Provider (Office)</div>
						<div style={{padding:'0.5rem 1rem', lineHeight:'1.8'}}>
							<Field 
							name={`serviceList[${this.state.currentService}].doctor_id`}  
							placeholder={'Choose treating provider'} 
							component={forms.tableSelect} 
							options={providers}/>
						</div>
					</div>
					<div>
						<div className="table-title">Services</div>
						<ServicesTable 
							chooseService={(e)=>this.chooseService(e)} 
							currentService={currentService}
							services={visitRegistry.services} 
							serviceList={this.props.services}
							deleteItem={()=>this.deleteService()}
							dispatch={dispatch}
							deleteService={(e)=>this.deleteService(e)}/>
					</div>
				</div>
				<div className="registry-block" style={{marginRight:10}}>
					<div style={{width:'100%'}}>
						<div className="table-title">Treatments assigned to Service</div>
						<div style={{minHeight:100}}>
							<TreatmentsTable 
								dispatch={dispatch}
								addTreatments={()=>this.addTreatments()}
								selectTreatment={(e)=>this.selectTreatment(e)} 
								currentTreatment={this.state.currentTreatment}
								currentService={visitRegistry.services[currentService]}
								currentServiceIdx={currentService}
								// treatments={visitRegistry.services[currentService]?visitRegistry.services[currentService].treatments:[]}
							/>
						</div>
					</div>
					
				</div>
				<div style={{width:'30%'}} className="registry-block">
						<div className="table-title">Diagnosis Codes Assigned to Patient</div>
						<DiagnosisCodesTable 
							isSpec 
							dispatch={dispatch}
							selectCode={(e)=>this.selectCode(e)} 
							currentCode={this.state.currentCode}
							addCodes={()=>this.addCodes()}
							specialties={this.props.specialties}
						/>
				</div>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    visitRegistry:state.patient.visitRegistry,
    services:state.services.services,
    currentService:state.services.currentService,
    providers:state.treatingProviders.providers,
    patient:state.patient.patient,
    specialties:state.specialties.specialties,
    deleted_services:state.services.deletedServices
  };
}
const TempVisitRegistry = connect(mapStateToProps)(VisitRegistry);

const selector = formValueSelector('visitRegistry');

const Form = reduxForm({ 
  form: 'visitRegistry',
  onSubmit:submitFuncs.submit,
  validate,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  onChange: (value, dispatch, props) => {
        console.log('CHANGEDPROPS', value);
   }
})(TempVisitRegistry);

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
  	currentServiceObject:selector(state, `serviceList[${state.services.currentService}]`),
	deleted_services:state.services.deletedServices,
  initialValues: {
  	token:state.app.token,
  	patientId:state.patient.patient.patient_id,
  	DiagnosisCodes1:state.patient.visitRegistry.patient_diagnosis_codes,
    serviceList:state.patient.visitRegistry.services,
    [`serviceList[${state.services.currentService}].doctor_id`]:state.patient.visitRegistry.services[state.services.currentService]?
    state.patient.visitRegistry.services[state.services.currentService].doctor_id:
    ''
    	
  },
}),
)(Form)
