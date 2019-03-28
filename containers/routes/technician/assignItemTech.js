import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
// import Table from './table'
// import Form from './form'
import Modal from 'react-modal'
import Form from './assignFormTech'
import axios from 'axios'
import qs from 'qs'
import {reset} from 'redux-form';

Modal.setAppElement('#wrapperContainer')



class AssignItem extends Component  {
	state={}
	
	handleSubmit(e) {
		console.log('finalItems', e, this.props.techItems)
		let finalArr = []
		let duplicates = []
		let duplicateIds = []
		let tempArr = []
		let addedToFinal = []
		this.props.techItems.map(r=>finalArr.push({
			user_id:this.props.user.user_id,
			item_id:r.item_id,
			quantity:r.quantity?r.quantity:1,
			type:r.type
		}))
		tempArr = tempArr.concat(finalArr)
		console.log('FINALARR11', tempArr, tempArr.length)
		if (this.props.itemForEdit.item_id) {
			finalArr = finalArr.filter(r=>r.item_id!=e.items[0].item_id)
			console.log("FILTER", finalArr)
			e.items.map(r=>finalArr.push({
				user_id:this.props.user.user_id,
				item_id:r.item_id,
				quantity:r.quantity?r.quantity:1,
				type:r.type
			}))
		} else {
			if (tempArr.length==0) {
				e.items.map(s=> {
					finalArr.push({
						user_id:this.props.user.user_id,
						item_id:s.item.item_id,
						quantity:s.quantity?s.quantity:1,
						type:s.item.type
					})
				})
				
			} else {
				for (let i=0;i<tempArr.length;i++) {
					console.log('1stloop', tempArr)
					for (let j = 0;j<e.items.length;j++) {
						console.log('2ndloop', tempArr[i].item_id, e.items[j].item.item_id)
						if (tempArr[i].item_id==e.items[j].item.item_id) {
							console.log('NEDOBAVIL')
							duplicateIds.indexOf(tempArr[i].item_id)==-1&&duplicates.push(`${e.items[j].item.item_code}(${tempArr[i].type})`)
							duplicateIds.indexOf(tempArr[i].item_id)==-1&&duplicateIds.push(tempArr[i].item_id)
							tempArr[i].quantity=parseInt(tempArr[i].quantity)+parseInt(e.items[j].quantity)
						} else {
							console.log('DOBAVIL')
							
							duplicateIds.indexOf(e.items[j].item.item_id)==-1&&
							addedToFinal.indexOf(e.items[j].item.item_id)==-1&&
							duplicateIds.indexOf(tempArr[i].item_id)==-1&&finalArr.push({
								user_id:this.props.user.user_id,
								item_id:e.items[j].item.item_id,
								quantity:e.items[j].quantity?e.items[j].quantity:1,
								type:e.items[j].item.type
							})
							addedToFinal.push(e.items[j].item.item_id)
						}
					}
				}
			}
			

			// e.items.map(r=>)
		}
		
		console.log('finalArr', finalArr)
		console.log('duplicates', duplicates)
		if (duplicates.length>0) {
			if (window.confirm(`Items ${duplicates.join(', ')} is/are already in the inventory. The quantity will be added.`)) {
				this.props.dispatch({type:'DO_REQUEST'})
	         	axios.put(`${actions.API_URL}users/${this.props.user.user_id}/inventory`,
						qs.stringify({items:finalArr}),
			         {
			        headers:{ 'Authorization': "bearer " + this.props.token}
			        }).then(res=> {
			        	// this.props.dispatch(actions.getItems(this.props.token))
						this.props.dispatch({type:'DO_SUCCESS'})
						this.props.dispatch(reset('assignItemFormDoctor'))
						this.props.onClose('noalert')
			        	this.props.dispatch(actions.getTechnicianItems(this.props.user.user_id, this.props.token))
						this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully added to inventory!'})
						console.log('res',res)
			          return res;
			        }).catch(err=> {
						this.props.dispatch({type:'DO_FAILURE'})
			        	console.log('err', err)
			        	return false
			        })
		    }
		} else {
			this.props.dispatch({type:'DO_REQUEST'})
         	axios.put(`${actions.API_URL}users/${this.props.user.user_id}/inventory`,
					qs.stringify({items:finalArr}),
		         {
		        headers:{ 'Authorization': "bearer " + this.props.token}
		        }).then(res=> {
		        	// this.props.dispatch(actions.getItems(this.props.token))
					this.props.dispatch({type:'DO_SUCCESS'})
					this.props.dispatch(reset('assignItemFormDoctor'))
					this.props.onClose('noalert')
		        	this.props.dispatch(actions.getTechnicianItems(this.props.user.user_id, this.props.token))
					this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully added to inventory!'})
					console.log('res',res)
		          return res;
		        }).catch(err=> {
					this.props.dispatch({type:'DO_FAILURE'})
		        	console.log('err', err)
		        	return false
		        })
		}
		
		
	}
	render() {
		const {token, onClose, open, itemForEdit, providers, items} = this.props
		console.log('techitems',this.props.itemForEdit)
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose()}>

				<div style={{width:800, background:'#fff', paddingBottom:'1rem', maxHeight:600, overflow:'auto'}}>
					<div className="modal-title">Add to technician inventory</div>
					<div style={{padding:'1rem', minHeight:400}}>
						<Form providers={providers} items={items} onSubmit={(e)=>this.handleSubmit(e)}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token,
  	itemForEdit:state.items.techItemForEdit,
  	providers:state.treatingProviders.providers,
    user:state.app.user,
  	items:state.items.items,
  	techItems:state.items.techItems,

  };
}
export default connect(mapStateToProps)(AssignItem);
