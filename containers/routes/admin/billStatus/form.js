import React, {Component} from 'react'
import { Field, reduxForm, FieldArray, arrayPush, arrayRemove, formValueSelector } from 'redux-form'
import * as rdField  from '../../../../components/form/renderField'
import * as formValidates  from '../../../../components/form/formValidates'
import { connect } from 'react-redux';
import * as actions from '../../../../actions'
import Button from '../../../../components/ui/roundButton'
import { submit } from 'redux-form'
import axios from 'axios'
import qs from 'qs'
import StatusesTable from './table'

const validate = formValidates.validate

const handleSubmit=(e, dispatch, props)=> {
    console.log('statuses', e)
    dispatch({type:'DO_REQUEST'})

      let items = []

      e.billStatusesAdmin.map((e,i)=>{
        delete e.value
        items.push({
          active_in:e.active_in.value?e.active_in.value:e.active_in,
          ...(e.bill_status_id)&&{bill_status_id:e.bill_status_id},
          bill_status_nm:e.bill_status_nm,
          bill_status_description:e.bill_status_description
        })
      })
      const final = {
        items:items,
        ...(props.deleted_statuses.length>0)&&{deleted:props.deleted_statuses},
      }
      // dispatch(actions.updateAttorney(e))
      axios.put(`${actions.API_URL}bill-statuses`,
        qs.stringify(final),
         {
        headers:{'Authorization': "bearer " + e.token}
        }).then(res=> {
          dispatch({type:'DO_SUCCESS'})
          dispatch(actions.getBillStatuses(e.token))
          dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
          return res;
        }).catch(err=> {
          dispatch({type:'DO_FAILURE'})
          return false
        })
      // dispatch(actions.selectAttorney({}))
}

class  BillStatusForm extends Component {
  state = {currentStatus:'', currentStatusIdx:0, bottomDiv:''}
  


  handleDelete() {
      const {dispatch, chooseService, statuses, deleted_statuses, currentStatusObject, currentItem} = this.props
      console.log('qq', currentStatusObject)
            // dispatch(arrayRemove('visitRegistry', `serviceList`, currentService))
    // console.log('statussss', `${currentStatus}.bill_status_id`)

        if (currentStatusObject.bill_status_id == undefined) {
          console.log('netid', currentItem)
          if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
            dispatch(arrayRemove('billStatusForm', `billStatusesAdmin`, currentItem))
          }
        } else  {
          console.log('estid', currentItem)
          if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
            dispatch(arrayRemove('billStatusForm', `billStatusesAdmin`, currentItem))
            dispatch(actions.deleteStatus([...deleted_statuses, currentStatusObject.bill_status_id]))
          }
          
        }
        
        
      
    }
  handleAdd() {
    this.props.dispatch(arrayPush('billStatusForm', 'billStatusesAdmin', {}))
      // this.props.chooseService(this.state.count+1)
      setTimeout(() => {
        this.table.childTable.scrollIntoView({alignToTop:false})
      }, 100)
    
      // this.setState({count:this.state.billStatus+1})

  }
  selectItem(e,i) {
    // this.setState({currentStatus:i, currentStatusIdx:i})
    this.props.dispatch(actions.selectCurrentBillStatus(i))
  }
  
  componentDidMount() {
    this.props.dispatch(actions.deleteStatus([]))
  }
  // const user = props.user
  render() {
    const { handleSubmit, pristine, reset, currentItem, errors, dispatch, handleAdd,  handleDelete, selectItem} = this.props
    console.log('currentStatus', this.props.currentStatusObject)
    return (
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <StatusesTable 
                onRef={(node) => { this.table = node;}}
                selectItem={(e, i)=>this.selectItem(e, i)} 
                handleAdd={()=>this.handleAdd()} 
                currentItem={currentItem}/>
                <div ref={(node) => { this.bottom = node;}}></div>
            </div>
            <div className="col-2 d-flex flex-column align-items-center justify-content-end" style={{ paddingTop:'15px'}}>
              <Button onClick={()=>this.handleAdd()} variant={'fab'} type='add' color='primary' style={{marginTop:15}}/>
              <Button onClick={()=>this.handleDelete()} variant={'fab'} type='delete' color='secondary' style={{marginTop:15}}/>
              <Button onClick={()=>dispatch(submit('billStatusForm', 'qwe'))} variant={'fab'} type='save' color='default' style={{marginTop:15}}/>
              
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'billStatusForm',
  validate,
  keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  onSubmit:handleSubmit,
})(BillStatusForm);

const selector = formValueSelector('billStatusForm');

export default connect(
  state =>({
   currentStatusObject:selector(state, `billStatusesAdmin[${state.billStatuses.currentStatus}]`),
  initialValues: {
    billStatusesAdmin:state.billStatuses.statuses,
    token:state.app.token
  }
}),
)(Form)