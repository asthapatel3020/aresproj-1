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
import moment from 'moment'

const validate = formValidates.validate


class  ScheduleForm extends Component {
  state = {email:'123', districts:[{}], skills:[], experience:[], workPhotos:[]}
  
  componentWillMount() {
    this.props.currentItem.supplier_company_id&&console.log('HELLO', this.props.currentItem)
    this.props.currentItem.supplier_company_id&&this.props.getLines({value:this.props.currentItem.supplier_company_id})
  }
  componentWillReceiveProps(nextProps) {

  }
  
  goBack() {
  }
  getLines(id) {
    console.log('qwe', id)
  }

  // const user = props.user
  render() {
    const { handleSubmit, isRent, users, submitting, errors, dispatch, handleDelete, handleAdd, getAsyncPatients, providers, items, suppliers, getLines, lines} = this.props
    const {renderField, renderHorizontalField, renderDateTime, renderVerticalTextarea, skillsMultiSelect, renderSkills, renderCheckBoxGroup, renderPriceList} = rdField
    console.log('isRent', isRent)
    
    return (
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-end">
            <div className="col-10 patient-card" style={{padding:0, boxShadow:'none', borderRadius:0}}>
              <div style={{width:'40%'}}>
                    <Field 
                      name='item_code'  
                      label={'Item code'}
                      type="text"
                      style={{width:'100%', padding:5}}
                      component={rdField.renderField} 
                    />
              </div>
              <div className="d-flex">
                <div style={{width:'40%', marginRight:15}}>
                  <div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Supplier:</div>
                  <Field 
                    name='supplier_company_id'  
                    placeholder={'Select supplier'} 
                    // className="select-top"
                    // onSelect={()=>getLines(this.props.supplier_id)}
                    onSelect={(e)=>getLines(e)}
                    component={rdField.valueSelect} 
                    options={suppliers}/>
                </div>
                <div style={{width:'40%'}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Line:</div>
                    <Field 
                      name='supplier_company_line_id'  
                      placeholder={'Select line'} 
                      // className="select-top"
                      component={rdField.tableSelect} 
                      options={lines}/>
                </div>
              </div>
              
              <div style={{width:'90%'}}>
                    <Field 
                      name='item_description'  
                      label={'Item description'}
                      type="text"
                      style={{width:'100%', padding:5}}
                      component={rdField.renderField} 
                    />
              </div>
              <div style={{width:'20%'}}>
                    <Field 
                      name='ordering_price'  
                      label={'Ordering price'}
                      type="text"
                      style={{width:'100%', padding:5}}
                      component={rdField.renderField} 
                    />
              </div>
              <div style={{width:'20%'}}>
                    <Field 
                      name='quantity'  
                      label={'Stock quantity'}
                      type="text"
                      style={{width:'100%', padding:5}}
                      component={rdField.renderField} 
                    />
              </div>
              <div style={{width:'20%'}}>
                  <div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Type:</div>
                  <Field 
                    name='type'  
                    placeholder={'Select type'} 
                    // className="select-top"
                    component={rdField.tableSelect} 
                    options={[{value:'S', label:'Sale'},{value:'R', label:'Rent'}]}/>
              </div>

               

              <div style={{width:'60%'}}>
                  <div style={{fontWeight:500, fontSize:'1rem', color:'#565656', marginTop:10}}>Customization type:</div>
                  <Field 
                    name='customization_types'  
                    // placeholder={'Customization type'} 
                    // className="select-top"
                    component={renderCheckBoxGroup} 
                    options={[{id:1, name:'Left'},  {id:2, name:'Right'}, {id:3, name:'Pair'},{id:4, name:'Bmi'}]}/>
              </div>
            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('itemForm', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'itemForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(ScheduleForm);

const selector = formValueSelector('itemForm');

export default connect(
  state =>({
  isRent:selector(state, 'type'),
  supplier_id:selector(state, 'supplier_company_id'),
    // const hasEmailValue = selector(state, 'hasEmail'),
  initialValues: state.items.itemForEdit,
  //   // custTypes:state.itemForEdit?state.itemForEdit.customization_types:[]
  // }
}),
)(Form)