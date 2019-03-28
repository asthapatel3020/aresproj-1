import React, {Component, PureComponent} from 'react'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import * as rdField  from '../../../../../components/form/renderField'
import * as formValidates  from '../../../../../components/form/formValidates'
import { connect } from 'react-redux';
import * as actions from '../../../../../actions'
import Button from '../../../../../components/ui/roundButton'
import { submit } from 'redux-form'
import axios from 'axios'
import qs from 'qs'
import { createTextMask} from 'redux-form-input-masks';
import CheckBoxTable from '../../checkBoxTable'
import moment from 'moment'
import * as utils from '../../../../../components/functions/functions'
import SearchTable from './../../../patient/tables/searchTable'
import Filter from '../../../patient/filter'

const dateMask = createTextMask({
  pattern: '99/99/9999'
})
const validate = formValidates.validate

class  PatientBillingHistoryForm extends PureComponent {
  state = {
    page:1,
    patientId:'',
    DOB:'',
    DOA:'',
    phone:'',
    firstName:'',
    lastName:'',
    claimNum:'',
    policyNum:'',
  }
  
  componentWillReceiveProps(nextProps) {

  }
  
  choosePatient(patient, patientId) {
    console.log('Patient', patient)
    this.props.dispatch(actions.getPatientBillingHistory(this.props.token, patient.patient_id, 1))
    this.props.changeTabToReport()
  }

  applyFilter(e, type) {
    

    let filter = {
      patientId:this.props.filters.patientId,
      DOB:this.props.filters.DOB,
      DOA:this.props.filters.DOA,
      lastName:this.props.filters.lastName,
      firstName:this.props.filters.firstName,
      phone:this.props.filters.phone,
      claimNum:this.props.filters.claimNum,
      policyNum:this.props.filters.policyNum,

    }

      if (type=='patientId') {
        this.setState({patientId:e})
        this.props.dispatch(actions.setFilter(e, 'patientId'))
        this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, patientId:e}, this.props.token))
      }
      if (type=='claimNum') {
        this.setState({claimNum:e})
        this.props.dispatch(actions.setFilter(e, 'claimNum'))
        e.length>3&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, claimNum:e}, this.props.token))
      }
      if (type=='policyNum') {
        this.setState({policyNum:e})
        this.props.dispatch(actions.setFilter(e, 'policyNum'))
        e.length>3&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, policyNum:e}, this.props.token))
      }
      else if (type=='DOB') {
        console.log('date',utils.reverseDateMaskFullyear(e.replace(/\//g,'')), e.replace(/\//g,''))
        
        let date = utils.reverseDateMaskFullyear(e.replace(/\//g,''))
        console.log('HELLDA', e)
        this.setState({DOB:date})
        this.props.dispatch(actions.setFilter(e, 'DOB'))
        e==''&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOB:''}, this.props.token))
        date&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOB:date}, this.props.token))
      }
      else if (type=='DOA') {
        console.log('date',utils.reverseDateMaskFullyear(e.replace(/\//g,'')))

        let date = utils.reverseDateMaskFullyear(e.replace(/\//g,''))
        this.setState({DOA:date})
        this.props.dispatch(actions.setFilter(e, 'DOA'))
        e==''&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOA:''}, this.props.token))
        date>=0&&this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, DOA:date}, this.props.token))
      }
      else if (type=='phone') {
        this.setState({phone:e})
        this.props.dispatch(actions.setFilter(e, 'phone'))
        this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, phone:e}, this.props.token))
      }
      else if (type=='firstName') {
        this.setState({firstName:e})
        this.props.dispatch(actions.setFilter(e, 'firstName'))
        this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, firstName:e}, this.props.token))
      }
      else if (type=='lastName') {
        this.setState({lastName:e})
        this.props.dispatch(actions.setFilter(e, 'lastName'))
        this.props.dispatch(actions.getPatientsList(this.state.page, {...filter, lastName:e}, this.props.token))
      }
    
    
    }
  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors, filters, patients} = this.props
    const {renderField, renderHorizontalField, renderDateTime, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderCheckBoxGroup, renderPriceList} = rdField
    console.log('propsform', this.props)
    return (
      <div className="d-flex" style={{width:'100%'}}>
        <div className="patient-search-filters " style={{paddingLeft:0, paddingRight:0}}>
            <div className="d-flex" style={{paddingBottom:15, borderBottom:'2px solid gray', flexFlow:'wrap'}}>
              
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
            </div>

            <div className="patient-data-block">
              <div className="filters"></div>
              <div className="">
                  <SearchTable 
                    patients={patients}

                    handleSave={(data)=>this.handleSave(data)} 
                    choosePatient={(patient, patientId)=>this.choosePatient(patient, patientId)}/>
                
              </div>
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
  };
}
export default connect(mapStateToProps)(PatientBillingHistoryForm);