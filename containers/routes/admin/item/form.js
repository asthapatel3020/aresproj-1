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
    // if (e.lw_id==undefined) {
    //   delete e['lw_id']
    //   dispatch(actions.createAttorney(e))
    //   // dispatch(actions.getAttornies())
    // }
    // else {
    //   console.log("AAAA", actions.API_URL)
    //   // dispatch(actions.updateAttorney(e))
    //   axios.put(`${actions.API_URL}attornies/${e.lw_id}?token=${e.token}`,
    //     qs.stringify(e),
    //      {
    //     headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
    //     }).then(res=> {
    //       dispatch(actions.getAttornies())
    //       return res;
    //     }).catch(err=> {return false})
    //   // dispatch(actions.selectAttorney({}))
    // }
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
                    name="delivery_date"
                    component={rdField.renderDateTime} 
                   
                    />
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
  // initialValues: {...state.attorney.currentAttorney.lw_id&&state.attorney.currentAttorney, token:state.app.token}
}),
)(Form)