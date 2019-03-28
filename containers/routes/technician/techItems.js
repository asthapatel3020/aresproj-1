import React, { Component } from 'react'
import { connect } from 'react-redux'
import Barcode from 'react-barcode'
import * as actions from '../../../actions'
// import * as utils from '../../../components/functions/functions'
import ItemsTable from './techItemsTable'
import qs from 'qs'
import axios from 'axios'
import AssignItemTech from './assignItemTech'
import MaterialButton from '../../../components/ui/MaterialButton'
import QRModal from './qrModal'
import {reset} from 'redux-form';


class TechItems extends Component {
	state={itemForEdit:'', modalTechState:false, qrModalState:false, itemQR:'' }
	returnItem(item) {
		console.log('item', item)
		// if (window.confirm('Are you sure you wish to return this item?')) {
			// this.props.dispatch({type:'DO_REQUEST'})
   //       	axios.put(`${actions.API_URL}items/${index}?token=${this.props.token}`,
		 //         {
		 //        headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
		 //        }).then(res=> {
		 //        	this.props.dispatch(actions.getTechItems(this.props.user.user_id, this.props.token))
			// 		this.props.dispatch({type:'DO_SUCCESS'})
			// 		this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully deleted!'})
			// 		console.log('res',res)
		 //          return res;
		 //        }).catch(err=> {
			// 		this.props.dispatch({type:'DO_FAILURE'})
		 //        	console.log('err', err)
		 //        	return false
		 //        })
        // }
	}
	editItem(item) {
		this.props.dispatch(actions.setTechItemForEdit(item))
		this.setState({modalTechState:true})
	}
	closeModal(e) {
		if (e=='noalert') {
			this.props.dispatch(actions.setTechItemForEdit({}))
    		this.setState({modalTechState:false})
			this.props.dispatch(reset('addToInventoryForm'))

		} else {
			if (window.confirm('Are you sure you want to close the window?')) {
				this.props.dispatch(actions.setTechItemForEdit({}))
	    		this.setState({modalTechState:false})
				this.props.dispatch(reset('addToInventoryForm'))
	    	}
		}


		
  	}
  	addItem() {
		this.setState({modalTechState:true})
		
  	}
  	printQR(item) {
		this.setState({qrModalState:true, itemQR:item})
  	}
  	closeQRModal() {
  		this.setState({qrModalState:false})
  	}
	render() {

		const {user, token, items} = this.props
		console.log('qweqeqeqweq', this.state.modalTechState)
		return (
			<div >
				<AssignItemTech open={this.state.modalTechState} onClose={(e)=>this.closeModal(e)}/>
            	<QRModal open={this.state.qrModalState} itemQR={this.state.itemQR} onClose={()=>this.closeQRModal()}/>
				
				<div style={{width:'100%', }}>
					<div style={{marginBottom:10}}>
						<MaterialButton onClick={()=>this.addItem()} variant={'raised'} type='add' color='primary' label='Add to inventory'/>
						
						
						
					</div>
					{	
						items.length>0?
						<ItemsTable 
							items={items} 
							printQR={(e)=>this.printQR(e)}
							returnItem={(i)=>this.returnItem(i)}
							editItem={(i)=>this.editItem(i)}/>:
							<div style={{fontSize:'1rem', fontWeight:500}}>You have no items in your inventory</div>
					}
				</div>
				
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    token: state.app.token,
    user:state.app.user,
    items:state.items.techItems
  };
}
export default connect(mapStateToProps)(TechItems);
