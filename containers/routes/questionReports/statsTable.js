import React, {Component} from 'react';
import {Link} from 'react-router';

class StatsTable extends Component  {
	state={chosen:''}

	render() {
		const {items, type} = this.props;
		// const arr = type=='retails'?items.retails:items.categories
		// const subArr = type=='retails'?items.retails.
		console.log("ite", items)
		return (
			<div style={{margin:'0 -2%'}}>
				<table className="stats-table"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th style={{width:'48%'}}>Магазины</th> 
                            {items&&items[0].options.map((e,i)=><th key={e.id}>{e.option}</th>)}

                           
                          </tr> 
                        </thead> 
                        
                        	{items.map((item,i)=>(
                        		<tbody key={item.id}> 
				                    <tr 
				                    	onClick={()=>type!=='brands'&&this.state.chosen!==item.id?this.setState({chosen:item.id}):this.setState({chosen:''})}
				                    	key={i} 
				                    	style={{color:'black'}} 
				                    	className={this.state.chosen==item.id?"stats-table-chosen main-tr":'main-tr'}
				                    >
				                        <td>
				                        	{item.name+' '} 
											{type!=='brands'&&<i className={this.state.chosen==item.id?"fa fa-angle-up":"fa fa-angle-down"} style={{color:'#ffc333', fontSize:'1.2em', fontWeight:'800'}}/>}

				                        </td>
				                        {item.options.map((o,j)=>(<td key={o.id} style={{textAlign:'center'}}>{o.percent}%</td>))}
				  
				               		
				                    </tr>
				                    {
				                    	item.shops&&
				                    	this.state.chosen==item.id&&
				                    	item.shops.map((item,i)=> (
				                    		<tr 
						                    	key={`${item.name}qqkey`} 
						                    	style={{color:'black'}} 
						                    >
						                        <td>{item.name}</td>
						                        {item.options.map((o,i)=><td key={o.id} style={{textAlign:'center'}}>{o.percent}%</td>)}
				                    		</tr>
				                    	))
				                    }
				                    {
				                    	item.subcategories&&
				                    	this.state.chosen==item.id&&
				                    	item.subcategories.map((item,i)=> (
				                    		<tr 
						                    	key={`${item.name}qqkey`} 
						                    	style={{color:'black'}} 
						                    >
						                        <td>{item.name}</td>
						                        {item.options.map((o,i)=><td key={o.id} style={{textAlign:'center'}}>{o.percent}%</td>)}
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

export default (StatsTable);
