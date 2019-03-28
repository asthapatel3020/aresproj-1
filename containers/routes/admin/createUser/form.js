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


const validate = formValidates.validate



class  CreateUserForm extends Component {
  state = {email:'123', districts:[{}], skills:[], experience:[], workPhotos:[]}
  
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  
  goBack() {
  }

  // const user = props.user
  render() {
    const { handleSubmit, pristine, reset, submitting, errors, dispatch, handleDelete, handleAdd} = this.props
    const {renderField, renderHorizontalField, tableSelect, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" style={{borderTop:'1px solid grey'}}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <div className="row">
                <div className="col-6">
                  <Field
                    name="username10"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Username:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="password"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Password:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="first_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="First name:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="last_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Last name:"
                    />
                </div>

                <div className="col-6 d-flex align-items-center" style={{marginTop:15}}>
                  <div style={{fontSize:'1rem', fontWeight:500, color:'#565656', marginLeft:40, width:90}}>Role:</div>
                  <div style={{width:'100%'}}>
                    <Field
                    name="role"
                    component={tableSelect} 
                    options={[
                      {label:'Driver', value:7},
                      {label:'Technician', value:6},
                      {label:'Admin', value:0}
                    ]}
                    />
                  </div>
                  
                </div>
              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('createUserForm', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'createUserForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(CreateUserForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
}),
)(Form)