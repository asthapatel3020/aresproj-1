import React, {Component} from 'react'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import * as rdField  from '../../../../components/form/renderField'
import * as formValidates  from '../../../../components/form/formValidates'
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import Button from '../../../../components/ui/roundButton'
import { submit } from 'redux-form'
import axios from 'axios'
import qs from 'qs'
import moment from 'moment'

const validate = formValidates.validate


let Item = ({ e, i, fields, destination, isRent, items }) => {
  console.log('JTEM', e, isRent)
  return <div key={i} className="d-flex align-items-center" style={{border:'1px solid #ccc9c9', padding:10, borderRadius:10, marginTop:10}}>
          <div style={{width:'55%'}}>
            <div className="d-flex align-items-end">
              <div style={{width:'70%', marginTop:10, marginRight:'1rem'}}>
                <div style={{fontWeight:500, fontSize:'0.9rem', color:'#565656'}}>Item:</div>
                <Field 
                  name={`${e}.item`}  
                  placeholder={'Select item'} 
                  component={rdField.tableSelect} 
                  className="select-top"
                  options={items}/>
              </div>
              {(isRent&&isRent.type=='R')||(destination=='D')&&<div style={{width:'40px'}}>
                <Field 
                    name={`${e}.quantity`}  
                    type="text"
                    label='Quantity'
                    style={{width:'100%', padding:5}}
                    component={rdField.renderField} 
                    labelSize='0.9rem'
                  />
              </div>}
          
            </div>

          </div>
          
    <div className="select-clear a-hover" onClick={()=>fields.remove(i)} style={{marginLeft:50, fontSize:'0.74rem', marginBottom:6}}>Remove</div>
  </div>
}

Item = connect(
  (state, props) => ({

    isRent: selector(state, `${props.e}.item`)
  })
)(Item)


const renderSkills =({fields, items, classes, destination, chooseService, currentService, options, utils, meta:{error}})=> {
  return (
    <div>
      {fields.map((e, i)=>
        <Item e={e} destination={destination} fields={fields} items={items} key={i} i={i} /> 
      
      )}
      <div className="a-hover" style={{color:'grey', marginTop:10}} onClick={() => fields.push()}>Add item</div>
    </div>
      
  )
}


class  ScheduleForm extends Component {
  state = {email:'123', districts:[{}], skills:[], experience:[], workPhotos:[]}
  
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  
  goBack() {
  }

  // const user = props.user
  render() {
    console.log('ASYNC', this.props.currentDoctor, this.props.currentPatient)

    const { handleSubmit, pristine, users, submitting, errors, dispatch, destination, handleAdd, getAsyncPatients, providers, items} = this.props
    const {renderField, renderHorizontalField, chooseDistrict, renderVerticalTextarea, skillsMultiSelect, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10 patient-card" style={{padding:0, boxShadow:'none', borderRadius:0}}>
              <div>

                <div style={{marginTop:10}}>
                  <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>User:</div>
                  <Field 
                    name='user_id'  
                    placeholder={'Select user'} 
                    component={rdField.tableSelect} 
                    options={users}/>
               </div>

               <div  style={{width:'100%'}}>
                  <div style={{width:'30%', marginTop:10, marginRight:'1rem'}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Delivery destination:</div>
                    <Field 
                      name='delivery_to'  
                      placeholder={'Delivery destination'} 
                      component={rdField.tableSelect} 
                      options={[
                        {value:'P', label:'Patient residence'}, 
                        {value:'D', label:`Doctor's office`}, 
                        {value:'H', label:`Home office`}]}/>
                  </div>
                  
                </div>
                
                 {destination&&destination.value=='P'&&<div style={{marginTop:10}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Patient:</div>
                  <Field
                    name="patient_id"
                    component={rdField.asyncSelect} 
                    label='Delivery date'
                    getAsyncPatients={getAsyncPatients}
                    options={this.props.patientsList}
                    />
                </div>}
                {destination&&destination.value=='H'&&<div style={{marginTop:10}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Patient:</div>
                  <Field
                    name="patient_id_home"
                    component={rdField.asyncSelect} 
                    label='Delivery date'
                    getAsyncPatients={getAsyncPatients}
                    options={this.props.patientsList}
                    />
                </div>}
                {destination&&destination.value=='D'&&<div style={{marginTop:10}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Doctor:</div>
                  <Field
                    name="doctor_id"
                    component={rdField.asyncSelect} 
                    label='doctor'
                    getAsyncPatients={getAsyncPatients}
                    options={this.props.providers}
                    />
                </div>}
              
              

              {
                destination&&destination.value=='P'&&<div style={{width:'70%'}} className="d-flex">
                 <div style={{width:'45%', marginRight:15}}>
                  <Field
                    name="delivery_date_from"
                    component={rdField.renderDateTime} 
                    label='Delivery date from'
                    minTime={moment().hours(8).minutes(0)}
                    maxTime={moment().hours(18).minutes(0)}
                    
  
                    />
                  </div>
                  <div style={{width:'45%'}}>
                    <Field
                      name="delivery_date_to"
                      component={rdField.renderDateTime} 
                      label='Delivery date to'
                      minTime={moment().hours(8).minutes(0)}
                      maxTime={moment().hours(18).minutes(0)}
                      />
                  </div>
                </div>
              }
                
                {
                  destination!==undefined&&destination.value=='P'&&
                  

                  <div  className="d-flex">
                  
                    <div style={{width:'40%'}}>
                      <Field 
                        name='delivery_city'  
                        label={'City'}
                        type="text"
                        style={{width:'100%', padding:5}}
                        component={rdField.renderField} 
                      />
                    </div>
                    <div style={{width:'10%', marginLeft:'1rem'}}>
                      <Field 
                        name='delivery_state'  
                        label={'State'}
                        type="text"
                        style={{width:'100%', padding:5}}
                        component={rdField.renderField} 
                      />
                    </div>
                  </div>
              }
               {
                  destination!==undefined&&destination.value=='D'&&
                  

                  <div  className="d-flex">
                  
                    <div style={{width:'40%'}}>
                      <Field 
                        name='delivery_city_doctor'  
                        label={'City'}
                        type="text"
                        style={{width:'100%', padding:5}}
                        component={rdField.renderField} 
                      />
                    </div>
                    <div style={{width:'10%', marginLeft:'1rem'}}>
                      <Field 
                        name='delivery_state_doctor'  
                        label={'State'}
                        type="text"
                        style={{width:'100%', padding:5}}
                        component={rdField.renderField} 
                      />
                    </div>
                  </div>
              }
                
                  {
                    destination&&destination.value=='P'&&<div style={{width:'52.5%', marginTop:10}}>
                    <Field 
                      name='delivery_address'  
                      label={'Address'}
                      type="text"
                      style={{width:'100%', padding:5}}
                      component={rdField.renderField} 
                    />
                </div>} 

                 {
                    destination&&destination.value=='D'&&<div style={{width:'52.5%', marginTop:10}}>
                    <Field 
                      name='delivery_address_doctor'  
                      label={'Address'}
                      type="text"
                      style={{width:'100%', padding:5}}
                      component={rdField.renderField} 
                    />
                </div>} 

                <div style={{marginTop:10}}>
                  <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Items:</div>
                  <FieldArray 
                    name='items' 
                    items={items} 
                    component={renderSkills} 
                    skillsList={this.state.skills}
                    destination={destination?destination.value:''}/>
                </div>
                
              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('scheduleForm', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'scheduleForm',
  validate,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(ScheduleForm);

const selector = formValueSelector('scheduleForm');

export default connect(
  state =>({
    destination:selector(state, 'delivery_to'),
    currentPatient:selector(state, 'patient_id'),
    currentDoctor:selector(state, 'doctor_id'),
    // const hasEmailValue = selector(state, 'hasEmail'),
  initialValues: {
    delivery_city:selector(state, 'patient_id')?
    selector(state, 'patient_id.patient_city'):
    '',
    delivery_state:selector(state, 'patient_id')?
    selector(state, 'patient_id.patient_state'):
    '',
    delivery_address:selector(state, 'patient_id')?
    selector(state, 'patient_id.patient_address'):
    '',
    delivery_city_doctor:selector(state, 'doctor_id')?
    selector(state, 'doctor_id.doctor_city'):
    '',
    delivery_state_doctor:selector(state, 'doctor_id')?
    selector(state, 'doctor_id.doctor_state'):
    '',
    delivery_address_doctor:selector(state, 'doctor_id')?
    selector(state, 'doctor_id.officeAddress'):
    '',

  }
}),
)(Form)






/*
<div style={{marginTop:10}}>
                  <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Doctor:</div>
                  <Field 
                    name='doctor_id'  
                    placeholder={'Select doctor'} 
                    component={rdField.tableSelect} 
                    options={providers}/>
               </div>
*/