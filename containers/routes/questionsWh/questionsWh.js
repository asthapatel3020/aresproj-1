import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
import {Button} from '../../../components/ui';
import ItemSelect from '../shops/itemSelect'
import QuestionsTable from './questionsTable'
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';

const initialState={catId:'', subCatId:'', checkedQuestions:[], questionsId:[], questionList:[], errors:[], toShow:false}

class QuestionsWh extends Component {
	state=initialState
	componentWillReceiveProps(nextProps) {
		nextProps.errors&&this.setState({ errors:nextProps.errors})
		nextProps.addSuccess&&this.setState(initialState)

	}
	componentWillMount() {
		// this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		this.props.dispatch(actions.getQuestionsWh(this.props.token, this.props.id))

		this.props.dispatch(actions.getCategories(this.props.token, this.props.id))
		// this.setState({questionList:this.props.questions.concat(this.props.tempQuestions)})
	}
	componentDidUpdate() {

  		this.props.addSuccess&&this.props.dispatch(actions.clearState())
  	}
	handleCatChange(e) {
		console.log("BUG")
		this.props.dispatch(actions.getSubCategories(this.props.token, this.props.id, e.target.value))
		this.setState({catId:e.target.value, subCatId:'', toShow:false})
	}
	handleSubCatChange(e) {
		this.setState({subCatId:e.target.value, toShow:true})
		!e.target.value&&this.setState({toShow:false})
		this.props.dispatch(actions.getCheckedQuestionsWh(this.props.token, this.props.id, e.target.value, this.state.catId))


	}
	handleSave(){
		this.state.catId&&
		this.state.subCatId&&
		this.props.dispatch(actions.addQuestionCategory(this.props.token, this.props.id, this.state.checkedQuestions, this.state.catId, this.state.subCatId))
		!this.state.catId||!this.state.subCatId&&this.setState({errors:[{message:"Категория или подкатегория не указаны"}]})

	}
	handleCheck=(e, questions)=>{
		let arr =[];
		let options=[];
		const {allQuestions} = this.props;
		for (let i=0;i<e.length;i++) {
			let options = [];
			allQuestions[e[i]].options.map(o=>options.push(o.option))
			arr.push({text:allQuestions[e[i]].question, options:options})
			// e++;

		}
		this.setState({checkedQuestions:arr})
	}
	render() {
		const {categories, subcategories} = this.props.categories;
		let questions = this.props.questions.concat(this.props.tempQuestions);
		console.log("temp", this.state, this.props.addSuccess)

		// let cities = [];
		// console.log("que", this.props.checkedQuestions)

		return (
			<div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
				<div className="route-wrapper" style={{marginBottom:20, padding:'3%', paddingBottom:'2%', width:'100%'}}>
						<div className="form-group form-group1">
			            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Категория</label>
							<ItemSelect   value={this.state.catId} defaultOption={"Выберите категорию"} onSelect={(e)=>this.handleCatChange(e)} items={categories}/>
			            	
			            </div>
			            <div className="form-group form-group1">
			            	<label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Подкатегория</label>
							<ItemSelect value={this.state.subCatId} defaultOption={"Выберите подкатегорию"} onSelect={(e)=>this.handleSubCatChange(e)} items={subcategories}/>
			            	
			            </div>
					
				
				</div>
				{this.state.toShow&&<div className="route-wrapper" style={{padding:'3%', width:'100%'}}>
					
					<QuestionsTable  checkedQuestions={this.props.checkedQuestions} getQuestions={e=>this.handleCheck(e)} router={this.props.router} items={questions}/>
					<div style={{width:'100%', display:'flex', justifyContent:'flex-end', marginTop:'25px'}}>

		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
		            <div style={{color:'red'}}>

					{this.state.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
				</div>}

			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    userAccess: state.app.userAccess,
    categories: state.categories,
    questions:state.questions.questionswh,
    tempQuestions:state.questions.tempQuestionswh,
    allQuestions: state.questions.allQuestions,
   	questionsReducer: state.questions,
   	errors:state.question.errors,
   	addSuccess:state.question.addSuccess,
   	checkedQuestions:state.questions.checkedQuestions

	
  };
}
export default connect(mapStateToProps)(QuestionsWh);
