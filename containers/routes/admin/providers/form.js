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

const handleSubmit=(e, dispatch)=> {
    console.log('law', e)
    let token = e.token
    if (e.lw_id==undefined) {
      delete e['lw_id']
      delete e['token']
      dispatch(actions.createAttorney(
        {...e, lw_type:'A'}, 
        token
        ))
      dispatch(actions.getAttornies(token))
    }
    else {
      dispatch({type:'DO_REQUEST'})
      delete e['token']
      console.log("AAAA", token)

      // dispatch(actions.updateAttorney(e))
      axios.put(`${actions.API_URL}attornies/${e.lw_id}`,
        qs.stringify(e),
         {
        headers:{'Authorization': "bearer " + token}
        }).then(res=> {
          dispatch(actions.getAttornies(token))
          dispatch({type:'DO_SUCCESS'})
          dispatch({type:'OPEN_ALERT', msg:'Successfully edited!'})


          return res;
        }).catch(err=> {
          console.log('fail', err)
          return false
        })
      // dispatch(actions.selectAttorney({}))
    }
}

class  ProviderForm extends Component {
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
    const {renderField, renderHorizontalField, chooseDistrict, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" style={{borderTop:'1px solid grey'}}>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <div className="row">
              
                <div className="col-12">
                  <Field
                    name="office_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Name:"
                    />
                </div>
                
                <div className="col-12">
                  <Field
                    name="office_address"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Address:"
                    />
                </div>
                
                <div className="col-5">
                  <Field
                    name="office_city"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="City:"
                    />
                </div>
                <div className="col-3">
                  <Field
                    name="office_state"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="State:"
                    />
                </div>
                <div className="col-4">
                  <Field
                    name="office_zip"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="ZIP:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="office_phone"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Name:"
                    />
                </div>

                <div className="col-6">
                  <Field
                    name="office_fax"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Fax:"
                    />
                </div>
                <div className="col-12">
                  <Field
                    name="office_contact_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Contact:"
                    />
                </div>
                <div className="col-12">
                  <Field
                    name="tax_id"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Tax ID:"
                    />
                </div>
              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>handleAdd()} variant={'fab'} type='add' color='primary' />
              <Button onClick={()=>dispatch(submit('providerForm', 'qwe'))} variant={'fab'} type='save' color='default' />
              <Button onClick={()=>handleDelete()} variant={'fab'} type='delete' color='secondary' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'providerForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  onSubmit:handleSubmit,
})(ProviderForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
  initialValues: {...state.attorney.currentAttorney.lw_id&&state.attorney.currentAttorney, token:state.app.token}
}),
)(Form)