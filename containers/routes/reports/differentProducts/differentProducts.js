import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import LineChart from '../../../../components/charts/LineChart';
import PieChart from '../../../../components/charts/PieChart';
import {Pager} from '../../../../components/ui'
import RetailStats from './retailStats'
import CategoryStats from './categoryStats'
import ProductStats from './productStats'
import Comments from './comments'
import ModalFactory from '../../../../components/modals/factory'
import CommentsPhoto from '../../../../components/modals/commentPhoto'

const Factory = ModalFactory.modalFromFactory;

class DifferentPrices extends Component  {
	state={reportChoice:'dolya', currentPageP:1, currentPageC:1, totalP:'', totalC:''}

	componentWillMount() {
		this.props.filters.from&&this.props.dispatch(actions.getAmountProductStats(this.props.token, this.props.id, this.props.filters, 1))
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, 1))
		
	}
	componentWillReceiveProps(nextProps) {
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAmountProductStats(this.props.token, this.props.id, nextProps.filters, 1))

		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, nextProps.filters, 1))

		this.setState({
			totalP:nextProps.productMeta.total_pages, 
			currentPageP: nextProps.productMeta.current_page,
			totalC:nextProps.comments.metaProduct.total_pages, 
			currentPageC: nextProps.comments.metaProduct.current_page,
		})
	}

	handleChangePageP=(e)=> {
		this.setState({currentPageP:e})
		this.props.dispatch(actions.getPricesProductStats(this.props.token, this.props.id, this.props.filters, e))

	}
	handleNextP=()=> {
		this.setState({currentPageP:this.state.currentPageP+1})
		this.props.dispatch(actions.getPricesProductStats(this.props.token, this.props.id, this.props.filters, this.state.currentPageP+1))

	}
	handlePreviousP=()=> {
		this.setState({currentPageP:this.state.currentPageP-1})
		this.props.dispatch(actions.getPricesProductStats(this.props.token, this.props.id, this.props.filters, this.state.currentPageP-1))


	}
	handleChangePageC=(e)=> {
		// e.preventDefault()
		this.setState({currentPageC:e})
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, e))
		
	}
	handleNextC=()=> {
		this.setState({currentPageC:this.state.currentPageC+1})
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, this.state.currentPageC+1))
		

	}
	handlePreviousC=()=> {
		this.setState({currentPageC:this.state.currentPageC-1})
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, this.state.currentPageC-1))

	}
	zoomPhoto=(e)=> {
		this.props.dispatch(actions.zoomPhoto(e))
		ModalFactory.show("commentsPhoto");
	}
	render() {

		const {graphic, retailStats, productStats, categoryStats, comments, productMeta} = this.props;
		return (
			<div >
				<Factory modalref="commentsPhoto" title="Фото" factory={CommentsPhoto} large={true}/>
				<div className="route-wrapper" style={{marginBottom:'2%'}}>
					<LineChart 
		              data={graphic}
		            />
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'2%'}}>
					<div className="reports-block" style={{maxHeight:'250px', overflow:'auto'}}>
						<div style={{fontWeight:'600', color:'black'}}>Розничные сети</div>
						<RetailStats items={retailStats}/>
					</div>
					<div className="reports-block" style={{maxHeight:'250px', overflow:'auto'}}>
						<div style={{fontWeight:'600', color:'black'}}>Категории</div>
						<CategoryStats items={categoryStats}/>
					</div>
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'0.5%', alignItems:'flex-start'}}>
					<div className="reports-block" style={{position:'relative'}}>
						<div style={{fontWeight:'600', color:'black'}}>Продукты</div>
						<ProductStats items={productStats}/>
						<div style={{position:'absolute', top:'103%', right:0}}>
							{
								productMeta.total_pages!==1||!productMeta&&
								<Pager 
									currentPage={this.state.currentPageP} 
									itemsPerPage={15}
									pages={this.state.totalP}
									onPage={e=>this.handleChangePageP(e)}
									onNext={this.handleNextP}
									onPrevious={this.handlePreviousP}
								/>
							}
						</div>
					</div>
					<div className="reports-block" >
						<div style={{fontWeight:'600', color:'black'}}>Комментарии по продуктам</div>
						<Comments comments={comments.commentsProduct} zoomPhoto={(e)=>this.zoomPhoto(e)}/>
					</div>
				</div>
						<div style={{display:'flex', justifyContent:'space-between', marginBottom:'3%', alignItems:'flex-start'}}>
					<div style={{width:'50%'}}>
						
					</div>
					<div style={{width:'50%'}}>
						{comments.metaProduct.total_pages!==1&&
							<Pager 
								currentPage={this.state.currentPageC} 
								itemsPerPage={15}
								pages={this.state.totalC}
								onPage={e=>this.handleChangePageC(e)}
								onNext={this.handleNextC}
								onPrevious={this.handlePreviousC}
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
export default connect(mapStateToProps)(DifferentPrices);
