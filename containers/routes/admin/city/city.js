import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Table from './table'
import Form from './form'
import Modal from 'react-modal'
import { arrayPush, arrayInsert, arrayRemove } from 'redux-form';

Modal.setAppElement('#wrapperContainer')


class City extends Component  {
	state={currentCity:'', currentCityIdx:0}

	// selectAttorney(e) {
	// 	this.props.dispatch(actions.selectAttorney(e))
	// }



	render() {
		const {open, onClose, cities, deleted_cities, token} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(5)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title" style={{marginBottom:15}}>Cities</div>
					<div style={{maxHeight:400, minHeight:200}}>
						<Form 
							deleted_cities={deleted_cities}
							handleDelete={()=>this.handleDelete()} 
							handleAdd={()=>this.handleAdd()}
							selectItem={(e,i)=>this.selectItem(e,i)}
							currentItem={this.props.currentCity}
							token={token}
							/>
						
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
  	cities:state.city.cities,
  	deleted_cities:state.city.deleted_cities,
  	currentCity:state.city.currentCity,
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(City);

