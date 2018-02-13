
import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
import Input from '../../../components/ui/Input';
import '../countries/countryTable.css';
import {Button} from '../../../components/ui'
				// 
class Question extends Component {
	state={question:'', answers:[], count:2, errors:[]}

	handleNameChange(e) {
    	this.setState({ retailerName: e.target.value });
  	}
	
	

  	handleSave(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
  		let answers = [];
  		this.state.answers.map((ans,i)=>answers.push({id:i+1, option:ans}))

      this.state.question&&this.state.answers.length>1&&this.props.dispatch(actions.createQuestionOther(this.state.question, answers )); 
      this.state.question&&this.state.answers.length>1&&this.props.router.push("/questionsother");
      !this.state.question&&this.setState({errors:['Поле текста вопроса не заполнено']})
      this.state.answers.length<2&&this.setState({errors:['Как минимум два ответа должны быть заполнены']})
  	}
  	// componentWillReceiveProps(nextProps) {
  	// 	console.log("WILLRECEIVE", nextProps)
  	// 	nextProps.isSent&&this.props.router.push('/retailers');
  	// }
  	componentDidMount() {
  		this.props.isSent&&this.props.dispatch(actions.clearState())
  	}
  	handleQuestionChange(e) {
  		this.setState({question:e.target.value})
  	}
  	handleAnswerChange(e, i){
  		let answers = this.state.answers.slice();
     	answers[i] = e.target.value;
     	this.setState({answers});
  	}
  	removeClick(i) {
  		let answers = this.state.answers.slice();
     answers.splice(i,1);
     this.setState({
        count: this.state.count - 1,
        answers
     })
  	}
  	createUi(i) {
  		let uiItems = [];
     	for(let i = 0; i < this.state.count; i++){
           uiItems.push(
               	<div key={i}>
					<div className="form-group form-group1">
		              <label style={{lineHeight:'2.5em', width:'20%'}} style={{lineHeight:'2.5em'}}>Ответ {i+1}</label>
		              <Input required placeholder="Ответ"  isFull value={this.state.answers[i] || ''} onFieldChange={(e)=>this.handleAnswerChange(e, i)}/>
		            	{i!==0&&i!==1&&<Button onClick={(e)=>this.removeClick(e, i)} label="X" style={{textAlign:'right', marginLeft:'15px', height:'33px'}} size="btn-sm" color="btn-danger"   /> }
		            	
		            </div>
                   
               	</div>
            )
     	}
    	return uiItems || null;
  	}
	render() {
		// const {countries} = this.props.countries;
		return (
			<div 
				className="route-wrapper"
				style={{display:'flex', alignItems:'center', padding:'30px 30px 60px 30px', borderBoxing:'border-box', flexDirection:'column'}}>
				<div className="add-country-form" style={{width:'100%'}}>
					<div className="form-group form-group1">
		              <label style={{lineHeight:'2.5em', width:'20%'}} style={{lineHeight:'2.5em'}}>Вопрос</label>
		              <Input required placeholder="Текст вопроса"  isFull value={this.state.question} onFieldChange={(e)=>this.handleQuestionChange(e)}/>
		            </div>
		            {this.createUi()}
		            <div style={{color:'#ffc333', textAlign:'right', paddingRight:'6%'}} >
		            	<span className="add-answer" onClick={()=>this.setState({count: this.state.count+1})}>+ Добавить ответ</span>
		            </div>      	
		            <div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}} >

		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
				</div>
				<div style={{color:'red'}}>
          {this.state.errors.map((item,i)=> (<div key={i}>{item}</div>))}
          
					{this.props.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    isSent: state.retailer.addSuccess,
    errors: state.retailer.errors

  };
}
export default connect(mapStateToProps)(Question);
