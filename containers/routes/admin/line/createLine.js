import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import Search from '../../../../components/ui/searchInput'
// import Form from './form'
import Modal from 'react-modal'
import Form from './form'
import axios from 'axios'
import qs from 'qs'

Modal.setAppElement('#wrapperContainer')



class CreateLine extends Component  {
	
	componentWillMount() {
    	this.props.dispatch(actions.getSuppliers(this.props.token))
	}
	handleSubmit(e, dispatch) {
		this.props.dispatch({type:'DO_REQUEST'})

		let final = {
			name:e.name
		}
		axios.post(`${actions.API_URL}supplier-companies/${e.supplier_id.value}/lines`,
        qs.stringify(final),
         {
        headers:{'Authorization': "bearer " + this.props.token}
        }).then(res=> {
        	console.log('res',res)
			this.props.dispatch({type:'DO_SUCCESS'})
			this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully created!'})
			this.props.onClose(17, 'noalert')
          return res;
        }).catch(err=> {
			this.props.dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })    
	}
	
	render() {
		const {open, onClose, attornies, currentAttorney, suppliers} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(17)}>

				<div style={{width:800, background:'#fff', height:400, paddingBottom:'2rem'}}>
					<div className="modal-title d-flex justify-content-between">
						<div>Create line</div>
						<div onClick={()=>onClose(17)} style={{color:'red', fontSize:'1.4rem', cursor:'pointer'}}>
							<i className="fas fa-times-circle"></i>
						</div>
					</div>
					<div>
						<Form onSubmit={(e)=>this.handleSubmit(e)} suppliers={suppliers}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token,
  	suppliers:state.suppliers.suppliers
  };
}
export default connect(mapStateToProps)(CreateLine);
