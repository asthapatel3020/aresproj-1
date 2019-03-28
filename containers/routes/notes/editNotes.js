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
	console.log('submit',e)
    if (e.noteId) {
    	let note = {
			...(e.assignTo)&&{ assigned_to:e.assignTo.value},
			event_description:e.full_description,
			event_short_text:e.short_description,
			done_flag:e.isDone,
			when_to_do:utils.convertDateMaskFullYear(e.whenToCheck)

    	}
		dispatch({type:'DO_REQUEST'})
         	axios.put(`${actions.API_URL}events/${e.noteId}`,
					qs.stringify(note),
		         {
		        headers:{ 'Authorization': "bearer " + e.token}
		        }).then(res=> {
		        	dispatch(submit('notesSearchForm', 'qwe'))
					dispatch({type:'DO_SUCCESS'})
					dispatch({type:'OPEN_ALERT', msg:'Successfully edited!'})
					console.log('res',res)
		          return res;
		        }).catch(err=> {
					dispatch({type:'DO_FAILURE'})
		        	console.log('err', err)
		        	return false
		        })
    } else {

    }

    let final = {

    }
    // console.log('FILTERS1!11!', filters)
    // dispatch(actions.getNotes(filters, e.token))
   
}

const dateMask = createTextMask({
  pattern: '99/99/9999'
})

class  EditNotes extends Component {
  state = {whenDisabled:true, whatDisabled:true, tasksDisabled:false}
  
  componentWillMount() {

  }
  componentWillReceiveProps(nextProps) {

  }
  
 

  // const user = props.user
  render() {
    const { handleSubmit, pristine, reset, submitting, errors, dispatch, handleDelete, handleAdd} = this.props
    const {whenDisabled, whatDisabled, tasksDisabled} = this.state
    const {renderField, renderHorizontalField, renderInvisibleField, renderTextarea} = rdField

    console.log('disabled', whatDisabled)
    return (
      <div style={{width:'80%', border:'1px solid rgb(221, 221, 221)', padding:15}} >
        <form onSubmit={handleSubmit}>
        	<div className="d-flex">
        		<div style={{width:'80%'}}>
					<div className="row" style={{paddingLeft:140}}>
						<div className="col-3">
							 <Field
			                    name="whenToCheck"
			                    component={renderField} 
			                    // fixedLabel='90px'
			                    type="text"
			                    style={{padding:5}}
			                    label="Follow up:" 
			                    {...dateMask}/>
						</div>
						<div className="col-4 select-with-input" style={{marginTop:10}} >
                   			 <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Assigned to:</div>
			                  <Field 
			                    name='assignTo'  
			                    placeholder={''} 
			                    // className="select-top"
			                    component={rdField.tableSelect} 
			                    options={this.props.users}/>
						</div>
						<div className="col-4 select-with-input" style={{marginTop:10}} >
                   			 <div style={{fontWeight:500, fontSize:'1rem', color:'#565656'}}>Done:</div>
                   			 <div className="d-flex">
                   			 	<div  style={{marginTop:5, marginRight:15, color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem'}}>
				                  <label>
									<Field value={"Y"} component="input" type="radio" name="isDone" />
									 Yes
									</label>
								</div>
								<div style={{marginTop:5, color:'rgb(86, 86, 86)', fontWeight:500, fontSize:'0.9rem'}}>
					                 <label>
										<Field value={"N"} component="input" type="radio" name="isDone" />
									 No
									</label>
								</div>
                   			 </div>
			                 
						</div>
					</div>
				

					<div className="row">
						<div className="col-12">
							<Field
			                    name="short_description"
			                    component={renderHorizontalField} 
			                    fixedLabel='130px'
			                    type="text"
			                    style={{padding:5}}
			                    label="Short description:" 
			                   />
						</div>
					</div>


					<div className="row">
						<div className="col-12">
							<Field
			                    name="full_description"
			                    component={renderTextarea} 
			                    fixedLabel='130px'
			                    type="text"
			                    style={{padding:5}}
			                    label="Full description:" 
			                   />
						</div>
					</div>


					<div className="row select-with-input d-flex align-items-center" > 
						<div style={{fontWeight:500, fontSize:'1rem', color:'#565656', width:125, marginLeft:15, marginTop:15}}>Subject: </div>
						<div className="col-3" style={{marginTop:15}}>
			                  <Field 
			                    name='type'  
			                    placeholder={'Select subject'} 
			                    // className="select-top"
			                    props={{disabled:true}}
			                    component={rdField.tableSelect} 
			                    options={this.props.subjects}/>
						</div>
						<div className="col-6" style={{marginTop:15}}>
			                  <Field 
			                    name='type'  
			                    placeholder={''} 
			                    // className="select-top"
			                    props={{disabled:true}}
			                    component={rdField.tableSelect} 
			                    options={this.props.subjects}/>
						</div>

					</div>
        		</div>
				<div style={{width:'20%', marginLeft:15, padding:'1rem'}} className="d-flex justify-content-end">
					<MaterialButton onClick={()=>dispatch(submit('notesEditForm', 'qwe'))} variant={'raised'} type='save' color='primary' label='SAVE'/>
				</div>
        	</div>
			
        </form>
      </div>
    )
  }
}

const Form = reduxForm({ 
  form: 'notesEditForm',
  validate,
  // keepDirtyOnReinitialize: true,
  enableReinitialize: true,
  onSubmit:handleSubmit,
})(EditNotes);

// const selector = formValueSelector('addPersonalInfoForm');

export default connect(
  state =>({
    // const hasEmailValue = selector(state, 'hasEmail'),
  initialValues: {
	isDone:state.notes.editNote?state.notes.editNote.done_flag:'N',
	token:state.app.token,
	noteId:state.notes.editNote?state.notes.editNote.event_id:'',
	short_description:state.notes.editNote?state.notes.editNote.event_short_text:'',
	full_description:state.notes.editNote?state.notes.editNote.event_description:'',
	whenToCheck:state.notes.editNote?utils.convertDateMaskFullYear(state.notes.editNote.when_to_do):'',
	assignTo:state.notes.editNote?state.notes.editNote.assigned_to:''
  }
}),
)(Form)