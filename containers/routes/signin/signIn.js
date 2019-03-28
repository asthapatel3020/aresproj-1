import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/ui/Input'
import * as actions from '../../../actions';

class SignIn extends Component {
	state={email:'', password:''}
	handleEmailChange(e) {
		this.setState({email:e.target.value})
	}
	handlePassChange(e) {
		this.setState({password:e.target.value})
	}
	handleLogin() {
		this.state.email&&this.state.password&&this.props.dispatch(actions.signIn(this.state.email, this.state.password))
	}
	componentWillReceiveProps(nextProps) {
		nextProps.loggedIn&&this.props.loggedIn!==nextProps.loggedIn&&this.props.router.push('/')
	}
	render() {
	
	const {email, password} = this.state
		return (
			<div className="row" style={{background:'#f3f4f8', padding:'3rem 0'}}>
				<div className="container">
					<div className="col-md-6 signin d-flex flex-column">
						<div>
							<div style={{color:'#8b90ae', fontSize:'1.1rem', fontWeight:'500'}}>ВХОД</div>
							<div style={{marginTop:'5px'}}>Введите свои данные чтобы войти в личный кабинет</div>
						</div>
						<div style={{margin:'1rem 0'}}>
							<div style={{marginBottom:'1rem'}}>
								<Input 
								title={"Email"} type={'email'} format={'email'} required={true} icon="fa fa-envelope"
								errorMessage={"Неправильный формат email"} 
								value={email}
								onFieldChange={(e)=>this.handleEmailChange(e)}/>
							</div>
							<div>
								<Input 
								title={"Пароль"} type={'password'} required={true} icon="fa fa-unlock"
								value={password}
								onFieldChange={(e)=>this.handlePassChange(e)}/>
							</div>
						</div>
						<div className="col-12" style={{padding:'0 0 1rem 0', color:'red'}}>
							{this.props.errors.map((e,i)=>{
								return <div key={i}>{e}</div>
							})}
						</div>
						<div className="row mt-auto">
							<div className="col-5">
								<input 
								type="submit"  className="round-btn btn-blue" value="Вход" style={{height:45}} 
								onClick={()=>this.handleLogin()}/>	
							</div>
							<div className="col-6 offset-md-1">
								<input 
								type="submit"  className="round-btn btn-trans" value="Регистрация" style={{height:45}} 
								onClick={()=>this.props.router.push('/signup')}/>	
							</div>
							<div className="col-5 underlined" style={{marginTop:15}}>Забыли пароль?</div>
						</div>
						
					</div>
					
				</div>
			</div>
		)
	}
}
const mapStateToProps=(state)=> {
  return {
    token: state.signUp.token,
    errors:state.app.errors,
    success:state.signUp.success,
    loggedIn:state.app.loggedIn
  };
}

export default connect(mapStateToProps)(SignIn)