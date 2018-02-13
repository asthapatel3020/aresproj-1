import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
				// 
class QuestionReports extends Component {
	state={choice:'whirlpool', errors:[], success:false}
	componentWillMount() {
		// this.props.dispatch(actions.getQuestionStats(this.props.token, this.props.id))
		this.props.dispatch(actions.getQuestionsWh(this.props.token, this.props.id))
		this.props.dispatch(actions.getQuestionsOther(this.props.token, this.props.id))
		this.props.dispatch(actions.getAuditHistory(this.props.token, this.props.id, this.props.filters, 1))
		
	}
	handleQuestionClick=(q)=> {
		this.props.dispatch(actions.setQuestion(q))
		this.props.router.push(`/question_reports/question_details/${q.id}`)
	}
	render() {
		console.log("que", this.props.questionsWh, this.props.questionsOther)
		const {questionsWh, questionsOther} = this.props;
		return (
			<div 
				className="route-wrapper upload-wrapper"
				style={{padding:'3% 5% 5% 3%', marginTop:'15px'}}
			>
				<div className="upload-choice">
					<div 
						className={this.state.choice=='whirlpool'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'whirlpool'})}>Whirlpool</div>
					<div 
						className={this.state.choice=='other'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'other'})}>Другие</div>
				</div>
				{this.state.choice=='whirlpool'?
				<div>
					{questionsWh.map((e,i)=>(
						<div key={e.id} style={{marginBottom:15}}>
							<div onClick={()=>this.handleQuestionClick(e)}className="question-click">
								{e.question}
							</div>
							<div style={{display:'flex'}}>
								{e.options.map((o,i)=>(
									<div key={`${i}opwh`} style={{border:'2px solid #eee', borderRadius:3, padding:'1px 8px', marginRight:10}}>
										{`${o.option} ${o.percent}%`}
									</div>
								))}
							</div>
						</div>	
					))}
				</div>
				: 
				<div>
					{questionsOther.map((e,i)=>(
						<div key={e.id} style={{marginBottom:15}}>
							<div onClick={()=>this.handleQuestionClick(e)}className="question-click">
								{e.question}
							</div>
							<div style={{display:'flex'}}>
								{e.options.map((o,i)=>(
									<div key={`${i}opother`} style={{border:'2px solid #eee', borderRadius:3, padding:'1px 8px', marginRight:10}}>
										{`${o.option} ${o.percent}%`} 
									</div>
								))}
							</div>
						</div>	
					))}
				</div>
				}
				
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    questionsOther:state.questionsOther.questionswh,
    questionsWh:state.questions.questionswh,
 	filters:state.appliedFilters
  };
}
export default connect(mapStateToProps)(QuestionReports);
