import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
import ItemSelect from '../../../components/ui/itemSelect'
import {Button} from '../../../components/ui'
import FileInput from 'react-file-input';
import ReactFileReader from 'react-file-reader';
				// 
class UploadMatrix extends Component {
	state={choice:'comments', errors:[], success:false, commentsType:'brand', questionsType:'brand' }
	componentWillMount() {
		// this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		
	}
	componentDidMount() {
  		this.props.isSent&&this.props.dispatch(actions.clearState())
  		
  	}
  	componentDidUpdate(prevProps, prevState) {
  		prevState.errors.length>0&&this.setState({errors:[]})
  		prevState.success&&this.setState({success:false})

  	}
	componentWillReceiveProps(nextProps) {

		nextProps.errors&&this.setState({ errors:nextProps.errors})
		nextProps.isSent&&this.setState({success:true})
		console.log("nextprops", nextProps.path)
		nextProps.path!==this.props.path&&window.open(nextProps.path, '_blank');
	} 
	handleDownloadComments(e) {
		//token, uid, commentsType, filters
		this.props.dispatch(actions.downloadCommentsGoogle(this.props.token, this.props.id, this.state.commentsType, this.props.filters))
	}
	
	handleDownloadQuestions(e) {
		this.props.dispatch(actions.downloadQuestionsGoogle(this.props.token, this.props.id, this.state.questionsType, this.props.filters))
	}
	handleDownloadQuestions(e) {
		this.props.dispatch(actions.downloadQuestionsGoogle(this.props.token, this.props.id, this.state.questionsType, this.props.filters))
	}
	handleDownloadProducts(e) {
		this.props.dispatch(actions.downloadProductsGoogle(this.props.token, this.props.id, this.props.filters))
	}
	render() {
		let filterQuery = actions.checkFilters(this.props.filters);
		
		const {id, token} = this.props
		let mapa = {countries:[this.props.userCountry]};
  		let items = this.props.userAccess==1?this.props.countries:mapa;
		return (
			<div 
				className="route-wrapper upload-wrapper"
				style={{padding:'3% 5% 5% 3%', marginTop:'15px'}}
			>
				<div className="upload-choice" style={{width:'65%'}}>
					<div 
						className={this.state.choice=='comments'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'comments'})}>Комментарии</div>
					<div 
						className={this.state.choice=='questions'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'questions'})}>Вопросы</div>
					<div 
						className={this.state.choice=='products'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'products'})}>Продукты</div>
					<div 
						className={this.state.choice=='dolya'?'upload-chosen':''}
						onClick={()=>this.setState({choice:'dolya'})}>Доля на полке</div>
				</div>

				{this.state.choice=='comments'&&<div className="download-comments">
					<div className="download-radios">
						<input defaultChecked onClick={(e)=>this.setState({commentsType:e.target.value})} id="com-brand" name="comments" value="brand" type="radio"/>
						<label htmlFor="com-brand">Другие</label>
						<input onClick={(e)=>this.setState({commentsType:e.target.value})} id="com-subcat" name="comments" value="subcategory" type="radio"/>
						<label htmlFor="com-subcat">Подкатегория</label>
						<input onClick={(e)=>this.setState({commentsType:e.target.value})} id="com-product" name="comments" value="product" type="radio"/>
						<label htmlFor="com-product">Продукт</label>
						<input onClick={(e)=>this.setState({commentsType:e.target.value})} id="com-all" name="comments" value="all" type="radio"/>
						<label htmlFor="com-all">Все</label>

					</div>
					<div style={{width:'100%', display:'flex', justifyContent:'flex-start', marginTop:'25px'}}>
		            	<a
							href={`${actions.API_URL}comment/${this.state.commentsType}/export?uid=${id}&api_token=${token}`+filterQuery}
							download
		            	>
		            		<Button label="Скачать" style={{textAlign:'right', marginRight:'20px'}} size="btn-sm" color="btn-warning"   />
		            	</a> 
		            	<Button onClick={(e)=>this.handleDownloadComments(e)} label="Загрузить в google drive" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
		            <div style={{color:'red'}}>
						{this.props.errors.errorsC.map((item,i)=> (<div key={i}>{item.message}</div>))}
					</div>
				</div>}

				{this.state.choice=='questions'&&<div className="download-comments">
					<div className="download-radios">
						<input defaultChecked onClick={(e)=>this.setState({questionsType:e.target.value})} id="com-brand" name="comments" value="brand" type="radio"/>
						<label htmlFor="com-brand">Другие</label>
						<input onClick={(e)=>this.setState({questionsType:e.target.value})} id="com-subcat" name="comments" value="subcategory" type="radio"/>
						<label htmlFor="com-subcat">Whirlpool</label>
						<input onClick={(e)=>this.setState({questionsType:e.target.value})} id="com-all" name="comments" value="all" type="radio"/>
						<label htmlFor="com-all">Все</label>

					</div>
					<div style={{width:'100%', display:'flex', justifyContent:'flex-start', marginTop:'25px'}}>
		            	<a
		            		href={`${actions.API_URL}question/export/${this.state.commentsType}?uid=${id}&api_token=${token}`+filterQuery}
							download
		            	>
		            		<Button label="Скачать" style={{textAlign:'right', marginRight:'20px'}} size="btn-sm" color="btn-warning"   /> 
		            	</a>
		            	<Button onClick={(e)=>this.handleDownloadQuestions(e)} label="Загрузить в google drive" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
					<div style={{color:'red'}}>
						{this.props.errors.errorsQ.map((item,i)=> (<div key={i}>{item.message}</div>))}
					</div>
				</div>}

				{this.state.choice=='products'&&<div className="download-questions">
					<div style={{width:'100%', display:'flex', justifyContent:'flex-start', marginTop:'25px'}}>
		            	<a 
		            		href={`${actions.API_URL}product/export?uid=${id}&api_token=${token}`+filterQuery}
		            		download
		            	>
		            		<Button label="Скачать" style={{textAlign:'right', marginRight:'20px'}} size="btn-sm" color="btn-warning"   /> 
		            	</a>
		            	<Button onClick={(e)=>this.handleDownloadProducts(e)} label="Загрузить в google drive" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
		            <div style={{color:'red'}}>
						{this.props.errors.errorsP.map((item,i)=> (<div key={i}>{item.message}</div>))}
					</div>
				</div>}

				{this.state.choice=='dolya'&&<div className="download-dolya">
					<div style={{width:'100%', display:'flex', justifyContent:'flex-start', marginTop:'25px'}}>
		            	<Button  label="Скачать" style={{textAlign:'right', marginRight:'20px'}} size="btn-sm" color="btn-warning"   /> 
		            	<Button onClick={(e)=>this.handleSave(e)} label="Загрузить в google drive" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
				</div>}
				
				
				
				<div style={{color:'red'}}>

					{this.state.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    filters: state.appliedFilters,
    errors:state.downloadMatrix,
	path:state.downloadMatrix.path
  };
}
export default connect(mapStateToProps)(UploadMatrix);
