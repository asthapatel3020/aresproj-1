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
    billing_date_from: values.billing_date_all?null:values.billing_date_from?utils.reverseDateMaskFullyear(values.billing_date_from):null,
    billing_date_to: values.billing_date_all?null:values.billing_date_to?utils.reverseDateMaskFullyear(values.billing_date_to):null,
    rx_date_to: values.rx_date_all?null:values.rx_date_to?utils.reverseDateMaskFullyear(values.rx_date_to):null,
    rx_date_from: values.rx_date_all?null:values.rx_date_from?utils.reverseDateMaskFullyear(values.rx_date_from):null,
    claim_type_cd: values.claim_types_all?null:values.claim_type?values.claim_type.value:null,
    providers: values.providers_all?null:values.providers?values.providers:null,
    bill_statuses: values.bill_statuses_all?null:values.bill_statuses?values.bill_statuses:null,
    doctors: values.doctors_all?null:values.doctors?values.doctors:null
  }
  dispatch(actions.getPaymentsByProvider(props.token, final, 1))

}
class  PaymentByProviderForm extends PureComponent {
  
  componentWillReceiveProps(nextProps) {

  }
  

  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors, doctors, claimTypes, billStatuses, providers} = this.props
    const {renderField, renderHorizontalField, renderDateTime, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderCheckBoxGroup, renderPriceList} = rdField
    console.log('propsform', this.props)
    return (
      <div className="d-flex" style={{width:'100%'}}>
        <form onSubmit={handleSubmit} style={{width:'100%', display:'flex'}}>
        {
            //left side
          }
          <div style={{marginRight:15, width:'49%'}}>
            <div className='d-flex'> 
              <div>
                <div className="gray-border" style={{ marginRight:10}}>
                  <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                    Rx Date
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <Field
                          name="rx_date_from"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.rxDateAll}}
                          label="From:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-5">
                      <Field
                          name="rx_date_to"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.rxDateAll}}
                          label="To:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-2" style={{paddingTop:15}}>
                      <label>
                        <Field component="input" type="checkbox" name="rx_date_all" />
                       All
                      </label>
                    </div>
                  </div>
                  
                </div>

                  <div className="gray-border" style={{ marginRight:10, marginTop:10}}>
                  <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                    Billing Date
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <Field
                          name="billing_date_from"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.billingDateAll}}
                          label="From:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-5">
                      <Field
                          name="billing_date_to"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.billingDateAll}}
                          label="To:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-2" style={{paddingTop:15}}>
                      <label>
                        <Field component="input" type="checkbox" name="billing_date_all" />
                       All
                      </label>
                    </div>
                  </div>
                  
                </div>
              </div>
              
              <div className="gray-border" style={{width:'40%'}}>
                <div className="select-with-input">
                  <div style={{margin:'10px 0'}} className='d-flex justify-content-between'>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                      Claim type
                    </div>
                    <div >
                      <label>
                        <Field component="input" type="checkbox" name="claim_types_all" />
                       All
                      </label>
                    </div>
                  </div>
                  
                
                  <Field component={rdField.tableSelect} disabled={this.props.claimTypesAll} options={claimTypes} name="claim_type" />

                </div>

                <div>
                  <div className='d-flex justify-content-between' style={{margin:'10px 0'}}>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                        Bill Status
                    </div>
                    <div  >
                            <label>
                              <Field component="input" type="checkbox" name="bill_statuses_all" />
                             All
                            </label>
                    </div>
                  </div>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute', height:'100%', width:'100%', zIndex:2,display:this.props.billStatusesAll?'block':'none' }}></div>
                    <Field 
                    component={CheckBoxTable}  
                    name="bill_statuses" 
                    options={billStatuses}
                    cell1={'label'}
                    cell1Label={'Status'}
                    tableName='billStatusTable1'
                    columnsNumber={1}/>
                  </div>


                </div>
              </div>
            </div>

            <div >
              <div className="gray-border">
                <div className='d-flex justify-content-between' style={{margin:'10px 0'}}>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                        Provider
                    </div>
                    <div  >
                            <label>
                              <Field component="input" type="checkbox" name="providers_all" />
                             All
                            </label>
                    </div>
                  </div>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute', height:'100%', width:'100%', zIndex:2,display:this.props.providersAll?'block':'none' }}></div>
                    <Field 
                    component={CheckBoxTable}  
                    name="providers" 
                    options={providers}
                    cell1={'office_name'}
                    cell2={'fullAddress'}
                    cell1Label={'Name'}
                    cell2Label={'Address'}
                    tableName='providersTable1'
                    columnsNumber={2}/>
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
  form: 'paymentsByProviderForm',
  validate,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit:handleSubmit,
})(PaymentByProviderForm);

const selector = formValueSelector('paymentsByProviderForm');

export default connect(
  state =>({
  rxDateAll:selector(state, 'rx_date_all'),
  billingDateAll:selector(state, 'billing_date_all'),
  doctorsAll:selector(state, 'doctors_all'),
  claimTypesAll:selector(state, 'claim_types_all'),
  billStatusesAll:selector(state, 'bill_statuses_all'),
  providersAll:selector(state, 'providers_all'),
  token:state.app.token,
  initialValues: {
    rx_date_all:true,
    billing_date_all:true,
    doctors_all:true,
    claim_types_all:true,
    bill_statuses_all:true,
    providers_all:true,
  }
}),
)(Form)