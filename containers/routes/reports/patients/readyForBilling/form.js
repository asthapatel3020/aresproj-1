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
    provider_id: values.providers_all?null:values.provider_id?values.provider_id.value:null,
    patient_statuses: values.patient_status_all?null:values.patient_statuses?values.patient_statuses:null,
    claim_type_cd: values.claim_type?values.claim_type.value:null,
    after_dos: values.after_dos?values.after_dos:null


  }
  dispatch(actions.getReadyForBilling(props.token, final, 1))

}
class  ReadyForBillingForm extends PureComponent {
  
  componentWillReceiveProps(nextProps) {

  }
  

  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors, codes, claimTypes, offices} = this.props
    const {renderHorizontalField} = rdField
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
                <div className="gray-border" >
                  <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                    Date of accident
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
                
                <div className='d-flex' style={{marginTop:10}}>
                  <div className="gray-border select-with-input" style={{marginRight:10, width:'50%'}}>
                    <div style={{marginBottom:'15px'}} className='d-flex justify-content-between'>
                        <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                          Claim type
                        </div>
                        
                      </div>
                    <Field component={rdField.tableSelect}  options={claimTypes} name="claim_type" />
                  </div>
                  <div className="gray-border" style={{width:'50%'}}>
                    <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                      Date of visit(days after)
                    </div>
                    <div className="d-flex">
                      <div className="col-5">
                        <Field
                          name="after_dos"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          // props={{disabled: this.props.accidentDateAll}}
                          // label="To:" 
                          />
                      </div>
                     
                    </div>

                  </div>
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
                <Field component={rdField.tableSelect} disabled={this.props.providersAll} options={offices} name="provider_id" />
              </div>
                  
              </div>
              

                
            </div>

           

          </div>
          
          <div className="gray-border select-with-input" style={{width:'20%'}}>
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

                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute', height:'100%', width:'100%', zIndex:2,display:this.props.patient_statusAll?'block':'none' }}></div>
                    <Field 
                    component={CheckBoxTable}  
                    name="patient_statuses" 
                    tableHeight={200}
                    options={[{value:1, label:'Active'},{value:2, label:'Archived'}, {label:'Lien', value:4}]}
                    cell1={'label'}
                    cell1Label={'Status'}
                    tableName='statuses1'
                    columnsNumber={1}/>
                  </div>
                
              </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'readyForBillingForm',
  validate,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit:handleSubmit,
})(ReadyForBillingForm);

const selector = formValueSelector('readyForBillingForm');

export default connect(
  state =>({
  accidentDateAll:selector(state, 'accident_date_all'),
  codesAll:selector(state, 'codes_all'),
  providersAll:selector(state, 'providers_all'),
  patient_statusAll:selector(state, 'patient_status_all'),
  token:state.app.token,
  initialValues: {
    accident_date_all:true,
    codes_all:true,
    after_dos:30,
    claim_type:'N',
    providers_all:true,
    patient_status_all:true


  }
}),
)(Form)