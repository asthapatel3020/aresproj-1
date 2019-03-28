import React, {Component} from 'react';
import {Link} from 'react-router';
// import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
import Table from '../tables/addTreatmentsTable'
import SearchInput, {createFilter} from 'react-search-input'
import { arrayPush} from 'redux-form';
import Modal from 'react-modal'

const KEYS_TO_FILTERS = ['pc_code' ]

Modal.setAppElement('#wrapperContainer')

class AddTreatment extends Component  {
	state={searchTerm:''}

	selectTreatment(e) {
		// console.log(e)
		let item = this.props.treatments.filter(n=>n.pc_id==e)[0]
		this.props.dispatch(arrayPush('visitRegistry', `serviceList[${this.props.currentServiceIdx}].treatments`, item))
		this.props.hideModal()
	}
	handleSearch(e) {

	}
	searchUpdated(e) {
		this.setState({searchTerm:e})
	}
	render() {
		// console.log('asd', this.props)
		const {treatments, open, onClose} = this.props
		this.filteredTreatments = treatments.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		// style={styles}
           		onRequestClose={()=>onClose()}>
				<div style={{width:500, maxHeight:500, overflow:'auto', minHeight:500, background:'#fff'}}>
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
						<Table items={this.filteredTreatments} selectTreatment={(e)=>this.selectTreatment(e)}/>
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
  	treatments:state.treatments.treatments,
    currentServiceIdx:state.services.currentService,

  };
}
export default connect(mapStateToProps)(AddTreatment);
