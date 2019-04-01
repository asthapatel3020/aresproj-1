import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchTable from './tables/searchTable'
import Tabs from './Tabs'
import Filter from './filter'
import Switch from './switch';
import * as actions from '../../../actions'
import { withStyles } from '@material-ui/core/styles';
import PatientInfo from './patientInfo'
import VisitRegistry from './visitRegistry'
import Billing from './billing'
import MaterialButton from '../../../components/ui/MaterialButton'
import PaymentsAndCollection from './paymentsAndCollection'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { submit } from 'redux-form'
import * as utils from '../../../components/functions/functions'
import qs from 'qs'

const styles = theme => ({
	  root: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  menuItem: {
	  	height:10
	  },
	  formControl: {
	    // margin: theme.spacing.unit,
	    minWidth: 120,
	  },
	  selectEmpty: {
	    marginTop: theme.spacing.unit * 2,
	  },
});

class PatientSearch extends Component {
	state = {
    	checked: false,
    	tab:0,
    	page:1,
    	patientId:'',
    	DOB:'',
    	DOA:'',
    	phone:'',
    	firstName:'',
    	lastName:'',
    	claimNum:'',
    	policyNum:'',
    	needToSave:false,
    	claim_type_cd:'',
    	insurance:''
  	}	
  	  	componentWillReceiveProps(nextProps) {
  		console.log('nextprops', nextProps)
  		this.props.needToSave!==nextProps.needToSave&&this.setState({needToSave:nextProps.needToSave})
  		// if (nextProps.token) {
  			// nextProps.patients.patients.length==0&&nextProps.dispatch(actions.getPatientsList(this.state.page, {}, nextProps.token))
  			this.props.token!==nextProps.token&&nextProps.dispatch(actions.getServiceList(nextProps.token))
	  		this.props.token!==nextProps.token&&nextProps.dispatch(actions.getTreatmentsList(nextProps.token))
	  		this.props.token!==nextProps.token&&nextProps.dispatch(actions.getCodesList(nextProps.token))
	  		this.props.token!==nextProps.token&&nextProps.dispatch(actions.getOffices(nextProps.token))
	  		this.props.token!==nextProps.token&&nextProps.dispatch(actions.getCompanies(nextProps.token))
	  		this.props.token!==nextProps.token&&nextProps.dispatch(actions.getSpecialties(nextProps.token))
	  		this.props.token!==nextProps.token&&nextProps.dispatch(actions.getPaymentSources(nextProps.token))
  		// }
  		
  	}
  	componentDidMount() {
  		console.log('nextprops', this.props)
  		// if (nextProps.token) {
  			this.props.patients.patients.length==0&&this.props.dispatch(actions.getPatientsList(this.state.page, {}, this.props.token))
  			this.props.dispatch(actions.getServiceList(this.props.token))
	  		this.props.dispatch(actions.getTreatmentsList(this.props.token))
	  		this.props.dispatch(actions.getCodesList(this.props.token))
	  		this.props.dispatch(actions.getOffices(this.props.token))
	  		this.props.dispatch(actions.getCompanies(this.props.token))
	  		this.props.dispatch(actions.getSpecialties(this.props.token))
	  		this.props.dispatch(actions.getPaymentSources(this.props.token))
  		// }
  		
  	}
  	handleCheck() {
  		this.setState({checked:!this.state.checked})
  	}
  	onSubmit(e) {
		e.preventDefault()
  	}
  	choosePatient(patient, patientId) {
  		this.props.dispatch(actions.choosePatient(patientId, this.props.token))
  		this.props.dispatch(actions.getBillingInfo(patientId, this.props.token))
  		this.props.dispatch(actions.getPatientVisitRegistry(patientId, this.props.token))
  		this.props.dispatch(actions.getPayments(patientId, this.props.token))
  		this.props.dispatch(actions.getInsurances(patientId, this.props.token))


  		this.setState({tab:1})
  	}
  	changeTab(e) {
  		// if (this.state.needToSave==true) {
  		// 	if (window.confirm('Do you want to save changes?')) {
		  //       this.props.dispatch(submit('paymentsCollectionsForm'))
				// this.props.dispatch(submit('visitRegistry', ''))
				// this.props.dispatch(submit('billing'))
				// this.props.dispatch(submit('patientInfo'))
		  //   } else {
				// this.setState({tab:e})
				// this.props.dispatch(actions.resetAlertToSave())
		  //   }
  		// } else {
  		// 	this.setState({tab:e})
  		// }
  			this.setState({tab:e})
  		
  	}
  	handleSave() {
  		
		// this.patientInfo.handleSave()
		this.props.dispatch(submit('paymentsCollectionsForm'))
		this.props.dispatch(submit('visitRegistry', ''))
		this.props.dispatch(submit('billing'))
		this.props.dispatch(submit('patientInfo'))

  	}
  	handleAdd() {
  		this.props.dispatch(actions.createPatient())
  		this.setState({tab:1})
  	}

  	applyFilter(e, type) {
		

		

			if (type=='patientId') {
				this.setState({patientId:e})
				this.props.dispatch(actions.setFilter(e, 'patientId'))
				// this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, patientId:e}, this.props.token))
			}
			if (type=='claimNum') {
				this.setState({claimNum:e})
				this.props.dispatch(actions.setFilter(e, 'claimNum'))
				// e.length>3&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, claimNum:e}, this.props.token))
			}
			if (type=='policyNum') {
				this.setState({policyNum:e})
				this.props.dispatch(actions.setFilter(e, 'policyNum'))
				// e.length>3&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, policyNum:e}, this.props.token))
			}
			else if (type=='DOB') {
				console.log('date',utils.reverseDateMaskFullyear(e.replace(/\//g,'')), e.replace(/\//g,''))
				
				let date = utils.reverseDateMaskFullyear(e.replace(/\//g,''))
				console.log('HELLDA', e)
				this.setState({DOB:date})
				this.props.dispatch(actions.setFilter(e, 'DOB'))
				// e==''&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOB:''}, this.props.token))
				// date&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOB:date}, this.props.token))
			}
			else if (type=='DOA') {
				console.log('date',utils.reverseDateMaskFullyear(e.replace(/\//g,'')))

				let date = utils.reverseDateMaskFullyear(e.replace(/\//g,''))
				this.setState({DOA:date})
				this.props.dispatch(actions.setFilter(e, 'DOA'))
				// e==''&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOA:''}, this.props.token))
				// date>=0&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOA:date}, this.props.token))
			}
			else if (type=='phone') {
				this.setState({phone:e})
				this.props.dispatch(actions.setFilter(e, 'phone'))
				// this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, phone:e}, this.props.token))
			}
			else if (type=='claimType') {
				console.log('claimtype', e.target.value)
				this.setState({claim_type_cd:e.target.value})
				this.props.dispatch(actions.setFilter(e.target.value, 'claim_type_cd'))
				// this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, phone:e}, this.props.token))
			}
			else if (type=='firstName') {
				this.setState({firstName:e})
				this.props.dispatch(actions.setFilter(e, 'firstName'))
				// this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, firstName:e}, this.props.token))
			}
			else if (type=='lastName') {
				this.setState({lastName:e})
				this.props.dispatch(actions.setFilter(e, 'lastName'))
				// this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, lastName:e}, this.props.token))
			}
		
		
  	}
	render() {
		const {patient, patients, filters, classes} = this.props
		const {tab} = this.state
		console.log('THISPROPS', this.props.needToSave)

		let filter = {
			patientId:this.props.filters.patientId,
			DOB:this.props.filters.DOB,
			DOA:this.props.filters.DOA,
			lastName:this.props.filters.lastName,
			firstName:this.props.filters.firstName,
			phone:this.props.filters.phone,
			claimNum:this.props.filters.claimNum,
			policyNum:this.props.filters.policyNum,
			claim_type_cd:this.props.filters.claim_type_cd,
			insurance:this.props.filters.insurance,

		}
		return (
			<div className="" >

				<div className="d-flex align-items-start flex-column patient-upper-block">
					<div className="d-flex" style={{marginBottom:'1rem'}}>
						<div>
							<MaterialButton onClick={()=>this.handleAdd()} variant={'raised'} type='add' color='primary' label='New'/>
						</div>
						<div>
							<MaterialButton onClick={()=>this.handleSave()} variant={'raised'} type='save' color='default' label='Save'/>
						</div>
					</div>
					{patient.patient_id&&<div style={{padding:'0 1rem', fontSize:'1rem'}}>
						Patient: 
						<span style={{textTransform:'uppercase', fontWeight:'600'}}>{` ${patient.patient_first_nm} ${patient.patient_last_nm}, `}</span>
						ID:
						<span style={{textTransform:'uppercase', fontWeight:'600'}}>{` ${patient.patient_id}`}</span>
					</div>}
					<div className="upper-block-nav d-flex" style={{paddingTop:patient?'1rem':'2rem'}}>
						<Tabs patient={patient} currentTab={tab} changeTab={(e)=>this.changeTab(e)}/>
					</div>
					{tab==0&&<div className="patient-search-filters ">
						<form onSubmit={(e)=> {
							e.preventDefault()
							this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOA:this.state.DOA, DOB:this.state.DOB}, this.props.token))
						}
							}>
							<div className="d-flex flex-wrap">
							
								<div className="patient-search-filter">
									<Filter value={filters.patientId} label={"Patient ID"} onChange={(e)=>this.applyFilter(e, 'patientId')}/>
								</div>
								<div className="patient-search-filter">
									<Filter value={filters.DOAValue} label={"D.O.A"} dateMask onChange={(e)=>this.applyFilter(e, 'DOA')}/>
								</div>
								<div className="patient-search-filter" >
									<Filter value={filters.lastName} label={"Last Name"} onChange={(e)=>this.applyFilter(e, 'lastName')}/>
								</div>
								<div className="patient-search-filter" >
									<Filter value={filters.firstName} label={"First Name"} onChange={(e)=>this.applyFilter(e, 'firstName')}/>
								</div>
								<div className="patient-search-filter">
									<Filter value={filters.DOBValue} label={"Date of birth"} dateMask onChange={(e)=>this.applyFilter(e, 'DOB')}/>
								</div>
								<div className="patient-search-filter" >
									<Filter value={filters.phone} label={"Phone"} onChange={(e)=>this.applyFilter(e, 'phone')}/>
								</div>

								<div className="patient-search-filter" >
									<Filter value={filters.claimNum} label={"Claim num."} onChange={(e)=>this.applyFilter(e, 'claimNum')}/>
								</div>
								<div className="patient-search-filter" >
									<Filter value={filters.policyNum} label={"Policy num."} onChange={(e)=>this.applyFilter(e, 'policyNum')}/>
								</div>
								<div className="patient-search-filter" >
									<FormControl className={classes.formControl}>
							          <InputLabel htmlFor="claim_type_cd_select">Claim type</InputLabel>
							          <Select
							            value={this.state.claim_type_cd}
							            onChange={(e)=>this.applyFilter(e, 'claimType')}
							            inputProps={{
							              name: 'claim-type_cd',
							              id: 'claim_type_cd_select',
							            }}
							          >
							            <MenuItem className={classes.menuItem} value="">
							              <em>None</em>
							            </MenuItem>
							            {
							            	this.props.claimTypes.length>0&&this.props.claimTypes.map((e,i)=>{
							            		return <MenuItem style={{height:10}} className={classes.menuItem} key={i} value={e.value}>{e.label}</MenuItem>
							            	})
							            }
							            
							          </Select>
							        </FormControl>
								</div>
							</div>
							<input style={{visibility:'hidden'}} type="submit" />
						</form>
						
						<div>
							<MaterialButton onClick={()=>this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOA:this.state.DOA, DOB:this.state.DOB}, this.props.token))} variant={'raised'}  color='primary' label='Search'/>
						</div>
					</div>}
				

					
				</div>
				<div className="patient-data-block">
					<div className="filters"></div>
					<div className="">
						{tab==0&&
							<SearchTable 
								patients={patients}

								handleSave={(data)=>this.handleSave(data)} 
								choosePatient={(patient, patientId)=>this.choosePatient(patient, patientId)}/>}
						{tab==1&&
							<PatientInfo 
								onRef={ref => (this.patientInfo = ref)} 
								/>}
						{tab==2&&<VisitRegistry handleSave={(data)=>this.handleSave(data)} dispatch={this.props.dispatch}/>}
						{tab==3&&<Billing dispatch={this.props.dispatch} handleSave={(data)=>this.handleSave(data)} />}
						{tab==4&&<PaymentsAndCollection handleSave={(data)=>this.handleSave(data)} />}
					</div>
				</div>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    patients:state.patients,
    filters:state.filters,
    token:state.app.token,
    claimTypes:state.claimTypes.claims,
    needToSave:state.patient.needToSave
  };
}

const PatientSearchStyled = withStyles(styles)(PatientSearch)
export default connect(mapStateToProps)(PatientSearchStyled);