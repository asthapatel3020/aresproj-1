import React, {Component} from 'react';

	export default(props)=> {
		return (
			<div style={{margin:'0 -2%'}}>
				<table className="stats-table"> 
                        <thead className="table-thead"> 
                          <tr> 
                            <th style={{width:'80%'}}>Пользователи</th> 
                            <th>Кол-во аудитов</th> 
                           
                          </tr> 
                        </thead> 
                        
                        	{props.items.map((item,i)=>(
                        		<tbody key={item.id}> 
				                    <tr 
				                    	key={i} 
				                    	style={{color:'black'}} 
				                    >
				                        <td>
				                        	{item.username} 

				                        </td>
				                        <td style={{textAlign:'center'}}>{item.value}</td>
				  
				               		
				                    </tr>
				                    
			                    </tbody>
			                    

					        ))}
                        
        		</table>
			</div>
		)
	}


