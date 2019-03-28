import React, {Component} from 'react';
import {Link} from 'react-router';
// import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
import Table from '../tables/addCodesTable'
import SearchInput, {createFilter} from 'react-search-input'
import { arrayPush} from 'redux-form';
import Modal from 'react-modal'

const KEYS_TO_FILTERS = ['dc_code' ]

Modal.setAppElement('#wrapperContainer')
class AddCode extends Component  {
	state={searchTerm:''}

	selectCode(e) {
		let item = this.props.codes.filter(n=>n.dc_id==e)[0]
		this.props.payment?
		this.props.dispatch(arrayPush('billing', `allBills.treating_providers[${this.props.currentProvider}].specialties[0].services[${this.props.currentServiceType}].bill_diagnosis_codes`, item)):
		this.props.dispatch(arrayPush('visitRegistry', 'DiagnosisCodes1', item))
		this.props.hideModal()
	}
	handleSearch(e) {

	}
	searchUpdated(e) {
		this.setState({searchTerm:e})
	}
	render() {
		const {codes, open, onClose} = this.props
		// console.log('asd', this.props)
		this.filteredCodes = codes.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		// style={styles}
           		onRequestClose={()=>onClose()}>
				<div style={{width:500, maxHeight:500, overflow:'auto', background:'#fff', minHeight:500}}>
					<div>
						<div style={{width:'100%', marginBottom:'0.5rem', padding:20}}>
							<Search
								icon={'fa fa-search'} 
								title={'Search by Code:'} 
								inputWidth='65%'
								placeholder={"Search for code"} 
								onChange={(e)=>this.searchUpdated(e)} />
						</div>
					</div>
					<div style={{minHeight:160}}>
						<Table items={this.filteredCodes} selectCode={(e)=>this.selectCode(e)}/>
					</div>
					<div>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	codes:state.codes.codes,

  };
}
export default connect(mapStateToProps)(AddCode);
