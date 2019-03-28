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

const dateMask = createTextMask({
  pattern: '99/99/9999'
})
const validate = formValidates.validate

// SUBMIT FUNCTION
const handleSubmit=(values, dispatch, props)=> {
  console.log('submited', values)
  let final = {
    accident_date_from: values.accident_date_all?null:values.accident_date_from?utils.reverseDateMaskFullyear(values.accident_date_from):null,
    accident_date_to: values.accident_date_all?null:values.accident_date_to?utils.reverseDateMaskFullyear(values.accident_date_to):null,
    patient_status_changed_dt_to: values.status_changed_date_all?null:values.status_changed_date_to?utils.reverseDateMaskFullyear(values.status_changed_date_to):null,
    patient_status_changed_dt_from: values.status_changed_date_all?null:values.status_changed_date_from?utils.reverseDateMaskFullyear(values.status_changed_date_from):null,
    office_id: values.patient_status_all?null:values.provider?values.provider.value:null,
    claim_type_cd: values.claim_types_all?null:values.claim_type?values.claim_type.value:null,
    patient_status: values.patient_status_all?null:values.patient_status?values.patient_status.value:null,
    doctors: values.doctors_all?null:values.doctors?values.doctors:null,
    insurances: values.insurances_all?null:values.insurances?values.insurances:null
  }
  dispatch(actions.getListOfPatients(props.token, final, 1))

}
class  ListOfPatientsForm extends PureComponent {
  
  componentWillReceiveProps(nextProps) {

  }
  

  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors, doctors, claimTypes, billStatuses, patient_status, attornies, insCompanies} = this.props
    const {renderField, renderHorizontalField, renderDateTime, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderCheckBoxGroup, renderPriceList} = rdField
    console.log('propsform', this.props)
    return (
      <div className="d-flex" style={{width:'100%'}}>
        <form onSubmit={handleSubmit} style={{width:'100%', display:'flex'}}>
        {
            //left side
          }
          <div style={{marginRight:15, width:'49%'}}>
            <div > 
              <div>
                <div className="gray-border" style={{ marginRight:10}}>
                  <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                    Status changed date
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <Field
                          name="status_changed_date_from"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.status_changedDateAll}}
                          label="From:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-5">
                      <Field
                          name="status_changed_date_to"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.status_changedDateAll}}
                          label="To:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-2" style={{paddingTop:15}}>
                      <label>
                        <Field component="input" type="checkbox" name="status_changed_date_all" />
                       All
                      </label>
                    </div>
                  </div>
                  
                </div>

                  <div className="gray-border" style={{ marginRight:10, marginTop:10}}>
                  <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                    DOA
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <Field
                          name="accident_date_from"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.accidentDateAll}}
                          label="From:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-5">
                      <Field
                          name="accident_date_to"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.accidentDateAll}}
                          label="To:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-2" style={{paddingTop:15}}>
                      <label>
                        <Field component="input" type="checkbox" name="accident_date_all" />
                       All
                      </label>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              <div className="gray-border select-with-input" style={{marginTop:10}}>
                <div style={{margin:'10px 0'}} className='d-flex justify-content-between'>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                      Claim types
                    </div>
                    <div >
                      <label>
                        <Field component="input" type="checkbox" name="claim_types_all" />
                       All
                      </label>
                    </div>
                  </div>
                <Field component={rdField.tableSelect} disabled={this.props.claimtypesAll} options={claimTypes} name="claim_type" />
              </div>
              <div className="gray-border select-with-input" style={{marginTop:10}}>
                <div style={{margin:'10px 0'}} className='d-flex justify-content-between'>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                      Patient status
                    </div>
                    <div >
                      <label>
                        <Field component="input" type="checkbox" name="patient_status_all" />
                       All
                      </label>
                    </div>
                  </div>
                <Field 
                  component={rdField.tableSelect} 
                  disabled={this.props.patient_statusAll} 
                  options={[{value:1, label:'Active'},{value:2, label:'Archived'}, {label:'Lien', value:4}]}
                  name="patient_status" />
              </div>

              <div>
                  <div className='d-flex justify-content-between' style={{margin:'10px 0'}}>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                        Insurance
                    </div>
                    <div  >
                            <label>
                              <Field component="input" type="checkbox" name="insurances_all" />
                             All
                            </label>
                    </div>
                  </div>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute', height:'100%', width:'100%', zIndex:2,display:this.props.insurancesAll?'block':'none' }}></div>
                    <Field 
                    component={CheckBoxTable}  
                    name="insurances" 
                    tableHeight={200}
                    options={insCompanies}
                    cell1={'label'}
                    cell1Label={'Company name and address'}
                    tableName='insCompanies1'
                    columnsNumber={1}/>
                  </div>


              </div>
            </div>

           

          </div>

          {
            //right side
          }
          <div style={{width:'50%', maxHeight:500}}>
            
            <div className='d-flex' style={{marginBottom:10}}>
              <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                  Doctor
              </div>
              <div className="col-2" >
                      <label>
                        <Field component="input" type="checkbox" name="doctors_all" />
                       All
                      </label>
              </div>
            </div>
            <div style={{position:'relative'}}>
              <div style={{position:'absolute', height:'100%', width:'100%', zIndex:2,display:this.props.doctorsAll?'block':'none' }}></div>
              <Field 
              component={CheckBoxTable}  
              name="doctors" 
              options={doctors}
              cell1={'fullName'}
              cell1Label={'Name'}
              cell2={'fullProvider'}
              cell2Label={'Provider'}
              tableName='doctorsTable1'
              columnsNumber={2}/>
            </div>
            
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'listOfPatientsForm',
  validate,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit:handleSubmit,
})(ListOfPatientsForm);

const selector = formValueSelector('listOfPatientsForm');

export default connect(
  state =>({
  status_changedDateAll:selector(state, 'status_changed_date_all'),
  accidentDateAll:selector(state, 'accident_date_all'),
  doctorsAll:selector(state, 'doctors_all'),
  claimTypesAll:selector(state, 'claim_types_all'),
  billStatusesAll:selector(state, 'bill_statuses_all'),
  patient_statusAll:selector(state, 'patient_status_all'),
  insurancesAll:selector(state, 'insurances_all'),
  token:state.app.token,
  initialValues: {
    status_changed_date_all:true,
    accident_date_all:true,
    doctors_all:true,
    claim_types_all:true,
    bill_statuses_all:true,
    patient_status_all:true,
    claim_types_all:true,
    insurances_all:true
  }
}),
)(Form)