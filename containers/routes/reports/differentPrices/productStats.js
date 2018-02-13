import React, {Component} from 'react';

	export default(props)=> {
		return (
			<div style={{margin:'0 -2%'}}>
				<table className="stats-table"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th style={{width:'60%'}}>Модель</th> 
                            <th>Количество (матрица)</th> 
                            <th>Количество (факт)</th> 
                           
                          </tr> 
                        </thead> 
                        
                        	{props.items.map((item,i)=>(
                        		<tbody key={`${i}pp`}> 
				                    <tr 
				                    	key={i} 
				                    	style={{color:'black'}} 
				                    >
				                        <td>{`${item.product.brand.name}-${item.product.model.name}-${item.product.code.code}`}</td>
				                        <td style={{textAlign:'center'}}>{item.price_changed}</td>
				                        <td style={{textAlign:'center'}}>{item.price_from_server}</td>
				                    </tr>
				                    
			                    </tbody>
			                    

					        ))}
                        
        		</table>
			</div>
		)
	}


