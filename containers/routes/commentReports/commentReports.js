import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import Input from '../../../components/ui/Input';
import {Button} from '../../../components/ui'
import CommentsTable from './commentsTable'
import ModalFactory from '../../../components/modals/factory'
import CommentsPhoto from '../../../components/modals/commentPhoto'
import {Pager} from '../../../components/ui'


const Factory = ModalFactory.modalFromFactory;


class CommentReports extends Component {
	state={
		choice:'whirlpool', 
		errors:[], 
		success:false, 
		searchValue:'', 
		searchValue1:'', 
		searchValue2:'',
		total:'',
		total1:'',
		total2:'',
		currentPage:1,
		currentPage1:1,
		currentPage2:2
	}
	componentWillMount() {
		// this.props.dispatch(actions.getQuestionStats(this.props.token, this.props.id))
		this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, 1))
		this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, 1))
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, 1))
	}
	componentWillReceiveProps(nextProps) {
		this.props.filters!==nextProps.filters&&
		this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, nextProps.filters, 1))
		this.props.filters!==nextProps.filters&&
		this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, nextProps.filters, 1))
		this.props.filters!==nextProps.filters&&
		this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, nextProps.filters, 1))
		
		const {metaSubCat, metaBrand, metaProduct} = nextProps.comments;
		this.setState({
			total:metaProduct.total_pages, 
			currentPage: metaProduct.current_page,
			total1:metaBrand.total_pages, 
			currentPage1: metaBrand.current_page,
			total2:metaSubCat.total_pages, 
			currentPage2: metaSubCat.current_page,
		})
	}
	handleSearchChange=(e)=> {
		this.setState({searchValue:e.target.value})
	}
	handleSearchChange1=(e)=> {
		this.setState({searchValue1:e.target.value})
	}
	handleSearchChange2=(e)=> {
		this.setState({searchValue2:e.target.value})
	}
	toUnix=(e)=> {
		let arr = e.split('.')
		let date = e
		if (arr.length==3) {
			 date = new Date(arr[2], parseInt(arr[1]), parseInt(arr[0]))
		}
		return date/1000
	}
	handleSearch(type) {
		console.log(type)
		if (type=='product') {
			// let search = this.state.searchValue.match('.')?this.toUnix(this.state.searchValue):this.state.searchValue 
			let search = this.state.searchValue
			this.state.searchValue?
			this.props.dispatch(actions.searchComments(this.props.token, this.props.id, this.props.filters, 1, search, type)):
			this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, 1))
		}
		else if (type=='brand') {
			// let search = this.state.searchValue1.match('.')?this.toUnix(this.state.searchValue1):this.state.searchValue1 
			let search = this.state.searchValue1
			this.state.searchValue1?
			this.props.dispatch(actions.searchComments(this.props.token, this.props.id, this.props.filters, 1, search, type)):
			this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, 1))
		}
		else if (type=='subcategory') {
			// let search = this.state.searchValue2.match('.')?this.toUnix(this.state.searchValue2):this.state.searchValue2
			let search = this.state.searchValue2
			this.state.searchValue2?
			this.props.dispatch(actions.searchComments(this.props.token, this.props.id, this.props.filters, 1, search, type)):
			this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, 1))
		}
	}
	zoomPhoto=(e)=> {
		this.props.dispatch(actions.zoomPhoto(e))
		ModalFactory.show("commentsPhoto");
	}
	handleChangePage(e, type) {
		if (type=='product') {
			this.setState({currentPage:e})
			this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, e))
		}
		else if (type=='brand') {
			this.setState({currentPage1:e})
			this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, e))
		}
		else if (type=='subcat') {
			this.setState({currentPage2:e})
			this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, e))
		}
	}
	handleNext=(type)=> {
		if (type=='product') {
			this.setState({currentPage:this.state.currentPage+1})
			this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, this.state.currentPage+1))
		}
		else if (type=='brand') {
			this.setState({currentPage1:this.state.currentPage1+1})
			this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, this.state.currentPage1+1))
		}
		else if (type=='subcat') {
			this.setState({currentPage2:this.state.currentPage2+1})
			this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, this.state.currentPage2+1))
		}
	}
	handlePrevious=(type)=> {
		if (type=='product') {
			this.setState({currentPage:this.state.currentPage-1})
			this.props.dispatch(actions.getCommentsProduct(this.props.token, this.props.id, this.props.filters, this.state.currentPage-1))
		}
		else if (type=='brand') {
			this.setState({currentPage1:this.state.currentPage1-1})
			this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, this.state.currentPage1-1))
		}
		else if (type=='subcat') {
			this.setState({currentPage2:this.state.currentPage2-1})
			this.props.dispatch(actions.getCommentsSubCat(this.props.token, this.props.id, this.props.filters, this.state.currentPage2-1))
		}
	}
	render() {
		const {commentsSubCat, commentsBrand, commentsProduct, metaSubCat, metaBrand, metaProduct} = this.props.comments;
		console.log("eee", commentsProduct)
		return (
			<div 
				className="route-wrapper upload-wrapper"
				style={{padding:'3% 5% 5% 3%', marginTop:'15px'}}
			>
				<Factory modalref="commentsPhoto" title="Фото" factory={CommentsPhoto} large={true}/>

				<div className="upload-choice">
					<div 
						className={this.state.choice=='whirlpool'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'whirlpool'})}>Whirlpool</div>
					<div 
						className={this.state.choice=='other'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'other'})}>Другие</div>
					<div 
						className={this.state.choice=='products'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'products'})}>Продукты</div>
				</div>
				{
				this.state.choice=='whirlpool'&&
				<div>
					<div style={{width:300, display:'flex'}}>
		            	<Input placeholder="Поиск"  value={this.state.searchValue} onFieldChange={(e)=>this.handleSearchChange(e)}/>
						<Button onClick={()=>this.handleSearch('product')} label={<i className="fa fa-arrow-right"></i>} style={{marginLeft:10, textAlign:'right', color:'red', padding:'5px 12px'}} size="btn-sm" color="btn-warning"   /> 
					</div>
					<CommentsTable type={'product'} items={commentsProduct} zoomPhoto={e=>this.zoomPhoto(e)}/>
					{this.state.total!==1&&<Pager 
								currentPage={this.state.currentPage} 
								itemsPerPage={15}
								pages={this.state.total}
								onPage={e=>this.handleChangePage(e, 'product')}
								onNext={()=>this.handleNext('product')}
								onPrevious={()=>this.handlePrevious('product')}
					/>}
				</div>
				}
				{this.state.choice=='other'&&
				<div>
					<div style={{width:300, display:'flex'}}>
		            	<Input placeholder="Поиск"  value={this.state.searchValue1} onFieldChange={(e)=>this.handleSearchChange1(e)}/>
						<Button onClick={()=>this.handleSearch('brand')} label={<i className="fa fa-arrow-right"></i>} style={{marginLeft:10, textAlign:'right', color:'red', padding:'5px 12px'}} size="btn-sm" color="btn-warning"   /> 
					</div>
					<CommentsTable type={'brand'} items={commentsBrand} zoomPhoto={e=>this.zoomPhoto(e)}/>
					{this.state.total1!==1&&<Pager 
								currentPage={this.state.currentPage1} 
								itemsPerPage={15}
								pages={this.state.total1}
								onPage={e=>this.handleChangePage(e, 'brand')}
								onNext={()=>this.handleNext('brand')}
								onPrevious={()=>this.handlePrevious('brand')}
					/>}
				</div>}
				{this.state.choice=='products'&&
				<div>
					<div style={{width:300, display:'flex'}}>
		            	<Input placeholder="Поиск"  value={this.state.searchValue2} onFieldChange={(e)=>this.handleSearchChange2(e)}/>
						<Button onClick={()=>this.handleSearch('subcategory')} label={<i className="fa fa-arrow-right"></i>} style={{marginLeft:10, textAlign:'right', color:'red', padding:'5px 12px'}} size="btn-sm" color="btn-warning"   /> 
					</div>
					<CommentsTable type={'subcat'} items={commentsSubCat} zoomPhoto={e=>this.zoomPhoto(e)}/>
					{this.state.total2!==1&&<Pager 
								currentPage={this.state.currentPage2} 
								itemsPerPage={15}
								pages={this.state.total2}
								onPage={e=>this.handleChangePage(e, 'subcat')}
								onNext={()=>this.handleNext('subcat')}
								onPrevious={()=>this.handlePrevious('subcat')}
					/>}
				</div>}
				
				
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    comments:state.comments,
 	filters:state.appliedFilters
  };
}
export default connect(mapStateToProps)(CommentReports);
