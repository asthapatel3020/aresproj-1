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
    attorney_date_to: values.attorney_date_all?null:values.attorney_date_to?utils.reverseDateMaskFullyear(values.attorney_date_to):null,
    attorney_date_from: values.attorney_date_all?null:values.attorney_date_from?utils.reverseDateMaskFullyear(values.attorney_date_from):null,
    provider_id: values.providers_all?null:values.provider?values.provider.value:null,
    lw_id: values.lawyers_all?null:values.lawyer?values.lawyer.value:null,
    doctors: values.doctors_all?null:values.doctors?values.doctors:null
  }
  dispatch(actions.getArbitrationByProvider(props.token, final, 1))

}
class  ArbitrationByProviderForm extends PureComponent {
  
  componentWillReceiveProps(nextProps) {

  }
  

  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors, doctors, claimTypes, billStatuses, providers, attornies} = this.props
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
                    Date to Lawyer
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <Field
                          name="attorney_date_from"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.attorneyDateAll}}
                          label="From:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-5">
                      <Field
                          name="attorney_date_to"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.attorneyDateAll}}
                          label="To:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-2" style={{paddingTop:15}}>
                      <label>
                        <Field component="input" type="checkbox" name="attorney_date_all" />
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
                      Lawyer
                    </div>
                    <div >
                      <label>
                        <Field component="input" type="checkbox" name="lawyers_all" />
                       All
                      </label>
                    </div>
                  </div>
                <Field component={rdField.tableSelect} disabled={this.props.lawyersAll} options={attornies} name="lawyer" />
              </div>
              <div className="gray-border select-with-input" style={{marginTop:10}}>
                <div style={{margin:'10px 0'}} className='d-flex justify-content-between'>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                      Provider
                    </div>
                    <div >
                      <label>
                        <Field component="input" type="checkbox" name="providers_all" />
                       All
                      </label>
                    </div>
                  </div>
                <Field component={rdField.tableSelect} disabled={this.props.providersAll} options={providers} name="provider" />
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
  form: 'arbitrationByProviderForm',
  validate,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit:handleSubmit,
})(ArbitrationByProviderForm);

const selector = formValueSelector('arbitrationByProviderForm');

export default connect(
  state =>({
  attorneyDateAll:selector(state, 'attorney_date_all'),
  accidentDateAll:selector(state, 'accident_date_all'),
  doctorsAll:selector(state, 'doctors_all'),
  claimTypesAll:selector(state, 'claim_types_all'),
  billStatusesAll:selector(state, 'bill_statuses_all'),
  providersAll:selector(state, 'providers_all'),
  lawyersAll:selector(state, 'lawyers_all'),
  token:state.app.token,
  initialValues: {
    attorney_date_all:true,
    accident_date_all:true,
    doctors_all:true,
    claim_types_all:true,
    bill_statuses_all:true,
    providers_all:true,
    lawyers_all:true
  }
}),
)(Form)