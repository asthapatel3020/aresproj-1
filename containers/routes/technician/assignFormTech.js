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
const selector = formValueSelector('addToInventoryForm')

let Item = ({ e, i, fields, isRent, items }) => {
  console.log('JTEM', e, isRent)
  return <div key={i} className="d-flex align-items-center" style={{border:'1px solid #ccc9c9', padding:10, borderRadius:10, marginTop:10}}>
          <div style={{width:'55%'}}>
            <div className="d-flex align-items-end">
              <div style={{width:'70%', marginTop:10, marginRight:'1rem'}}>
                <div style={{fontWeight:500, fontSize:'0.9rem', color:'#565656'}}>Item:</div>
                <Field 
                  name={`${e}.item`}  
                  placeholder={'Select item'} 
                  component={rdField.tableSelect} 
                  // className="select-top"
                  options={items}/>
              </div>
              <div style={{width:'40px'}}>
                <Field 
                    name={`${e}.quantity`}  
                    type="text"
                    label='Quantity'
                    style={{width:'100%', padding:5}}
                    component={rdField.renderField} 
                    labelSize='0.9rem'
                  />
              </div>
          
            </div>

          </div>
          
    <div className="select-clear a-hover" onClick={()=>fields.remove(i)} style={{marginLeft:50, fontSize:'0.74rem', marginBottom:6}}>Remove</div>
  </div>
}

Item = connect(
  (state, props) => ({

    isRent: selector(state, `${props.e}.item`)
  })
)(Item)


const renderSkills =({fields, isEdit, items, classes, chooseService, currentService, options, utils, meta:{error}})=> {
  return (
    <div>
      {fields.map((e, i)=>
        <Item e={e} fields={fields} items={items} key={i} i={i} /> 
      
      )}
      {!isEdit&&<div className="a-hover" style={{color:'grey', marginTop:10}} onClick={() => fields.push()}>Add item</div>}
    </div>
      
  )
}

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
    // console.log('FOORM', this.props)
    const { handleSubmit, pristine, users, submitting, errors, dispatch, handleDelete, handleAdd, getAsyncPatients, providers, items} = this.props
    const {renderField, renderHorizontalField, chooseDistrict, renderVerticalTextarea, skillsMultiSelect, renderDropzoneInput, renderPriceList} = rdField
    return (
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row d-flex align-items-end">
            <div className="col-10 patient-card" style={{padding:0, boxShadow:'none', borderRadius:0}}>
                  <div style={{marginTop:10}}>
                    <div style={{fontWeight:500, fontSize:'1rem', color:'#565656',marginBottom:10}}>Items:</div>
                    <FieldArray isEdit={this.props.techItemForEdit.item_id?true:false} name='items' items={items} component={renderSkills} />
                  </div>


            </div>
            <div className="col-2 d-flex flex-column justify-content-between align-items-end" style={{paddingTop:'15px'}}>
              <Button onClick={()=>dispatch(submit('addToInventoryForm', 'qwe'))} variant={'fab'} type='save' color='default' />
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'addToInventoryForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  // onSubmit:handleSubmit,
})(ScheduleForm);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
    techItemForEdit:state.items.techItemForEdit,
  initialValues: {
    items:state.items.techItemForEdit?[{...state.items.techItemForEdit, item:state.items.techItemForEdit.item_id}]:[{}]
  }
}),
)(Form)