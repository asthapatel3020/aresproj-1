import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import ItemSelect from '../../../components/ui/itemSelect'
import {Button} from '../../../components/ui'
import FileInput from 'react-file-input';
import ReactFileReader from 'react-file-reader';
				// 
class UploadMatrix extends Component {
	state={file:null, file1:null, countryId:this.props.userCountry.id, countryIdComp:this.props.userCountry.id, choice:'whirlpool', errors:[], success:false, name:'', nameComp:''}
	componentWillMount() {
		this.props.userAccess==1&&this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		
	}
	componentDidMount() {
  		this.props.isSent&&this.props.dispatch(actions.clearState())
  		
  	}
  	componentDidUpdate(prevProps, prevState) {
  		prevState.errors.length>0&&this.setState({errors:[]})
  		prevState.success&&this.setState({success:false})

  	}
	handleCountryChange=(e)=>{
		this.setState({
			countryId:e.target.value
		})
	}
	handleCountryChangeComp=(e)=>{
		this.setState({
			countryIdComp:e.target.value
		})
	}
	onChange=(e)=>{
		console.log("qq", e[0])
		this.setState({
			file:e[0]
		})
	}
	onChangeComp=(e)=> {
		this.setState({
			file1:e[0]
		})
	}
	componentWillReceiveProps(nextProps) {

		nextProps.errors&&this.setState({ errors:nextProps.errors})
		nextProps.isSent&&this.setState({success:true})
	} 
	handleSave(e) {
		this.state.file1&&this.props.dispatch(actions.uploadMatrixCompetitors(this.state.file1,this.props.token,this.props.id, this.state.countryIdComp))
		!this.state.file1&&this.setState({errors:[{message:'Файл не загружен'}]})

	}
	handleSaveProducts(e) {
		this.state.file&&this.props.dispatch(actions.uploadMatrixProducts(this.state.file,this.props.token,this.props.id, this.state.countryId))
		!this.state.file&&this.setState({errors:[{message:'Файл не загружен'}]})
	}
	handleFiles(e) {
		console.log("FILE", e[0])
	}
	render() {
		console.log("state", this.props)
		let mapa = {countries:[this.props.userCountry]};
  		let items = this.props.userAccess==1?this.props.countries:mapa;
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
					<div style={{display:'flex', padding:'0 0 5% 0', lineHeight:'2.5em'}}>
						<div style={{marginRight:'5px'}}>Страна</div> 

						<ItemSelect defaultValue={this.props.userCountry.id} style={{width:'300px'}} onSelect={(e)=>this.handleCountryChange(e)} items={items.countries}/>
					</div>
					<div style={{display:'flex'}}>

						<ReactFileReader fileTypes={'.xlsx'} handleFiles={this.onChange}>
							<div style={{display:'flex', width:'200px',flexDirection:'row', marginRight:'20px'}}>
						  		<div className='btn' style={{border:'1.5px solid #eee'}}>Выбрать</div>
						  		<div style={{width:'150px', border:'1.5px solid #eee', borderRadius:'3px', display:'inline-block'}}>{this.state.file?this.state.file.name:'     '}</div>
							</div>
						</ReactFileReader>
				        <Button 
				        	onClick={(e)=>this.handleSaveProducts()} 
				        	label="Загрузить" 
				        	style={{textAlign:'right'}} 
				        	size="btn-sm" 
				        	color="btn-warning"   
				        /> 

					</div>
				</div>
				: 
				<div>
					<div style={{display:'flex', padding:'0 0 5% 0', lineHeight:'2.5em'}}>
						<div style={{marginRight:'5px'}}>Страна</div> 

						<ItemSelect defaultValue={this.props.userCountry.id} style={{width:'300px'}} onSelect={(e)=>this.handleCountryChangeComp(e)} items={items.countries}/>
					</div>
					<div style={{display:'flex'}}>
						<ReactFileReader fileTypes={'.xlsx'} handleFiles={this.onChangeComp}>
							<div style={{display:'flex', width:'200px',flexDirection:'row', marginRight:'20px'}}>
							  <div className='btn' style={{border:'1.5px solid #eee'}}>Выбрать</div>
							  <div style={{width:'150px', border:'1.5px solid #eee', borderRadius:'3px', display:'inline-block'}}>{this.state.file1?this.state.file1.name:'    '}</div>
							</div>
							</ReactFileReader>
					        <Button 
					        	onClick={(e)=>this.handleSave(e)} 
					        	label="Загрузить" 
					        	style={{textAlign:'right'}} 
					        	size="btn-sm" 
					        	color="btn-warning"   
					        /> 
					</div>
				</div>
				}
				<div style={{color:'green'}}>

					{this.state.success===true&&<div>Загрузка успешно выполнена.</div>}
				</div>
				<div style={{color:'red'}}>

					{this.state.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
  	countries:state.countries,
    token:state.app.token,
    id:state.app.id,
    userAccess: state.app.userAccess,
    userCountry:state.app.country,
	errors: state.matrix.errors,
	isSent:state.matrix.addSuccess
  };
}
export default connect(mapStateToProps)(UploadMatrix);
