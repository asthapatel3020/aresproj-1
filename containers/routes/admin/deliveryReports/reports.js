import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import * as utils from '../../../../components/functions/functions'
import DeliveriesTable from './table'
import ItemModal from './itemModal'


class Schedule extends Component  {
	state={
		itemModal:false,
		currentItem:''
	}
	openModal(e) {
		this.setState({itemModal:true, currentItem:e})
	}
	closeModal() {
		this.setState({itemModal:false})
	}
	
 	render() {
		const {open, onClose, deliveries} = this.props
		return (
			<div style={{padding:'1rem', background:'#fff'}}>
						<ItemModal open={this.state.itemModal} currentItem={this.state.currentItem} onClose={()=>this.closeModal()}/>
						<div style={{padding:'0.5rem', paddingBottom:'1rem', fontWeight:500, fontSize:'1.5rem', background:'#fff'}}>
							Delivery reports
						</div>
						<DeliveriesTable openModal={(e)=>this.openModal(e)} data={deliveries}/>
			</div>

				
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token,
  	deliveries:state.schedules.schedules

  };
}
export default connect(mapStateToProps)(Schedule);
