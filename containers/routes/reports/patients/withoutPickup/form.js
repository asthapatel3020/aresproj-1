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
    finish_date_from: values.finish_date_all?null:values.finish_date_from?utils.reverseDateMaskFullyear(values.finish_date_from):null,
    finish_date_to: values.finish_date_all?null:values.finish_date_to?utils.reverseDateMaskFullyear(values.finish_date_to):null,
    codes: values.codes_all?null:values.codes?values.codes:null,
  }
  dispatch(actions.getWithoutPickup(props.token, final, 1))

}
class  WithoutPickupForm extends PureComponent {
  
  componentWillReceiveProps(nextProps) {

  }
  

  // const user = props.user
  render() {
    const { handleSubmit, submitting, errors, codes} = this.props
    const {renderHorizontalField} = rdField
    console.log('propsform', this.props)
    return (
      <div className="d-flex" style={{width:'100%'}}>
        <form onSubmit={handleSubmit} style={{width:'100%', display:'flex'}}>
        {
            //left side
          }
          <div style={{marginRight:15, width:'49%'}}>
            <div > 
              <div>
                <div className="gray-border" style={{ marginRight:10}}>
                  <div className="col-12" style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                    Finish date
                  </div>
                  <div className="d-flex">
                    <div className="col-5">
                      <Field
                          name="finish_date_from"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.finishDateAll}}
                          label="From:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-5">
                      <Field
                          name="finish_date_to"
                          component={renderHorizontalField} 
                          // fixedLabel='90px'
                          type="text"
                          props={{disabled: this.props.finishDateAll}}
                          label="To:" 
                          {...dateMask}/>
                    </div>
                    <div className="col-2" style={{paddingTop:15}}>
                      <label>
                        <Field component="input" type="checkbox" name="finish_date_all" />
                       All
                      </label>
                    </div>
                  </div>
                  
                </div>

                  
              </div>
              

              <div>
                  <div className='d-flex justify-content-between' style={{margin:'10px 0'}}>
                    <div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
                        Equipment code
                    </div>
                    <div  >
                            <label>
                              <Field component="input" type="checkbox" name="codes_all" />
                             All
                            </label>
                    </div>
                  </div>
                  <div style={{position:'relative'}}>
                    <div style={{position:'absolute', height:'100%', width:'100%', zIndex:2,display:this.props.codesAll?'block':'none' }}></div>
                    <Field 
                    component={CheckBoxTable}  
                    name="codes" 
                    tableHeight={400}
                    options={codes}
                    cell1={'label'}
                    cell1Label={'Code'}
                    tableName='codes1'
                    columnsNumber={1}/>
                  </div>


              </div>
            </div>

           

          </div>

        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'withoutPickupForm',
  validate,
  // keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  destroyOnUnmount: false,
  onSubmit:handleSubmit,
})(WithoutPickupForm);

const selector = formValueSelector('withoutPickupForm');

export default connect(
  state =>({
  finishDateAll:selector(state, 'finish_date_all'),
  codesAll:selector(state, 'codes_all'),
 
  token:state.app.token,
  initialValues: {
    finish_date_all:true,
    codes_all:true,

  }
}),
)(Form)