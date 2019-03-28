import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/ui/Input'
import SignUpData from './signUpData'
import StatusData from './statusData'

class SignUp extends Component {

	state={sDataType:1}
	
	handleChangeType=(e)=> {
		this.setState({sDataType:e})
	}
	render() {
		const {sDataType} = this.state
		console.log("ads", this.props)

		return (
			<div className="row main" style={{padding:'2rem 0'}}>
				<div className="container">
					<div className="row no-gutters">
						<SignUpData sDataType={sDataType} handleChangeType={this.handleChangeType} router={this.props.router}/>
						<StatusData sDataType={sDataType}/>
						
					</div>
				</div>
			</div>
		)
	}
}
export default SignUp