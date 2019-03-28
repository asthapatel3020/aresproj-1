import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as utils from '../../../components/functions/functions'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import * as rdField  from '../../../components/form/renderField'
import * as formValidates  from '../../../components/form/formValidates'
import * as submitFuncs from './submitFunctions'
import * as actions from '../../../actions'
import { createTextMask} from 'redux-form-input-masks';
import CheckLastNameModal from './modals/checkLastName'

const phoneMask = createTextMask({
  pattern: '(999) 999-9999',
});

const SSNMask = createTextMask({
  pattern: '999-99-9999',
});

const dateMask = createTextMask({
	pattern: '99/99/99'
})
const validate = formValidates.validate

const changeFormPatient=(e, dispatch, props)=> {
	console.log('thispropschanged')
	dispatch(actions.alertToSave())
}
class PatientInfo extends Component {
	state={
		open:false,
		needToSave:false
	}
	
	componentDidMount() {

	}
	componentWillUnmount() {

  	}
  	handleSave() {
  		
  	}
  	componentWillReceiveProps(nextProps) {
 		this.props.patientsForLastName.length!==nextProps.patientsForLastName.length&&
 		nextProps.patientsForLastName.length>0&&
 		this.setState({open:true})
		console.log('thisprops', this.props, nextProps)
		this.props.lastName!==nextProps.lastName&&this.props.dispatch(actions.resetAlertToSave())

  	}
  	componentWillMount() {
  		this.props.dispatch(actions.resetPatientsForLastName())
  	}
  	checkLastName() {
  		console.log(this.props.lastName)
  		this.props.lastName.length>0&&this.props.dispatch(actions.checkLastName(this.props.lastName, this.props.token))
  	}
  	closeModal(noalert) {
  		if (noalert=='noalert') {
  			this.setState({open:false})
  		} else {
  			if (window.confirm('Are you sure you want to close the window?')) {
		  		this.setState({
		  			open:false
		  		})
	  		}
  		}
		
  	}
	render() {
		// console.log('patient', this.props.claimType!='N'||this.props.claimType.value!='N', this.props.claimType, this.props.claimType.value)
		const {open} = this.state
		const {offices, doctors, companies, claims, attornies, lastName, claimType} = this.props
		console.log('patient', claimType)
		let claim_type = (claimType&&claimType.value)?claimType.value:claimType
		return (
			<div className="screen-container">
			<CheckLastNameModal open={open} onClose={(e)=>this.closeModal(e)}/>
				<form action="" >
					<div className="row justify-content-center">
						<div style={{marginRight:'1.5rem'}} className="col-md-5 patient-card">
							<div className="row">
								<div className="col-5 d-flex" >
									<Field
					                    name="patient_last_nm"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Last name:"
					                    onChange={()=>console.log('THISPROPSCHAAAA123')}
					                    onBlur={()=>this.checkLastName()}
					                    />
								</div>
								<div className="col-2 d-flex" >
									<Field
					                    name="patient_mid_init"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Mid.:"
					                    />
								</div>
								<div className="col-5 d-flex" >
									<Field
					                    name="patient_first_nm"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="First name:"
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="patient_date_of_accident"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="DOA:"
					                    {...dateMask}
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="patient_date_of_birth"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="DOB:"
					                    {...dateMask}
					                    />
								</div>
								<div className="col-6" style={{marginTop:10}}>
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Gender:</div>
									<Field 
										name='patient_sex'  
										placeholder={'Select gender'}
										onChange={()=>console.log('THISPROPSCHAA111')} 
										component={rdField.tableSelect} 
										options={[{label:'Female', value:'F'}, {label:'Male', value:'M'}]}
									/>
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="patient_ssn"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="SSN:"
					                    {...SSNMask}
					                    />
								</div>
								
								<div className="col-12 d-flex" >
									<Field
					                    name="patient_address"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Address:"
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="patient_city"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="City:"
					                    />
								</div>
								<div className="col-2 d-flex" >
									<Field
					                    name="patient_state"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="St:"
					                    />
								</div>
								<div className="col-4 d-flex" >
									<Field
					                    name="patient_zip"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Zip:"
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="patient_home_phone"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Phone:"
					                    {...phoneMask}
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="patient_alternate_phone"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Alternate:"
					                    {...phoneMask}
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="emergency_contact_name"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Emerg. contact name:"
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="emergency_contact_phone"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Emerg. contact number:"
					                    {...phoneMask}
					                    />
								</div>
								<div className="col-10 d-flex" >
									<Field
					                    name="policy_holder"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Policy holder:"
					                    />
								</div>
								<div className="col-2 d-flex checkbox-patient flex-column" >
									<div style={{color:'#565656', fontWeight:500, fontSize:'1rem', marginTop:10}}>Self</div>
									<Field name={`ins_policy_self_flag`} component='input' type='checkbox'/>
								</div>
								

								
							</div>
						</div>
						<div style={{marginLeft:'1.5rem'}} className="col-md-5 patient-card">
							<div className="row">
								<div className="col-12" style={{marginTop:10}}>
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Office:</div>
									<Field 
										name='office_id'  
										placeholder={'Select office'} 
										component={rdField.tableSelect} 
										options={[{value:346, label:'Advanced Recovery Equip And Sup. LLC(1100 Coney Island Ave, 3rd Floor, Brooklyn)'}]}
										disabled/>
								</div>
								<div className="col-12" style={{marginTop:10}}>
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Doctor:</div>
									<Field 
										name='doctor_id'  
										placeholder={'Select doctor'} 
										component={rdField.tableSelect} 
										className="patient-card-select"
										options={doctors}
										disabled/>
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="first_visit_dt"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Registry date:"
					                    {...dateMask}
					                    />
								</div>
								<div className="col-6" >
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Status:</div>
									<Field 
										name='patient_status'  
										placeholder={'Select status'} 
										component={rdField.tableSelect} 
										options={[{value:1, label:'Active'},{value:0, label:'Inactive'}]}/>
								</div>
								<div className="col-6" >
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Claim type:</div>
									<Field 
										name='claim_type_cd'  
										placeholder={'Select status'} 
										className="select-top"
										component={rdField.tableSelect} 
										options={claims}/>
								</div>
								{claim_type!='N'&&<div className="col-6" >
									<Field
					                    name="wc_carrier_case_no"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Carrier #:"
					                    />
								</div>}
								{claim_type!='N'&&<div className="col-6" >
									<Field
					                    name="wcb_case_no"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="WCB Case #:"
					                    />
								</div>}
								<div className="col-12" style={{marginTop:10}}>
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Attorney:</div>
									<Field 
										name='lw_id'  
										placeholder={'Select attorney'} 
										component={rdField.tableSelect} 
										options={attornies}
									/>
								</div>
								<div className="col-12" >
									<div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Insurance company:</div>
									<Field 
										name='ic_id'  
										placeholder={'Select company'} 
										component={rdField.tableSelect} 
										className="select-top"
										options={companies}/>
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="contact_nm"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Adjuster:"
					                    
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="phone_num"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Phone number:"
					                    {...phoneMask}
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="policy_num"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Policy number:"
					                    
					                    />
								</div>
								<div className="col-6 d-flex" >
									<Field
					                    name="claim_num"
					                    component={rdField.renderField} 
					                    type="text"
					                    style={{width:'100%', padding:5}}
					                    label="Claim number:"
					                    />
								</div>
								<div className="col-12">
									<Field
					                    name="comments"
					                    component={rdField.renderTextarea} 
					                    style={{width:'100%'}}
					                    label="Comments:"
					                    />
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    doctors:state.treatingProviders.providers,
    offices:state.offices.offices,
    companies:state.insCompanies.companies,
    claims:state.claimTypes.claims,
    attornies:state.attorney.attornies,
    patientsForLastName:state.patients.patientsForLastName,
    token:state.app.token,
    needToSave:state.patient.needToSave
  };
}
const selector = formValueSelector('patientInfo');

const TempVisitRegistry = connect(mapStateToProps)(PatientInfo);


const Form = reduxForm({ 
  form: 'patientInfo',
  onChange:changeFormPatient,
  onSubmit:submitFuncs.submitPatient,
  validate,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  
})(TempVisitRegistry);

export default connect(
  state =>({
  	
   	lastName: selector(state, 'patient_last_nm'),
   	claimType: selector (state, 'claim_type_cd'),
   	policySelf:selector(state, 'ins_policy_self_flag'),
  // initialValues: state.patient.patient
  initialValues:{
  	token:state.app.token,
  	patient_last_nm:state.patient.patient.patient_last_nm&&state.patient.patient.patient_last_nm,
  	patient_first_nm:state.patient.patient.patient_first_nm,
  	patient_ssn:state.patient.patient.patient_ssn,
  	patient_date_of_accident:utils.convertDate(state.patient.patient.patient_date_of_accident).replace(/\//g,''),
  	patient_date_of_birth:utils.convertDate(state.patient.patient.patient_date_of_birth).replace(/\//g,''),
  	patient_address:state.patient.patient.patient_address,
	patient_city:state.patient.patient.patient_city,
	patient_state:state.patient.patient.patient_state,
	patient_zip:state.patient.patient.patient_zip,
	comments:state.patient.patient.comments,
	wc_carrier_case_no:state.patient.patient.wc_carrier_case_no,
	wcb_case_no:state.patient.patient.wcb_case_no,
	patient_sex:state.patient.patient.patient_sex,
	patient_home_phone:state.patient.patient.patient_home_phone,
	patient_alternate_phone:state.patient.patient.patient_alternate_phone,
	policy_holder:selector(state, 'ins_policy_self_flag')==true?`${selector(state, 'patient_first_nm')} ${selector(state, 'patient_last_nm')}`:
	state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].policy_holder:'',
	emergency_contact_phone:state.patient.patient.emergency_contact_phone,
	emergency_contact_name:state.patient.patient.emergency_contact_name,
	patient_mid_init:state.patient.patient.patient_mid_init,
	lw_id:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].lw_id:'',
	insurance_id:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].insurance_id:'',
	office_id:346,
	doctor_id:316,
	first_visit_dt:utils.convertDate(state.patient.patient.first_visit_dt).replace(/\//g,''),
	patient_status:state.patient.patient.patient_status?state.patient.patient.patient_status:1,
	claim_type_cd:state.patient.patient.claim_type_cd?state.patient.patient.claim_type_cd:'N',
	ic_id:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].ic_id:'',
	phone_num:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].phone_num:'',
	contact_nm:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].contact_nm:'',
	policy_num:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].policy_num:'',
	claim_num:state.patient.patient.insurances.length>0?state.patient.patient.insurances[0].claim_num:'',
	patient_id:state.patient.patient.patient_id,
	company_id:'AR',
	token:state.app.token
  }
}),
)(Form)

