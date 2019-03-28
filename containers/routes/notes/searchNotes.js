import React, {Component} from 'react'
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import * as rdField  from '../../../components/form/renderField'
import * as formValidates  from '../../../components/form/formValidates'
import { connect } from 'react-redux';
import * as actions from '../../../actions'
import { submit } from 'redux-form'
import axios from 'axios'
import qs from 'qs'
import { createTextMask} from 'redux-form-input-masks';
import MaterialButton from '../../../components/ui/MaterialButton'
import * as utils from '../../../components/functions/functions'
import NotesTable from './notesTable'

const validate = formValidates.validate

const handleSubmit=(e, dispatch)=> {
    console.log('law', e)
    let filters = {
    	...(e.isAllTasks==false)&&{done_flag:e.isDone},
    	...(e.isAll==false)&&{fromDate:utils.reverseDateMaskFullyear(e.from)},
    	...(e.isAll==false)&&{toDate:utils.reverseDateMaskFullyear(e.to)}

    }
    console.log('FILTERS1!11!', filters)
    dispatch(actions.getNotes(filters, e.token))
   
}

const dateMask = createTextMask({
  pattern: '99/99/9999'
})

class  SearchNotes extends Component {
  state = {whenDisabled:true, whatDisabled:true, tasksDisabled:false}
  
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
	editNote(e) {
		console.log(e)
		this.props.dispatch(actions.editNote(e))
		this.props.changeTab()
	}

  // const user = props.user
  render() {
    const { handleSubmit, pristine, reset, submitting, errors, dispatch, handleDelete, handleAdd} = this.props
    const {whenDisabled, whatDisabled, tasksDisabled} = this.state
    const {renderField, renderHorizontalField, renderInvisibleField} = rdField

    console.log('disabled', whatDisabled)
    return (
      <div style={{width:'80%', border:'1px solid rgb(221, 221, 221)', padding:15}} >
        <form onSubmit={handleSubmit}>
        	<div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline'}}>
        		When to check
        	</div>
        	<div className="row">
				<div className="col-2">
					 <Field
	                    name="from"
	                    component={renderHorizontalField} 
	                    // fixedLabel='90px'
	                    type="text"
						props={{disabled: whenDisabled}}
	                    label="From:" 
	                    {...dateMask}/>
				</div>
				<div className="col-2">
					 <Field
	                    name="to"
	                    component={renderHorizontalField} 
	                    // fixedLabel='90px'
	                    type="text"
						props={{disabled: whenDisabled}}
	                    label="To:" 
	                    {...dateMask}/>
				</div>
				<div className="col-1" style={{color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem', paddingTop:'1.3rem'}}>
					<label>
						<Field component="input" type="checkbox" name="isAll" onClick={()=>this.setState({whenDisabled:!whenDisabled})}/>
					 All
					</label>
				</div>
				<div className="col-4 d-flex justify-content-end" style={{marginTop:15}}>
					<MaterialButton onClick={()=>dispatch(submit('notesSearchForm', 'qwe'))} variant={'raised'} type='search' color='primary' label='Search'/>
				</div>
        	</div>

        	<div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline', marginTop:15}}>
        		What to check
        	</div>

        	<div className="row">
				<div className="col-4" style={{marginTop:15}}>
	                  <Field 
	                    name='subject_type'  
	                    placeholder={'Select subject'} 
	                    // className="select-top"
	                    props={{disabled: whatDisabled}}
	                    onChange={(e)=>console.log(e)}
	                    component={rdField.tableSelect} 
	                    options={this.props.subjects}/>
				</div>
				<div className="col-7" style={{marginTop:15}}>
	                  <Field 
	                    name='subject'  
	                    placeholder={''} 
	                    // className="select-top"
	                    props={{disabled: whatDisabled}}
	                    component={rdField.tableSelect} 
	                    options={this.props.subjects}/>
				</div>
				<div className="col-1" style={{color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem', paddingTop:'1.3rem'}}>
					<label>
						<Field component="input" type="checkbox" name="isAllSubjects" onClick={()=>this.setState({whatDisabled:!whatDisabled})}/>
					 All
					</label>
					
				</div>
        	</div>
         	
         	<div style={{fontWeight:500, fontSize:'1.1rem', textDecoration:'underline', marginTop:15}}>
        		Task
        	</div>

        	<div className="row">
        		<div className="col-2 d-flex">
        			<div  style={{marginTop:15, marginRight:15, color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem'}}>
	                  <label>
						<Field props={{disabled: tasksDisabled}} value={"Y"} component="input" type="radio" name="isDone" />
						 Yes
						</label>
					</div>
					<div style={{marginTop:15, color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem'}}>
		                 <label>
							<Field props={{disabled: tasksDisabled}} value={"N"} component="input" type="radio" name="isDone" />
						 No
						</label>
					</div>
        		</div>
				
				<div className="col-1" style={{color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem', paddingTop:'1rem'}}>
					<label>
						<Field component="input" type="checkbox" name="isAllTasks" onClick={()=>this.setState({tasksDisabled:!tasksDisabled})}/>
					 All
					</label>
					
				</div>
        	</div>
        </form>

		<div style={{marginTop:25}}>
			<NotesTable items={this.props.notes} editItem={(e)=>this.editNote(e)}/>
		</div>

      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'notesSearchForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  onSubmit:handleSubmit,
})(SearchNotes);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
  initialValues: {
	isAll:true,
	isAllTasks:false,
	isAllSubjects:true,
	isDone:'N',
	token:state.app.token
  }
}),
)(Form)