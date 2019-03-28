import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
import Table from './table'
import Form from './form'
import SearchInput, {createFilter} from 'react-search-input'
import Modal from 'react-modal'

Modal.setAppElement('#wrapperContainer')



class Providers extends Component  {
	
	componentWillReceiveProps(nextProps) {
		
		// nextProps.open==true&&this.props.attornies.length==0&&this.props.dispatch(actions.getAttornies())

	}
	
	searchUpdated(e) {
		e.length>=2&&this.props.dispatch(actions.getOffices(this.props.token, e))
	}
	selectItem(e) {
		this.props.dispatch(actions.selectCurrentOffice(e))
	}
	handleDelete() {
    	this.props.dispatch(actions.deleteAttorney(this.props.currentItem.lw_id))
		this.props.dispatch(actions.getAttornies())
  	}
  	handleAdd() {
  		this.props.dispatch(actions.selectItem({}))
  		
  	}
	render() {
		const {open, onClose, providers, currentProvider} = this.props

		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(10)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title">Attorney(Company)</div>
					<div>
						<div style={{width:'100%', marginBottom:'0.5rem', padding:'20px 10px'}}>
							<Search icon={'fa fa-search'} title={'Search by Name:'} inputWidth='65%' onChange={(e)=>this.searchUpdated(e)}/>
						</div>
					</div>
					<div style={{maxHeight:200, minHeight:200}}>
						<Table 
							selectItem={(e)=>this.selectItem(e)} 
							data={providers} 
							currentItem={currentProvider}
						/>
					</div>
					<div>
						<Form token={this.props.token} handleDelete={()=>this.handleDelete()} handleAdd={()=>this.handleAdd()}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	providers:state.offices.offices,
  	currentProvider:state.offices.currentOffice,
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(Providers);
