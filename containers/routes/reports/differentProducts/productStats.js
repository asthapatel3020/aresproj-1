import React, {Component} from 'react';

	export default(props)=> {
		console.log("products", props.items)
		return (
			<div style={{margin:'0 -2%'}}>
				<table className="stats-table"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th style={{width:'60%'}}>Модель</th> 
                            <th>Стоимость (РРЦ)</th> 
                            <th>Стоимость (факт)</th> 
                           
                          </tr> 
                        </thead> 
                        
                        	{props.items.map((item,i)=>(
                        		<tbody key={`${i}pp`}> 
				                    <tr 
				                    	key={i} 
				                    	style={{color:'black'}} 
				                    >
				                        <td>{`${item.product.brand.name}-${item.product.model.name}-${item.product.code.code}`}</td>
				                        <td style={{textAlign:'center'}}>{item.amount_changed}</td>
				                        <td style={{textAlign:'center'}}>{item.amount_from_server}</td>
				                    </tr>
				                    
			                    </tbody>
			                    

					        ))}
                        
        		</table>
			</div>
		)
	}


