import React, {Component} from 'react'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import * as rdField  from '../../../components/form/renderField'
import * as formValidates  from '../../../components/form/formValidates'
import { connect } from 'react-redux';
import * as actions from '../../../actions'
import Button from '../../../components/ui/roundButton'
import { submit } from 'redux-form'
import axios from 'axios'
import qs from 'qs'
import { createTextMask} from 'redux-form-input-masks';

const dateMask = createTextMask({
  pattern: '99/99/99'
})

const validate = formValidates.validate




class  TreatmentsInfoForm extends Component {
  state = {email:'123', districts:[{}], skills:[], experience:[], workPhotos:[]}
  
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  
  goBack() {
  }

  // const user = props.user
  render() {
    const {attornies, currentTreatment, addPayment, deletePayment} = this.props
    const {renderField, renderHorizontalField, chooseDistrict, renderVerticalTextarea, skillsMultiSelect, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" >
        <div className="row">
          <div className="col-2">
              <div style={{marginTop:15}}>
                <Button onClick={()=>addPayment()} variant={'fab'} style={{height:35, width:35}}type='add' color='primary' />
              </div>
              <div style={{marginTop:10}}>
                <Button onClick={()=>deletePayment()} variant={'fab'} style={{height:35, width:35}}type='delete' color='secondary' />
              </div>
          </div>
          <div className="col-10">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      name={`paymentsCollections[${currentTreatment}].write_off_am`}  
                      type="text"
                      label='Write-off'
                      style={{width:'100%', padding:5}}
                      component={rdField.renderHorizontalField} 
                      labelSize='0.7rem'
                  />
                  </div>
                  <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      name={`paymentsCollections[${currentTreatment}].paid_am`}  
                      type="text"
                      label='Paid'
                      style={{width:'100%', padding:5}}
                      component={rdField.renderHorizontalField} 
                      labelSize='0.7rem'
                      disabled
                  />
                  </div>
                </div>  
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      noMargin
                      name={`paymentsCollections[${currentTreatment}].deductable_am`}  
                      type="text"
                      label='DECO fee'
                      style={{width:'100%', padding:5}}
                      component={rdField.renderHorizontalField} 
                      labelSize='0.7rem'
                  />
                  </div>
                  <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      noMargin
                        name={`paymentsCollections[${currentTreatment}].pc_charge`}  
                        type="text"
                        label='Billed'
                        style={{width:'100%', padding:5}}
                        component={rdField.renderHorizontalField} 
                        labelSize='0.7rem'
                        disabled
                    />
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      noMargin
                      name={`paymentsCollections[${currentTreatment}].lien_am`}  
                      type="text"
                      label='Att. fee'
                      style={{width:'100%', padding:5}}
                      component={rdField.renderHorizontalField} 
                      labelSize='0.7rem'
                  />
                  </div>
                  <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      noMargin
                        name={`paymentsCollections[${currentTreatment}].balance`}  
                        type="text"
                        label='Balance'
                        style={{width:'100%', padding:5}}
                        component={rdField.renderHorizontalField} 
                        labelSize='0.7rem'
                        disabled
                   />
                  </div>
                </div>
              </div>
              
            </div>
            
          </div>
          <div className="col-12">
                <div className="row">
                  <div className="col-12 patient-card" style={{boxShadow:'none'}}>
                    <div style={{fontSize:'0.7rem'}}>Sent to attorney</div>
                    <Field 
                      name={`paymentsCollections[${currentTreatment}].lw_id`}
                      placeholder={'Select attorney'} 
                      component={rdField.tableSelect} 
                      options={attornies}
                      className="select-top"

                    />
                  </div>
                  
                </div>
              </div>
          <div className="col-12">
            <div className="row">
              <div className="col-6">
                    <Field
                      fixedLabel='40px' 
                      noMargin
                        name={`paymentsCollections[${currentTreatment}].sent_to_attorney_am`}  
                        type="text"
                        label='Sent $:'
                        style={{width:'100%', padding:5}}
                        component={rdField.renderHorizontalField} 
                        labelSize='0.7rem'
                    />
                </div>

              <div className="col-6">
                <Field
                        fixedLabel='50px' 
                        noMargin
                          name={`paymentsCollections[${currentTreatment}].interest_am`}  
                          type="text"
                          label='Interest $:'
                          style={{width:'100%', padding:5}}
                          component={rdField.renderHorizontalField} 
                          labelSize='0.7rem'
                      />
              </div>
              <div className="col-6">
                <Field
                        fixedLabel='40px' 
                        noMargin
                          name={`paymentsCollections[${currentTreatment}].sent_to_attorney_dt`}  
                          type="text"
                          label='Sent:'
                          style={{width:'100%', padding:5}}
                          component={rdField.renderHorizontalField} 
                          labelSize='0.7rem'
                          {...dateMask}
                      />
              </div>
              <div className="col-6">
                <Field
                        fixedLabel='50px' 
                        noMargin
                          name={`paymentsCollections[${currentTreatment}].recovered_dt`}  
                          type="text"
                          label='Recovered:'
                          style={{width:'100%', padding:5}}
                          component={rdField.renderHorizontalField} 
                          labelSize='0.7rem'
                          {...dateMask}
                      />
              </div>
              
            </div>
            <div className="row">
              <div className="col-12">
                <Field 
                  component={rdField.renderTextarea}
                  name='paymentsCollections[${currentTreatment}].comments_tx'
                  height={70}
                />
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'paymentsCollectionsForm',
  validate,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(TreatmentsInfoForm);

export default Form

