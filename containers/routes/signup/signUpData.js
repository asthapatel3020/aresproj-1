import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/ui/Input'
import * as actions from '../../../actions';
import Dropzone from 'react-dropzone'

class SignUp extends Component {
	state={email:"", phone:"+7", pass1:"", pass2:"", error:'', SMS:'', name:'', surname:'', files:[]}

	componentWillReceiveProps(nextProps) {
  		if(nextProps.success) {
  			let e = this.props.sDataType+1;
			this.props.handleChangeType(e)
  		}
  		if(nextProps.completeSuccess&&nextProps.completeSuccess!==this.props.completeSuccess) {
  			let e = this.props.sDataType+1;
			this.props.handleChangeType(e)
  		}
  	}
	handleEmailChange(e) {
    	this.setState({ email: e.target.value });
  	}
  	handlePhoneChange(e) {
    	this.setState({ phone: e.target.value });
  	}
  	handlePass1Change(e) {
    	this.setState({ pass1: e.target.value });
  	}
  	handlePass2Change(e) {
    	this.setState({ pass2: e.target.value });
  	}
  	handleSMSChange(e) {
  		this.setState({SMS:e.target.value})
  	}
  	handleNameChange(e) {
  		this.setState({name:e.target.value})
  	}
  	handleSurnameChange(e) {
  		this.setState({surname:e.target.value})
  	}
	handleNextContacts(e) {
		// this.setState({error:''})
		// this.state.email&&
		// this.state.phone&&
		// this.state.pass1&&
		// this.state.pass2&&
		// this.state.pass1==this.state.pass2&&
		this.props.dispatch(actions.signUp(this.state.email, this.state.phone.replace('+',''), this.state.pass1))
			// e++
			// this.props.handleChangeType(e)
		
		
		!this.state.email|!this.state.phone|!this.state.pass1|!this.state.pass22&&this.setState({error:'Заполните все поля.'})
		this.state.pass1!==this.state.pass2&&this.setState({error:'Пароли на совпадают.'})
	}
	handlePreviousPhone(e) {
		e--
		this.props.handleChangeType(e)
	}
	handleNextPhone(e, phone) {
		e++
		this.props.handleChangeType(e)
		// this.props.dispatch(actions.sendPhoneCheck(phone))
	}
	handleCompleteSignUp() {
		// let e = this.props.sDataType+1;
		// this.props.handleChangeType(e)
		this.props.dispatch(actions.completeSignUp(this.state.name, this.state.surname, this.state.files[0], this.props.token))
	}
	onDrop(files) {
		this.setState({files})
	}
	render() {
		const {sDataType} = this.props
		const {email, phone, pass1, pass2, name, surname} = this.state
		// console.log('sDataType', this.props)
		
		return (
			<div className="col-md-6 signup-data">
					<div className="row align-items-center no-gutters" style={{padding:'0 2rem', height:'15%', backgroundColor:'#ededf5', width:'100%', color:'#858994', fontSize:'1rem', fontWeight:'600'}}>
						<div className="col-12">{sDataType==1?'1. ВАШИ КОНТАКТНЫЕ ДАННЫЕ':sDataType==2?'2. ВВЕДИТЕ ПАРОЛЬ, УКАЗАННЫЙ В СМС':sDataType==3?'3. ОСНОВНАЯ ИНФОРМАЦИЯ':''}</div>
					</div>
					{sDataType==1&&<div className="d-flex flex-column" style={{height:'85%', paddingBottom:'1rem'}}>
						<div className="row" style={{padding:'2rem 2rem 0.5rem 2rem'}}>
							
							<div className="col-12">
								<Input 
									title={"Email"} format="email" required={true} icon="fa fa-envelope" 
									errorMessage={"Неправильный формат email"} 
									value={email} 
									onFieldChange={(e)=>this.handleEmailChange(e)}/>
							</div>
						</div>
						<div className="row" style={{padding:'0.5rem 2rem'}}>
							<div className="col-12">
								<Input 
								title={'Телефон'} format="phone" required={true} icon="fa fa-phone" 
								errorMessage={"Неправильный формат телефона"}
								placeholder="77072200555"
								value={phone}
								onFieldChange={(e)=>this.handlePhoneChange(e)}/>

							</div>
						</div>
						<div className="row" style={{padding:'0.5rem 2rem'}}>
							<div className="col-6">
								<Input 
								title={"Пароль"} type={'password'} required={true} icon="fa fa-unlock"
								value={pass1}
								onFieldChange={(e)=>this.handlePass1Change(e)}/>
							</div>
							<div className="col-6">
								<Input 
								title={"Повторите пароль"} type={'password'} required={true} icon="fa fa-unlock"
								value={pass2}
								onFieldChange={(e)=>this.handlePass2Change(e)}/>
							</div>
						</div>
						<div className="row" style={{padding:'0 2rem', color:'red'}}>
							<div className="col-12">{this.state.error}</div>
						</div>
						<div style={{padding:'0 2rem', color:'red'}}>
							{this.props.errors.map((e,i)=>{
								return <div key={i}>{e}</div>
							})}
						</div>
						<div className="row mt-auto" style={{padding:'0 2rem'}}>
							<div className="col-12">
								<input 
								type="submit"  className="round-btn btn-blue" value="Далее" style={{height:45}} 
								onClick={()=>this.handleNextContacts(sDataType)}/>	
							</div>
						</div>
					</div>}

					{sDataType==2&&
					<div className="d-flex flex-column" style={{height:'85%', paddingBottom:'1rem'}}>
						<div style={{padding:'2rem 2rem 1rem 2rem'}}>
							Вы успешно зарегистрированы! На номер, который вы указали при регистрации, отправлено СМС с кодом для подтверждения регистрации. В дальнейшем на данный номер вам будут приходить уведомления.
						</div>
						<div className="row" style={{padding:'1rem 2rem'}}>
							<div className="col-6">
								<Input 
								title={"Код из СМС"}
								required={true}
								onFieldChange={(e)=>this.handleSMSChange(e)}/>
							</div>
							<div className="col-5 offset-md-1 align-self-end a-hover" style={{paddingBottom:10}}>Отправить повторно</div>
						</div>
						<div className="row mt-auto" style={{padding:'0 2rem'}}>
							<div className="col-5">
								<input 
								type="submit"  className="round-btn btn-trans" value="Назад" style={{height:45}} 
								onClick={()=>this.handlePreviousPhone(sDataType)}/>	
							</div>
							<div className="col-6 offset-md-1">
								<input 
								type="submit"  className="round-btn btn-blue" value="Далее" style={{height:45}} 
								onClick={()=>this.handleNextPhone(sDataType, this.state.phone)}/>	
							</div>
						</div>
					</div>}

					{sDataType==3&&
					<div className="d-flex flex-column" style={{height:'85%', paddingBottom:'0.1rem'}}>
						<div className="row" style={{padding:'1rem 2rem 0.5rem 2rem'}}>
							<div style={{padding:'0 1rem 0 1rem', height:120, height:120, marginBottom:'0.5rem'}}>
								<Dropzone className="addphoto" onDrop={(files)=>this.onDrop(files)} style={{width:120, height:120, outline:'1px solid #858993', display:'flex', flexDirection:'column', position:'relative'}}>
									<div className="addphoto" style={{height:'20%', width:'100%', background:'rgba(140, 140, 140, 0.1)', fontSize:'0.7rem', textAlign:'center', marginTop:'auto', lineHeight:'1.3rem', position:'absolute', bottom:0, zIndex:1}}>Добавить фото</div>
						        	{this.state.files.length>0&&<img src={this.state.files[0].preview} alt="" style={{height:120, width:120}}/>}
						        </Dropzone>
							</div>
							<div className="col-12">
								<Input 
								title={'Имя'} format="noNumbers" required={true} icon="fa fa-user" 
								errorMessage={"Введите настоящие имя"}
								value={name}
								onFieldChange={(e)=>this.handleNameChange(e)}/>
							</div>
						</div>
						<div className="row" style={{padding:'0.5rem 2rem'}}>
							<div className="col-12">
									<Input 
									title={'Фамилия'} format="noNumbers" required={true} icon="fa fa-user" 
									errorMessage={"Введите настоящую фамилию"}
									value={surname}
									onFieldChange={(e)=>this.handleSurnameChange(e)}/>
							</div>
						</div>
						<div style={{padding:'0 2rem', color:'red'}}>
							{this.props.completeErrors.map((e,i)=>{
								return <div key={i}>{e}</div>
							})}
						</div>
						<div className="row mt-auto" style={{padding:'0 2rem'}}>
							<div className="col-5">
								<input 
								type="submit"  className="round-btn btn-trans" value="Назад" style={{height:45}} 
								onClick={()=>this.handlePreviousPhone(sDataType)}/>	
							</div>
							<div className="col-6 offset-md-1">
								<input 
								type="submit"  className="round-btn btn-blue" value="Сохранить" style={{height:45}} 
								onClick={()=>this.handleCompleteSignUp(sDataType)}/>	
							</div>
						</div>
					</div>}

					{sDataType==4&&
					<div className="d-flex flex-column" style={{height:'85%', paddingBottom:'1rem', background:'#ededf5', color:'#8990ab'}}>
						<div style={{textAlign:'center', paddingTop:'2rem'}}>
							<i className="far fa-check-circle" style={{fontSize:'7rem'}}></i>
							<div style={{fontSize:'1rem', marginTop:'2rem'}}>РЕГИСТРАЦИЯ УСПЕШНО ЗАВЕРШЕНА!</div>
						</div>
						<div className="row mt-auto" style={{padding:'0 2rem'}}>
							
							<div className="col-12">
								<input 
								type="submit"  className="round-btn btn-blue" value="Вернуться на главную страницу" style={{height:45}} 
								onClick={()=>this.props.router.push('/')}/>	
							</div>
						</div>
					</div>}



			</div>	
		)
	}
}
const mapStateToProps=(state)=> {
  return {
    token: state.signUp.token,
    errors:state.signUp.errors,
    success:state.signUp.success,
    userId:state.signUp.userId,
    completeErrors:state.signUp.completeErrors,
    completeSuccess:state.signUp.completeSuccess,

  };
}

export default connect(mapStateToProps)(SignUp)

