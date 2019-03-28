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


const validate = formValidates.validate


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
    // console.log('ASYNC', this.props.providers)
    const { handleSubmit, pristine, users, submitting, errors, dispatch, handleDelete, handleAdd, getAsyncPatients, providers, items} = this.props
    const {renderField, renderHorizontalField, chooseDistrict, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-end">
            <div className="col-10 patient-card" style={{padding:0, boxShadow:'none', borderRadius:0}}>
               <div style={{marginTop:10}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Patient:</div>
                      <Field
                        name="patient_id"
                        component={rdField.asyncSelect} 
                        label='Delivery date'
                        getAsyncPatients={getAsyncPatients}
                        options={this.props.patientsList}
                        />
                    </div>

                    <div style={{marginTop:10}}>
                      <div style={{fontWeight:500, fontSize:'1rem', color:'#565656',marginBottom:10}}>Items:</div>
                      <FieldArray name='items' items={items} component={renderSkills} />
                    </div>


            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('assignItemFormPatient', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'assignItemFormPatient',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(ScheduleForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
  // initialValues: state.items.itemForEdit
}),
)(Form)