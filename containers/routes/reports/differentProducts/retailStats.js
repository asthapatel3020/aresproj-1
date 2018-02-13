import React, {Component} from 'react';
import {Link} from 'react-router';
// import * as actions from '../../../actions';
// import { connect } from "react-redux";

class RetailStats extends Component  {
	state={chosen:''}

	render() {
		const {props} = this;
		return (
			<div style={{margin:'0 -2%'}}>
				<table className="stats-table"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th style={{width:'73%'}}>Магазины</th> 
                            <th>Кол-во несоответствий</th> 
                           
                          </tr> 
                        </thead> 
                        
                        	{props.items.map((item,i)=>(
                        		<tbody key={item.id}> 
				                    <tr 
				                    	onClick={()=>this.state.chosen!==item.id?this.setState({chosen:item.id}):this.setState({chosen:''})}
				                    	key={i} 
				                    	style={{color:'black'}} 
				                    	className={this.state.chosen==item.id?"stats-table-chosen main-tr":'main-tr'}
				                    >
				                        <td>
				                        	{item.name+' '} 
											<i className={this.state.chosen==item.id?"fa fa-angle-up":"fa fa-angle-down"} style={{color:'#ffc333', fontSize:'1.2em', fontWeight:'800'}}/>

				                        </td>
				                        <td style={{textAlign:'center'}}>{item.value}</td>
				  
				               		
				                    </tr>
				                    {
				                    	this.state.chosen==item.id&&
				                    	item.shops.map((item,i)=> (
				                    		<tr 
						                    	key={`${item.name}qqkey`} 
						                    	style={{color:'black'}} 
						                    >
						                        <td>{item.name}</td>
						                        <td style={{textAlign:'center'}}>{item.value}</td>
				                    		</tr>
				                    	))
				                    }
			                    </tbody>
			                    

					        ))}
                        
        		</table>
			</div>
		)
	}
}

export default (RetailStats);
