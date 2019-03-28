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



class  CompanyForm extends Component {
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
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <div className="row">
                <div className="col-12" style={{fontWeight:600, fontSize:'1.2rem', margin:'10px 0px 20px 0'}}>
                    Company info
                  </div>

                <div className="col-6">
                  
                  <Field
                    name="company_id"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Company ID:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="company_tax_id"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Tax ID:"
                    />
                </div>

                <div className="col-12">
                  <Field
                    name="company_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Name:"
                    />
                </div>

                <div className="col-12">
                  <Field
                    name="company_address"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Address:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="company_city"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="City:"
                    />
                </div>
                <div className="col-3">
                  <Field
                    name="company_state"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="State:"
                    />
                </div>
                <div className="col-4">
                  <Field
                    name="company_zip"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="ZIP:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="company_phone"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Phone:"
                    />
                </div>
                <div className="col-6">
                  <Field
                    name="supplier_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Owner:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="lic_num"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="License #:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="wcb_or_specialty_cd"
                    component={renderHorizontalField} 
                    fixedLabel='120px'
                    type="text"
                    label="WCB or Specialty:"
                    />
                </div>
                
                <div className="col-12" style={{fontWeight:600, fontSize:'1.2rem', margin:'20px 0px 10px 0'}}>
                  Billing info
                </div>

                <div className="col-12">
                  <Field
                    name="billing_address"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Address:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="billing_city"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="City:"
                    />
                </div>
                <div className="col-3">
                  <Field
                    name="billing_state"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="State:"
                    />
                </div>
                <div className="col-4">
                  <Field
                    name="billing_zip"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="ZIP:"
                    />
                </div>
              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('companyInfoForm', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'companyInfoForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(CompanyForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    initialValues:state.company.company
}),
)(Form)