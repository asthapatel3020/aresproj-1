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
      delete e['value']
      delete e['label']
      dispatch(actions.createAttorney(
        {...e, lw_type:'A'}, 
        token
        ))
      dispatch(actions.getAttornies(token))
    }
    else {
      dispatch({type:'DO_REQUEST'})
      delete e['token']
      delete e['value']
      delete e['label']
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

class  LawyerForm extends Component {
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
              <Field
                    name="lw_id"
                    component={rdField.hidden} 
                   
                    />
                <div className="col-12">
                  <Field
                    name="lw_office_name"
                    component={renderHorizontalField} 
                    fixedLabel='90px'
                    type="text"
                    label="Office name:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="lw_first_name"
                    fixedLabel='90px'
                    component={renderHorizontalField} 
                    type="text"
                    label="First name:"
                    />
                </div>

                <div className="col-2">
                  <Field
                    name="lw_mid_name"
                    component={renderHorizontalField} 
                    type="text"
                    label="Mid:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="lw_last_name"
                    component={renderHorizontalField} 
                    type="text"
                    label="Last name:"
                    />
                </div>

                <div className="col-12">
                  <Field
                    name="lw_address"
                    component={renderHorizontalField} 
                    type="text"
                    fixedLabel='90px'
                    label="Address:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="lw_city"
                    fixedLabel='90px'
                    component={renderHorizontalField} 
                    type="text"
                    label="City:"
                    />
                </div>

                <div className="col-2">
                  <Field
                    name="lw_state"
                    component={renderHorizontalField} 
                    type="text"
                    label="St:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="lw_zip"
                    component={renderHorizontalField} 
                    type="text"
                    label="Zip:"
                    />
                </div>
                
                <div className="col-5">
                  <Field
                    name="lw_phone_1"
                    fixedLabel='90px'
                    component={renderHorizontalField} 
                    type="text"
                    label="Phone:"
                    />
                </div>

                <div className="col-5">
                  <Field
                    name="lw_phone_2"
                    component={renderHorizontalField} 
                    type="text"
                    label="Alt. Phone:"
                    />
                </div>

                <div className="col-2">
                  <Field
                    name="lw_fee_pr"
                    component={renderHorizontalField} 
                    type="text"
                    label="Fee %:"
                    />
                </div>
              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>handleAdd()} variant={'fab'} type='add' color='primary' />
              <Button onClick={()=>dispatch(submit('lawyerForm', 'qwe'))} variant={'fab'} type='save' color='default' />
              <Button onClick={()=>handleDelete()} variant={'fab'} type='delete' color='secondary' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'lawyerForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  onSubmit:handleSubmit,
})(LawyerForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
  initialValues: {...state.attorney.currentAttorney.lw_id&&state.attorney.currentAttorney, token:state.app.token}
}),
)(Form)