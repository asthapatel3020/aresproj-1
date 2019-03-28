import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from '../../actions';
import Input from '../ui/Input';

class Login extends Component {

	constructor(props) {
		super(props);
		this.state = {
	      email: '',
	      password: '',
	      error:'',
	      endpoint:''
	    };
	}

	handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}
	
	handlePassChange(e) {
    	this.setState({ password: e.target.value });
  	}

  	handleLogin(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
      this.props.dispatch(actions.auth(this.state.email, this.state.password)); 
  	}

	render() {
    // console.log("app", this.props.app)
    const {dispatch} = this.props;
    // console.log("222", this.props.errors)
		return (
        <form role="form" style={{position:'relative', bottom:'50px'}}>
            <div className="login-logo"></div>
            <div style={{minHeight:34}}><Input style={{marginBottom:'10px'}}  isFull={true} format="login"  required={true} errorMessage="Логин не должен содержать буквы кириллицы или пробел" placeholder="Введите имя пользователя" value={this.state.email} onFieldChange={(e)=>this.handleEmailChange(e)} /></div>
            <div style={{minHeight:34}}><Input style={{marginBottom:'10px'}}  isFull={true} format="password" required={true} errorMessage="Пароль не должен содержать буквы кириллицы или пробел" placeholder="Введите пароль" value={this.state.password} onFieldChange={(e)=>this.handlePassChange(e)} /></div>
            <p className="help-block">{this.props.errorMessage ? this.props.errorMessage.message : ''}</p>
            <div className="form-group">
                <button type="button" onClick={(e)=>this.handleLogin(e)} className="btn btn-warning btn-block w-pad">Войти</button>
            </div>
            <div style={{color:'red', textAlign:'center', position:'absolute', bottom:-50, width:'100%'}}>
              <p>{this.props.errors.map(e=>e.message)}</p>
            </div>
            <div style={{position:'fixed', bottom:10, right:'50%', textAlign:'center'}}>version: 1.0.11</div>
        </form>
		);
	}
}
const mapStateToProps = state => ({
    app: state.app,
    errors:state.app.errors
});

// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(actions, dispatch)
// });

export default connect(mapStateToProps)(Login);
