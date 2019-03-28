import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, FieldArray, formValueSelector } from 'redux-form'
import * as rdField  from '../components/form/renderField'
import * as formValidates  from '../components/form/formValidates'
import Cookies from 'cookies-js';

const validate = formValidates.validate

class Login extends Component {
	state={}

	onChange=(e)=> {
		
	}
	render() {
		console.log('this',this.props.error)
		return (
			<div style={{position:'fixed', width:'100%', height:'100%', background:'#fff'}} className="d-flex justify-content-center align-items-center">
				<div style={{position:'fixed', top:0}} onClick={()=>Cookies.expire('auth')} className="a-hover">Reset cookies</div>
				 <div 
				 	style={{minHeight:300, minWidth:500, borderRadius:5, border:'1px solid #cacaca', padding:'2rem'}} 
				 	className="d-flex flex-column align-items-center">
				 	<div className="logo-signin" style={{width:'80%'}}></div>
				 	<div style={{width:'70%'}}>
				 		<form onSubmit={this.props.handleSubmit}>
							<div>
								<Field
			                    	name="login"
			                    	component={rdField.renderField}
			                    	style={{padding:5, width:'100%'}} 
			                    	type="text"
			                    	label="LOGIN"/>
							</div>
							<div>
								<Field
			                    	name="password"
			                    	component={rdField.renderField}
			                    	style={{padding:5, width:'100%'}} 
			                    	type="password"
			                    	label="PASSWORD"/>
							</div>
							{this.props.error?<div style={{color:'red'}}>Invalid username or password</div>:''}
							<div>
								<button className="apply-btn" style={{width:'100%'}}>SIGN IN</button>
							</div>
				 		</form>
				 	</div>
				 </div>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    error:state.app.errors
  };
}
const tempLogin = connect(mapStateToProps)(Login);


const Form = reduxForm({ 
  form: 'login',
  validate,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(tempLogin);

export default Form
