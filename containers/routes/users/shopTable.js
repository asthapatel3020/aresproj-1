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
import '../countries/countryTable.css';
import {Button} from '../../../components/ui';
import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
// componentDidMount() {
  
// }
class ShopTable extends Component  {
	state={items:[], success:false}
	itemsChecked=(newItems)=>{
		console.log("neew", newItems)
		this.setState({items:newItems})
	}
	uncheckAll=()=> {
		this.setState({items:[]})
	}
	checkAll=()=> {
		let arr =[];
		this.props.items.map((item,i)=>arr.push(item.id))
		this.setState({items:arr})
	}
	componentDidUpdate(prevProps, prevState) {
		if (this.state.items.length>0||prevState.items.length>0) 
		prevState.items!==this.state.items&&this.props.getItems(this.state.items)

		
	}
	componentWillReceiveProps(nextProps) {
		this.props.addSuccess!==nextProps.addSuccess&&this.setState({items:[]})
		// let arr=[];
		// const {items} = this.props
		// for (let i=0;i<nextProps.checkedItems.length; i++) {
		// 	for (let j=0;j<items.length; j++) {
		// 		items[j].id==nextProps.checkedItems[i].id&&arr.push(j)
		// 	}
		// }
		// console.log("test", items, arr)
		nextProps.checkedItems.length!==this.props.checkedItems.length&&this.setState({items:nextProps.checkedItems})
	}

	render(){
		// console.log("table", this.state.items)
		const {props} = this;
	return<div style={{marginLeft:'-3.4%', marginRight:'-3.4%'}}> 
		<div style={{display:'flex', justifyContent:'space-between', padding:'0 3%'}}>
			            <label className="col-lg-2 c-col" style={{lineHeight:'2.5em'}}>Список магазинов</label>
			            <div className="question-btns">
			            	<span>Выбрано: {this.state.items.length}/{props.items.length}</span>
		            		<Button onClick={this.checkAll} label="Выбрать все" style={{textAlign:'right'}} size="btn-sm" color="btn-info"   /> 
		            		<Button onClick={this.uncheckAll} label="Сбросить все" style={{textAlign:'right'}} size="btn-sm" color="btn-danger"   /> 
						</div>

					</div>
		<CheckboxGroup
        // checkboxDepth={2} // This is needed to optimize the checkbox group
        name="items"
        value={this.state.items}
        onChange={this.itemsChecked}>

		{props.items.map((item,i)=> 
			<div key={i} style={{width:'100%', padding:'10px 3.2%', paddingLeft:'5%', borderTop:'1px solid #eee', display:'flex', justifyContent:'space-between', cursor:'pointer' }}>
				<label><Checkbox value={item.id}  style={{marginRight:'5px'}}/>{item.name}</label>

			</div>)}  
	 	</CheckboxGroup>                      
		
	</div>
	}
	
		// const {users} = props;
		
		// countries.forEach(item=><div>{item.name}</div>)
	// return (
	// 	<div>hello</div>
	
	// );
}
function mapStateToProps(state) {
  return {
   	addSuccess:state.user.addSuccess,

	
  };
}
export default connect(mapStateToProps)(ShopTable);

