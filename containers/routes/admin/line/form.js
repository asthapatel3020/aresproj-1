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



class  CreateLineForm extends Component {
  
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  
  goBack() {
  }

  // const user = props.user
  render() {
    const { handleSubmit, pristine, reset, submitting, errors, dispatch, suppliers} = this.props
    const {renderField, renderHorizontalField, tableSelect, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" style={{borderTop:'1px solid grey'}}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <div className="row">

                  <div className="col-7 d-flex align-items-center" style={{marginTop:15}}>
                    <div style={{fontSize:'1rem', fontWeight:500, color:'#565656', marginLeft:40, width:130}}>Supplier:</div>
                    <div style={{width:'100%'}}>
                      <Field
                      name="supplier_id"
                      component={tableSelect} 
                      options={suppliers}
                      />
                  </div>
                  
                </div>
                <div className="col-7">
                  <Field
                    name="name"
                    component={renderHorizontalField} 
                    fixedLabel='130px'
                    type="text"
                    label="Line's name:"
                    />
                </div>

              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('createLineForm', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'createLineForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(CreateLineForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
}),
)(Form)