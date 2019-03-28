import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../../actions/';
import Button from '../../../../../components/ui/roundButton'
import { submit } from 'redux-form'
import { connect } from "react-redux";
import Form from './form'
import Report from './report'
import Modal from 'react-modal'
import axios from 'axios'
import qs from 'qs'
import {reset} from 'redux-form'

Modal.setAppElement('#wrapperContainer')


const customStyles = {
  content : {
	  width:'100%',
	  height:'100%'
  }
};
export const handleSubmit=(values, dispatch)=> {
	console.log('SUBMITTED', values)
}

class WithoutPickup extends Component  {
	state={
		tab:0
	}
	
	getPaymentByProvider() {

	}
	closeModal() {
		this.props.onClose(7)
		this.props.dispatch(reset('withoutPickupForm'))

	}
	changeTabToReport() {
		this.setState({tab:1})
		this.props.dispatch(submit('withoutPickupForm', ''))
	}
	render() {
		const {open, onClose } = this.props
		const {tab} = this.state
		return (
			<Modal 
				className="Modal"
           		overlayClassName="Overlay"
           		isOpen={open} 
           		style={customStyles}
           		onRequestClose={()=>onClose(7)}>

				<div style={{ width:'100%', background:'#fff', height:'100%', paddingBottom:'2rem', overflow:'auto'}}>
					<div className="modal-title">Patients without pickup</div>
					<div style={{padding:'1rem'}}>
						<div className="d-flex">
	              			<div style={{marginRight:15}}>
	              				<Button onClick={()=>handleDelete()} variant={'fab'} type='print' color='secondary' />
	              			</div>
	              			
	              			<div style={{marginRight:15}}>
	              				<Button onClick={()=>this.closeModal()} variant={'fab'} type='close' color='default' />
	              			</div>
						</div>

						<div style={{padding:'20px 0'}}>
							<div style={{width:'100%'}} className="d-flex flex-column align-items-start">
								<div className="d-flex" style={{marginTop:-15, border:'1px solid #ddd'}}>
									<div 
										className="item-choice" 
										onClick={()=>this.setState({tab:0})}
										style={{borderBottom:tab==0&&'2px solid #23b9ec', color:tab==0&&'black'}}>CRITERIA</div>
									<div 
										className="item-choice" 
										onClick={()=>this.changeTabToReport()}
										style={{borderBottom:tab==1&&'2px solid #23b9ec', color:tab==1&&'black'}}>REPORT</div>
								</div>
								{tab==0&&<Form 
									codes={this.props.codes}
									onSubmit={handleSubmit()}
									/>
								}
								{tab==1&&
									<Report
										report={this.props.report}
										params={this.props.reportParams}/>
								}

							</div>
						</div>
					</div>
				</div>
			</Modal>
		)
	}
}
function mapStateToProps(state) {
  return {
  	token:state.app.token,
  	codes:state.treatments.treatments,
  	report:state.reports.report
  };
}
export default connect(mapStateToProps)(WithoutPickup);



/*
<div style={{marginRight:15}}>
	<Button onClick={()=>this.getPaymentByProvider()} variant={'fab'} type='search' color='primary' />
</div>
*/
