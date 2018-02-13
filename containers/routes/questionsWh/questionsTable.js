/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Profile
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
import '../countries/countryTable.css';
import {Button} from '../../../components/ui';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
// componentDidMount() {
  
// }
class QuestionsTable extends Component  {
	state={questions:[], success:false}
	questionsChecked=(newQuestions)=>{
		this.setState({questions:newQuestions})
	}
	uncheckAll=()=> {
		this.setState({questions:[]})
	}
	checkAll=()=> {
		let arr =[];
		this.props.items.map((item,i)=>arr.push(i))
		this.setState({questions:arr})
	}
	componentDidUpdate(prevProps, prevState) {
		prevState.questions!==this.state.questions&&this.props.getQuestions(this.state.questions)
		console.log("ll", prevState.questions, this.state.questions)
		
	}
	componentWillReceiveProps(nextProps) {
		this.props.addSuccess!==nextProps.addSuccess&&this.setState({questions:[]})
		let arr=[];
		const {items} = this.props
		for (let i=0;i<nextProps.checkedQuestions.length; i++) {
			for (let j=0;j<items.length; j++) {
				items[j].id==nextProps.checkedQuestions[i].id&&arr.push(j)
			}
		}
		// console.log("test", items, arr)
		nextProps.checkedQuestions!==this.props.checkedQuestions&&this.setState({questions:arr})
	}
	handleChangeClick(e, item) {
		this.props.dispatch(actions.setEditQuestionWh(item))
		this.props.router.push(`/questionswh/edit`)
	}
	render(){
		// console.log("table", this.state.questions)
		const {props} = this;
	return<div style={{marginLeft:'-3.4%', marginRight:'-3.4%'}}> 
		<div style={{display:'flex', justifyContent:'space-between', padding:'0 3%'}}>
			            <label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Вопросы</label>
			            <div className="question-btns">
			            	<span>Выбрано: {this.state.questions.length}/{this.props.items.length}</span>
		            		<Button onClick={this.checkAll} label="Выбрать все" style={{textAlign:'right'}} size="btn-sm" color="btn-info"   /> 
		            		<Button onClick={this.uncheckAll} label="Сбросить все" style={{textAlign:'right'}} size="btn-sm" color="btn-danger"   /> 
		            		{this.props.userAccess==1&&<Button onClick={()=>this.props.router.push('/questionswh/create_question')} label="Добавить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> }
						</div>

					</div>
		<CheckboxGroup
        // checkboxDepth={2} // This is needed to optimize the checkbox group
        name="questions"
        value={this.state.questions}
        onChange={this.questionsChecked}>

		{props.items.map((item,i)=> 
			<div key={i} style={{width:'100%', padding:'10px 3.2%', paddingLeft:'5%', borderTop:'1px solid #eee', display:'flex', justifyContent:'space-between', cursor:'pointer' }}>
				<label><Checkbox value={i}  style={{marginRight:'5px'}}/>{item.question}</label>
				{this.props.userAccess==1&&<div>
		           	<Button onClick={(e)=>this.handleChangeClick(e, item)} label="Изменить" style={{textAlign:'right',color:'#ffc333'}} size="btn-sm" color="btn-default"   /> 
					
				</div>}

			</div>)}  
	 	</CheckboxGroup>                      
		
	</div>
	}
	
		// const {users} = props;
		
		// countries.forEach(item=><div>{item.name}</div>)
	// return (
	// 	<div>hello</div>
	
	// );
}
function mapStateToProps(state) {
  return {
   	addSuccess:state.question.addSuccess,
   	userAccess:state.app.userAccess


	
  };
}
export default connect(mapStateToProps)(QuestionsTable);

