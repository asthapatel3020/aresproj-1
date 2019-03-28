import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
import Form from './form'
import Modal from 'react-modal'
import * as utils from '../../../../components/functions/functions'
import axios from 'axios'
import qs from 'qs'
import {reset} from 'redux-form';
Modal.setAppElement('#wrapperContainer')



class Schedule extends Component  {
	
	getAsyncPatients(e) {
		e.length>=3&&this.props.dispatch(actions.getAsyncPatients(e, this.props.token))
	}
	handleSubmit(e) {
		console.log('this', e)

		

		console.log('item', e)
		let items = []
		let sell_items = []
		console.log('STEP0', e.delivery_to.value)
		e.items.map(r=> {
			if (e.delivery_to.value=='D') {
				if (r.item.type=='S') {
				items.push({
					item_id:r.item.item_id,
					quantity:r.quantity,
					// customization_types:r.item.customization_types,
					type:r.item.type
				})
				} else {
					items.push({
						item_id:r.item.item_id,
						quantity:1,
						// customization_types:r.item.customization_types,
						type:r.item.type
					})
				}
				
			} else {
				items.push({
					item_id:r.item.item_id,
					quantity:1,
					// customization_types:r.item.customization_types,
					type:r.item.type
				})
			}
			
		})
		
		
		console.log('Step1')
		const final = {
			company_id:'AR',
			...(e.delivery_date_from)&&{delivery_date_from:e.delivery_date_from?Math.round(e.delivery_date_from/1000):''},
			...(e.delivery_date_to)&&{delivery_date_to:e.delivery_date_to?Math.round(e.delivery_date_to/1000):''},
			user_id:e.user_id.value,
			delivery_to:e.delivery_to.value,
			...(e.doctor_id)&&{doctor_id:e.doctor_id.value},
			...(e.patient_id)&&{patient_id:e.patient_id?e.patient_id.value:e.patient_id_home?e.patient_id_home.value:''},
			"prescription_date": 1537228800,
			billing_date:1537228800,
			delivery_city:e.delivery_city?e.delivery_city:e.delivery_city_doctor?e.delivery_city_doctor:'',
			delivery_state:e.delivery_state?e.delivery_state:e.delivery_state_doctor?e.delivery_state_doctor:'',
			delivery_address:e.delivery_address?e.delivery_address:e.delivery_address_doctor?e.delivery_address_doctor:'',
			// rent_items:rent_items,
			// sell_items:sell_items
			items:items

		}
		this.props.dispatch({type:'DO_REQUEST'})
		console.log('final', JSON.stringify(final))
		axios.post(`${actions.API_URL}deliveries`,
        qs.stringify(final),
         {
        headers:{'Authorization': "bearer " + this.props.token}
        }).then(res=> {
        	console.log('res',res)
			this.props.dispatch({type:'DO_SUCCESS'})
			this.props.dispatch(reset('scheduleForm'))
			this.props.onClose(14, 'noalert')
			this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully created!'})

			
          return res;
        }).catch(err=> {
			this.props.dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })

	}
	render() {
		const {open, onClose, attornies, currentAttorney, patientsList, providers, users, items} = this.props
		console.log('asd', this.props.itemForEdit)
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(14)}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem', maxHeight:600, minHeight:500, overflow:'auto'}}>
					<div className="modal-title d-flex justify-content-between">
						<div>Add schedule for driver</div>
						<div onClick={()=>onClose(14)} style={{color:'red', fontSize:'1.4rem', cursor:'pointer'}}>
							<i className="fas fa-times-circle"></i>
						</div>
					</div>
					<div style={{padding:'1rem'}}>
					<Form
						items={items} 
						users={users.filter(e=>e.role==7)}
						onSubmit={(e)=>this.handleSubmit(e)} 
						providers={providers} 
						patientsList={patientsList} 
						getAsyncPatients={(e)=>this.getAsyncPatients(e)}/>
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
  	token:state.app.token,
    providers:state.treatingProviders.providers,
  	patientsList:state.patients.patientsForSelect,
  	items:state.items.items,
  	users:state.users.users,
  	itemForEdit:state.items.itemForEdit
  };
}
export default connect(mapStateToProps)(Schedule);
