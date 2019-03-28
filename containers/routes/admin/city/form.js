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
import CityTable from './table'

const validate = formValidates.validate

const handleSubmit=(e, dispatch, props)=> {
    console.log('statuses', e)
    
    dispatch({type:'DO_REQUEST'})

      let items = []

      e.citiesAdmin.map((e,i)=>{
        delete e.value
        delete e.label
        items.push(e)
      })
      const final = {
        items:items,
        ...(props.deleted_cities.length>0)&&{deleted:props.deleted_cities},
      }
      // dispatch(actions.updateAttorney(e))
      axios.put(`${actions.API_URL}cities`,
        qs.stringify(final),
         {
        headers:{'Authorization': "bearer " + props.token}
        }).then(res=> {
          dispatch({type:'DO_SUCCESS'})
          dispatch(actions.getCities(props.token))
          dispatch(actions.deleteCity([]))
          dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
          return res;
        }).catch(err=> {
          dispatch({type:'DO_FAILURE'})
          console.log('error', err)
          return false
        })
}

class  CityForm extends Component {
  state = {currentStatus:'', currentStatusIdx:0, bottomDiv:''}
  


  handleDelete() {
      const {dispatch, chooseService, statuses, deleted_cities, currentCityObject, currentItem} = this.props
      console.log('qq', currentCityObject)
            // dispatch(arrayRemove('visitRegistry', `serviceList`, currentService))
    // console.log('statussss', `${currentStatus}.bill_status_id`)

        if (currentCityObject.city_id == undefined) {
          console.log('netid', currentItem)
          if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
            dispatch(arrayRemove('cityForm', `citiesAdmin`, currentItem))
          }
        } else  {
          console.log('estid', currentItem)
          if (window.confirm('Are you sure you wish to delete this service and its treatments?')) {
            dispatch(arrayRemove('cityForm', `citiesAdmin`, currentItem))
            dispatch(actions.deleteCity([...deleted_cities, currentCityObject.city_id]))
          }
          
        }
        
        this.setState({count:this.state.count-1})
      
    }
  handleAdd() {
    this.props.dispatch(arrayPush('cityForm', 'citiesAdmin', {}))
      // this.props.chooseService(this.state.count+1)
      setTimeout(() => {
        this.table.childTable.scrollIntoView({alignToTop:false})
      }, 100)
    
      // this.setState({count:this.state.billStatus+1})

  }
  selectItem(e,i) {
    // this.setState({currentStatus:i, currentStatusIdx:i})
    this.props.dispatch(actions.selectCurrentCity(i))
  }
  
  componentDidMount() {
    this.props.dispatch(actions.deleteCity([]))
  }
  // const user = props.user
  render() {
    const { handleSubmit, pristine, reset, currentItem, errors, dispatch, handleAdd,  handleDelete, selectItem} = this.props
    console.log('currentStatus', this.props.deleted_cities)
    return (
      <div className="col-12" >
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-10">
              <CityTable 
                onRef={(node) => { this.table = node;}}
                selectItem={(e, i)=>this.selectItem(e, i)} 
                handleAdd={()=>this.handleAdd()} 
                currentItem={currentItem}/>
                <div ref={(node) => { this.bottom = node}}></div>
            </div>
            <div className="col-2 d-flex flex-column align-items-center justify-content-end" style={{ paddingTop:'15px'}}>
              <Button onClick={()=>this.handleAdd()} variant={'fab'} type='add' color='primary' style={{marginTop:15}}/>
              <Button onClick={()=>this.handleDelete()} variant={'fab'} type='delete' color='secondary' style={{marginTop:15}}/>
              <Button onClick={()=>dispatch(submit('cityForm', 'qwe'))} variant={'fab'} type='save' color='default' style={{marginTop:15}}/>
              
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'cityForm',
  validate,
  keepDirtyOnReinitialize: true,
  // enableReinitialize: true,
  onSubmit:handleSubmit,
})(CityForm);

const selector = formValueSelector('cityForm');

export default connect(
  state =>({
   currentCityObject:selector(state, `citiesAdmin[${state.city.currentCity}]`),
  initialValues: {
    citiesAdmin:state.city.cities,
  }
}),
)(Form)