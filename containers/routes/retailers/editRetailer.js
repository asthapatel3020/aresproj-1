/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule Profile
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import {Table} from '../../../components/ui';
import Input from '../../../components/ui/Input';
import '../countries/countryTable.css';
import {Button} from '../../../components/ui'
				// 
class AddCountry extends Component {
	state={retailerName:this.props.params.name, retailerId:this.props.params.id }

	handleNameChange(e) {
    	this.setState({ retailerName: e.target.value });
  	}
	


  	handleSave(e) {
  		// this.props.onLogin(this.state.email, this.state.password);
      this.props.dispatch(actions.editRetailer(this.props.token, this.props.id, this.state.retailerName, this.state.retailerId)); 
  	}
  	componentWillReceiveProps(nextProps) {
  		nextProps.isSent&&this.props.router.push('/retailers');
  		console.log("ISSENT", nextProps.isSent)
  	}
	render() {
		console.log("eddddddit RETAILER",this.props)
		// const {countries} = this.props.countries;
		return (
			<div style={{display:'flex', alignItems:'center', padding:'30px 30px 60px 30px', borderBoxing:'border-box', flexDirection:'column'}}>
				<div className="add-country-form" >
					<div className="form-group form-group1">
		              <label className="col-lg-3" style={{lineHeight:'2.5em'}}>Имя</label>
		              <Input placeholder="Sulpak"  value={this.state.retailerName} onFieldChange={(e)=>this.handleNameChange(e)}/>
		            </div>
		       
		            <div style={{width:'100%', display:'flex', justifyContent:'space-between', marginTop:'25px'}}>
		            	<Button onClick={(e)=>this.props.router.push('/retailers')} label="Назад" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 

		            	<Button onClick={(e)=>this.handleSave(e)} label="Сохранить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
		            	
		            </div>
				</div>
				<div style={{color:'red'}}>

					{this.props.errors.map((item,i)=> (<div key={i}>{item.message}</div>))}
				</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    isSent: state.retailer.editSuccess,
    errors: state.retailer.errors

  };
}
export default connect(mapStateToProps)(AddCountry);
