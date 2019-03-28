import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
// import Table from './table'
// import Form from './form'
import Modal from 'react-modal'
import Form from './form'
import axios from 'axios'
import qs from 'qs'
import {reset} from 'redux-form';

Modal.setAppElement('#wrapperContainer')



class EditItem extends Component  {
	state={}
	
	componentWillMount() {
		this.props.dispatch(actions.setItemForEdit({}))

	}
	handleSubmit(e) {
		console.log('FINALITEM', e)

		if (e.item_id) {
			let item = {
				item_code:e.item_code,
				item_description:e.item_description,
				ordering_price:e.ordering_price,
				quantity:e.quantity,
				type:e.type.value?e.type.value:e.type,
				item_id:e.item_id,
				line_id:e.supplier_company_line_id.value?e.supplier_company_line_id.value:e.supplier_company_line_id,
				customization_types:e.customization_types?e.customization_types:[]


			}
			console.log('ITEMEDIT', item)
			this.props.dispatch({type:'DO_REQUEST'})
			axios.put(`${actions.API_URL}items`,
	     		qs.stringify({
	     			items:[item]
	     		}),
		         {
		        headers:{ 'Authorization': "bearer " + this.props.token}
		        }).then(res=> {
		        	this.props.dispatch(actions.getItems(this.props.token))
					this.props.dispatch({type:'DO_SUCCESS'})
					this.props.dispatch(reset('itemForm'))
					this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully edited!'})
					this.props.onClose('noalert')
					
					console.log('res',res)
		          return res;
		        }).catch(err=> {
					this.props.dispatch({type:'DO_FAILURE'})
		        	console.log('err', err)
		        	return false
		        })

		} else {
			console.log('ITEM',e.customization_types)
			let itemsArray = []
			let custTypes = []
			e.customization_types&&e.customization_types.map(s=> {
				s==1?
				custTypes.push({id:1, name:'Left'}):
				s==2?
				custTypes.push({id:2, name:'Right'}):
				s==3?
				custTypes.push({id:3, name:'Pair'}):
				custTypes.push({id:4, name:'Bmi'})

			})
			this.props.dispatch({type:'DO_REQUEST'})
			const item = {
				item_code:e.item_code,
				item_description:e.item_description,
				ordering_price:e.ordering_price,
				quantity:e.quantity,
				type:e.type.value,
				line_id:e.supplier_company_line_id?e.supplier_company_line_id.value:null,
				customization_types:custTypes
			}
			itemsArray.push(item)
			let existItems = []
			this.props.items.map(s=> {
			// 	let custTypesArr = []
				delete e.value
			// 	s.customization_types&&s.customization_types.map(r=>{
			// 		custTypesArr.push(r.customization_type_id)
			// 	})

				existItems.push({
					customization_types:s.customization_types,
					item_code:s.item_code,
					item_description:s.item_description,
					ordering_price:s.ordering_price,
					quantity:s.quantity,
					type:s.type.value,

				})
			})
			// itemsArray = itemsArray.concat(existItems)
			console.log('FINALARR', itemsArray)
	     	axios.put(`${actions.API_URL}items`,
	     		qs.stringify({
	     			items:itemsArray
	     		}),
		         {
		        headers:{ 'Authorization': "bearer " + this.props.token}
		        }).then(res=> {
		        	this.props.dispatch(actions.getItems(this.props.token))
					this.props.dispatch({type:'DO_SUCCESS'})
					this.props.dispatch(reset('itemForm'))
					this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully added!'})
					this.props.onClose('noalert')
					
					console.log('res',res)
		          return res;
		        }).catch(err=> {
					this.props.dispatch({type:'DO_FAILURE'})
		        	console.log('err', err)
		        	return false
		        })
		}
	}
	getLines(id) {
		console.log("SUPP", id)
		this.props.dispatch(actions.getLines(this.props.token, id.value))
	}
	render() {
		const {token, onClose, open, itemForEdit, suppliers, lines} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose()}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem'}}>
					<div className="modal-title">Edit item</div>
					<div style={{padding:'1rem'}}>
						<Form 
							onSubmit={(e)=>this.handleSubmit(e)} 
							suppliers={suppliers}
							lines={lines}
							currentItem={this.props.itemForEdit}
							getLines={(e)=>this.getLines(e)}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token,
  	itemForEdit:state.items.itemForEdit,
  	items:state.items.items,
  	suppliers:state.suppliers.suppliers,
  	lines:state.suppliers.lines,
  	itemForEdit:state.items.itemForEdit
  };
}
export default connect(mapStateToProps)(EditItem);
