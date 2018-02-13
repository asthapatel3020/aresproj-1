import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Pager} from '../../../components/ui'
import StatsTable from './statsTable'

class QuestionDetails extends Component  {
	state={reportChoice:'dolya', currentPage:1, total:''}

	componentWillMount() {
		this.props.dispatch(actions.getQuestionStats(this.props.token, this.props.id, this.props.filters, this.props.params.id))
		
	}
	componentWillReceiveProps(nextProps) {
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getQuestionStats(this.props.token, this.props.id, nextProps.filters, this.props.params.id))


		this.setState({
			// totalP:nextProps.productMeta.total_pages, 
			// currentPageP: nextProps.productMeta.current_page,
		})
	}

	handleChangePageP=(e)=> {
		this.setState({currentPageP:e})
		this.props.dispatch(actions.getAmountProductStats(this.props.token, this.props.id, this.props.filters, e))

	}
	handleNextP=()=> {
		this.setState({currentPageP:this.state.currentPageP+1})
		this.props.dispatch(actions.getAmountProductStats(this.props.token, this.props.id, this.props.filters, this.state.currentPageP+1))

	}
	handlePreviousP=()=> {
		this.setState({currentPageP:this.state.currentPageP-1})
		this.props.dispatch(actions.getAmountProductStats(this.props.token, this.props.id, this.props.filters, this.state.currentPageP-1))


	}
	
	render() {
		const {question, setQuestion} = this.props;
		console.log("QUEST", question)
		return (
			<div >
				<div className="route-wrapper" style={{marginBottom:'2%', padding:'2%'}}>
					<div className="question-click">
								{setQuestion.question}
							</div>
							<div style={{display:'flex'}}>
								{setQuestion.options&&setQuestion.options.map((o,i)=>(
									<div key={`${i}opwh`} style={{border:'2px solid #eee', borderRadius:3, padding:'1px 8px', marginRight:10}}>
										{`${o.option} ${o.percent}%`}
									</div>
								))}
							</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'2%'}}>
					<div className="reports-block">
						<div style={{fontWeight:'600', color:'black'}}>Розничные сети</div>
						{
							question.retails&&<StatsTable items={question.retails?question.retails:[]} type={'retails'}/>
						}
					</div>
					<div className="reports-block">
						<div style={{fontWeight:'600', color:'black'}}>Категории</div>
						{question.categories&&<StatsTable items={question.categories} type={'categories'}/>}
					</div>
				</div>

				{setQuestion.own==0&&<div style={{display:'flex', justifyContent:'space-between', marginBottom:'2%'}}>
					<div className="reports-block">
						<div style={{fontWeight:'600', color:'black'}}>Бренды</div>
						{
							question.brands&&<StatsTable items={question.brands} type={'brands'}/>
						}
					</div>
					
				</div>}
				
			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    filters: state.appliedFilters,
    question:state.questionStats.question,
    setQuestion:state.questionStats.setQuestion
  };
}
export default connect(mapStateToProps)(QuestionDetails);
