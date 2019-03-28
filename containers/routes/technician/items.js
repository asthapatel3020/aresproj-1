import React, { Component } from 'react'
import { connect } from 'react-redux'
import Barcode from 'react-barcode'
import * as actions from '../../../actions'
// import * as utils from '../../../components/functions/functions'
import ItemsTable from './itemsTable'
import EditItem from './editItem'
import QRModal from './qrModal'
import qs from 'qs'
import axios from 'axios'
// import AssignItemDoctor from './assignItemDoctor'
// import AssignItemPatient from './assignItemPatient'
import MaterialButton from '../../../components/ui/MaterialButton'

class Items extends Component {
	state={ modalState:false, itemForEdit:'', modalDoctorState:false, modalPatientState:false, qrModalState:false, itemQR:'' }
	deleteItem(index) {
		if (window.confirm('Are you sure you wish to delete this item?')) {
			this.props.dispatch({type:'DO_REQUEST'})
			axios.put(`${actions.API_URL}items`,
	     		qs.stringify({
	     			deleted_items:[index]
	     		}),
		         {
		        headers:{ 'Authorization': "bearer " + this.props.token}
		        }).then(res=> {
		        	this.props.dispatch(actions.getItems(this.props.token))
					this.props.dispatch({type:'DO_SUCCESS'})
					this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully deleted!'})
					console.log('res',res)
		          return res;
		        }).catch(err=> {
					this.props.dispatch({type:'DO_FAILURE'})
		        	console.log('err', err)
		        	return false
		        })
        }
	}
	editItem(item) {
		this.props.dispatch(actions.setItemForEdit(item))
		this.setState({modalState:true})
	}
	closeModal(e) {
		if (e=='noalert') {
    		this.setState({modalState:false})
			this.props.dispatch(actions.setItemForEdit({ordering_price:0}))

		} else {
			if (window.confirm('Are you sure you want to close the window?')) {
				this.props.dispatch(actions.setItemForEdit({ordering_price:0}))
	    		this.setState({modalState:false})
	    	}
		}
		
  	}
  	addItem() {
		this.setState({modalState:true})
		
  	}
  	printQR(item) {
		this.setState({qrModalState:true, itemQR:item})
  	}
  	closeQRModal() {
  		this.setState({qrModalState:false})
  	}
	render() {

		const {user, token, items} = this.props
		console.log('qweqeqeqweq', items)
		return (
			<div >
            	<EditItem open={this.state.modalState}  onClose={(e)=>this.closeModal(e)}/>
            	<QRModal open={this.state.qrModalState} itemQR={this.state.itemQR} onClose={()=>this.closeQRModal()}/>
				<div style={{width:'100%', }}>
					<div style={{marginBottom:10}}>
						<MaterialButton onClick={()=>this.addItem()} variant={'raised'} type='add' color='primary' label='Add to stock'/>
						
						
						
					</div>
					{	
						// items.length>0&&
						<ItemsTable 
							items={items} 
							printQR={(e)=>this.printQR(e)}
							deleteItem={(i)=>this.deleteItem(i)}
							editItem={(i)=>this.editItem(i)}/>
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
    items:state.items.items
  };
}
export default connect(mapStateToProps)(Items);
