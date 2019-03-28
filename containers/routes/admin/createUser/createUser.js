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



class CreateUser extends Component  {
	
	handleSubmit(e, dispatch) {
		this.props.dispatch({type:'DO_REQUEST'})

		let final = {
			password:e.password,
			last_name:e.last_name,
			first_name:e.first_name,
			username:e.username10,
			role:e.role.value
		}
		axios.post(`${actions.API_URL}auth/registration`,
        qs.stringify(final),
         {
        headers:{'Authorization': "bearer " + this.props.token}
        }).then(res=> {
        	console.log('res',res)
			this.props.dispatch({type:'DO_SUCCESS'})
			this.props.dispatch({type:'OPEN_ALERT', msg:'Successfully created!'})
			this.props.onClose(16, 'noalert')
          return res;
        }).catch(err=> {
			this.props.dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })    
	}
	
	render() {
		const {open, onClose, attornies, currentAttorney} = this.props
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		onRequestClose={()=>onClose(16)}>

				<div style={{width:800, background:'#fff', height:400, paddingBottom:'2rem'}}>
					<div className="modal-title d-flex justify-content-between">
						<div>Create user</div>
						<div onClick={()=>onClose(16)} style={{color:'red', fontSize:'1.4rem', cursor:'pointer'}}>
							<i className="fas fa-times-circle"></i>
						</div>
					</div>
					<div>
						<Form onSubmit={(e)=>this.handleSubmit(e)}/>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token
  };
}
export default connect(mapStateToProps)(CreateUser);
