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
    after_doa: values.after_doa?values.after_doa:null


  }
  dispatch(actions.getActivePatientIns(props.token, final, 1))

}
class  ActivePatientInsForm extends PureComponent {
  
  componentWillReceiveProps(nextProps) {

  }
  

  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors} = this.props
    const {renderHorizontalField} = rdField
    console.log('propsform', this.props)
    return (
      <div className="d-flex" style={{width:'100%'}}>
        <form onSubmit={handleSubmit} style={{width:'100%', display:'flex'}}>
          <div className="gray-border" style={{width:'50%'}}>
                    <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                      Days after DOA
                    </div>
                    <div className="d-flex">
                      <div className="col-5">
                        <Field
                          name="after_doa"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          // props={{disabled: this.props.accidentDateAll}}
                          // label="To:" 
                          />
                      </div>
                     
                    </div>

                  </div>
          
          
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'activePatientInsForm',
  validate,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit:handleSubmit,
})(ActivePatientInsForm);

const selector = formValueSelector('activePatientInsForm');

export default connect(
  state =>({
  token:state.app.token,
  initialValues: {
    after_doa:24,

  }
}),
)(Form)