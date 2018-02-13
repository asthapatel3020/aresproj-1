import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import LineChart from '../../../../components/charts/LineChart';
import PieChart from '../../../../components/charts/PieChart';
import RetailStats from './retailStats'
import CategoryStats from './categoryStats'
import Comments from './comments'
import {Pager} from '../../../../components/ui'
import ModalFactory from '../../../../components/modals/factory'
import CommentsPhoto from '../../../../components/modals/commentPhoto'

const Factory = ModalFactory.modalFromFactory;

class Dolya extends Component  {
	state={reportChoice:'dolya', currentPageS:1, currentPageB:1, totalS:'', totalB:''}

	componentWillMount() {
		this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, 1))
		this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, 1))
		
	}
	componentWillReceiveProps(nextProps) {
		this.props.filters!==nextProps.filters&&this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, nextProps.filters, 1))
		this.props.filters!==nextProps.filters&&this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, nextProps.filters, 1))
		this.setState({
			totalS:nextProps.comments.metaSubCat.total_pages, 
			currentPageS: nextProps.comments.metaSubCat.current_page,
			totalB:nextProps.comments.metaBrand.total_pages, 
			currentPageB: nextProps.comments.metaBrand.current_page,
		})
	}

	handleChangePageS=(e)=> {
		this.setState({currentPageS:e})
		this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, e))

	}
	handleNextS=()=> {
		this.setState({currentPageS:this.state.currentPageS+1})
		this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, this.state.currentPageS+1))

	}
	handlePreviousS=()=> {
		this.setState({currentPageS:this.state.currentPageS-1})
		this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, this.state.currentPageS-1))


	}
	handleChangePageB=(e)=> {
		this.setState({currentPageB:e})
		this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, e))

	}
	handleNextB=()=> {
		this.setState({currentPageB:this.state.currentPageB+1})
		this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, this.state.currentPageB+1))
		

	}
	handlePreviousB=()=> {
		this.setState({currentPageB:this.state.currentPageB-1})
		this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, this.state.currentPageB-1))

	}
	zoomPhoto=(e)=> {
		this.props.dispatch(actions.zoomPhoto(e))
		ModalFactory.show("commentsPhoto");
	}
	render() {
		const {piechart, comments} = this.props;
		return (
			<div >
				<Factory modalref="commentsPhoto" title="Фото" factory={CommentsPhoto} large={true}/>

				<div className="route-wrapper" style={{marginBottom:'2%'}}>
					<LineChart 
		              data={this.props.graphic}
		            />
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'2%'}}>
					<div className="reports-block" >
						<div className="pie-title">Whirlpool против других</div>
							{piechart?
								<PieChart data={piechart.whirlpool.brands} />:
								<div style={{textAlign:'center', fontWeight:'600', marginTop:50, fontSize:'2em'}}>Период не выбран</div>}
					</div>
					<div className="reports-block" >
						<div className="pie-title">Наши бренды против других</div>
						{piechart?
								<PieChart data={piechart.competitors.brands} />:
								<div style={{textAlign:'center', fontWeight:'600', marginTop:50, fontSize:'2em'}}>Период не выбран</div>}
					</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'2%'}}>
					<div className="reports-block" style={{maxHeight:'250px', overflow:'auto'}}>
						<div style={{fontWeight:'600', color:'black'}}>Розничные сети</div>
						<RetailStats items={this.props.retailStats}/>
					</div>
					<div className="reports-block" style={{maxHeight:'250px', overflow:'auto'}}>
						<div style={{fontWeight:'600', color:'black'}}>Категории</div>
						<CategoryStats items={this.props.catStats}/>
					</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5%'}}>
					<div className="reports-block" >
						<div style={{fontWeight:'600', color:'black'}}>Комментарии по подкатегориям</div>
						<Comments comments={comments.commentsSubCat} zoomPhoto={(e)=>this.zoomPhoto(e)}/>
					</div>
					<div className="reports-block" >
						<div style={{fontWeight:'600', color:'black'}}>Комментарии (Другие)</div>
						<Comments comments={comments.commentsBrand} zoomPhoto={(e)=>this.zoomPhoto(e)}/>
					</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'3%'}}>
					<div style={{width:'50%', paddingRight:'1%'}}>
						{comments.metaSubCat.total_pages!==1&&
							<Pager 
								currentPage={this.state.currentPageS} 
								itemsPerPage={15}
								pages={this.state.totalS}
								onPage={e=>this.handleChangePageS(e)}
								onNext={this.handleNextS}
								onPrevious={this.handlePreviousS}
							/>
						}
					</div>
					<div style={{width:'50%'}}>
						{comments.metaBrand.total_pages!==1&&
							<Pager 
								currentPage={this.state.currentPageB} 
								itemsPerPage={15}
								pages={this.state.totalB}
								onPage={e=>this.handleChangePageB(e)}
								onNext={this.handleNextB}
								onPrevious={this.handlePreviousB}
							/>
						}
					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    filters: state.appliedFilters,
    comments:state.comments
  };
}
export default connect(mapStateToProps)(Dolya);
