import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
import Table from './table'
import Form from './form'
import SearchInput, {createFilter} from 'react-search-input'
import Modal from 'react-modal'

const KEYS_TO_FILTERS = ['lw_office_name', 'lw_address' ]
Modal.setAppElement('#wrapperContainer')



class Lawyer extends Component  {
	state={searchTerm:''}
	
	componentWillReceiveProps(nextProps) {
		
		// nextProps.open==true&&this.props.attornies.length==0&&this.props.dispatch(actions.getAttornies())

	}
	
	searchUpdated(e) {
		this.setState({searchTerm:e})
	}
	selectAttorney(e) {
		this.props.dispatch(actions.selectAttorney(e))
	}
	handleDelete() {
    	this.props.dispatch(actions.deleteAttorney(this.props.currentAttorney.lw_id))
		this.props.dispatch(actions.getAttornies())
  	}
  	handleAdd() {
  		this.props.dispatch(actions.selectAttorney({}))
  		
  	}
	render() {
		const {open, onClose, attornies, currentAttorney} = this.props
		this.filteredData = attornies.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(2)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title">Attorney(Patient)</div>
					<div>
						<div style={{width:'100%', marginBottom:'0.5rem', padding:'20px 10px'}}>
							<Search icon={'fa fa-search'} title={'Search by Name:'} inputWidth='65%' onChange={(e)=>this.searchUpdated(e)}/>
						</div>
					</div>
					<div style={{maxHeight:200, minHeight:200}}>
						<Table selectAttorney={(e)=>this.selectAttorney(e)} data={this.filteredData} currentAttorney={currentAttorney}/>
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
  	attornies:state.attorney.attornies,
  	currentAttorney:state.attorney.currentAttorney,
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(Lawyer);
