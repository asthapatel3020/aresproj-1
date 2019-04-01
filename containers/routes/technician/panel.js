import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment'
const styles = theme => ({
  root: {
    padding:0,
  },
  content: {
  	margin:0
  },
  expanded: {
  	margin:'0 !important',
  	borderTop:'1px solid rgb(226, 226, 226)'
  }
});

class Panel extends React.Component {
	

  render() {
    const { classes, item, index} = this.props
    let totalSum =0
    // console.log('item', item)
    item.rent_items.map(e=>totalSum+=e.ordering_price*e.quantity)

    return (
      
       <ExpansionPanel >
        <ExpansionPanelSummary classes={{root:classes.root, content:classes.content, expanded:classes.expanded}}>
			<div  style={{padding:'10px', width:'100%'}} className="schedule-element">
				<div style={{marginBottom:10, fontSize:'0.9rem'}}>
					<div style={{fontWeight:500}}>Delivery date: </div>
					<div>From: {`${moment.unix(item.delivery_date_from).format('MM/DD/YYYY, h:mm a')}`}</div>
          <div>To: {`${moment.unix(item.delivery_date_to).format('MM/DD/YYYY, h:mm a')}`}</div>
				</div>
        <div style={{fontWeight:500, textDecoration:'underline', marginBottom:5}}>Items for rent: </div>
				{item.rent_items.map((r,k)=><div key={k} style={{border:'1px solid #bdb8b8',borderRadius:5, marginBottom:5, padding:4}}>
					<span style={{fontWeight:500}}>{` Item code: `}</span>
					{r.item_code},
					<span style={{fontWeight:500}}>{` Quantity: `}</span>
					{r.quantity}
          <div>
            <div style={{fontWeight:500}}>Rent period: </div>
            <div>From: {`${moment.unix(r.date_from).format('MM/DD/YYYY, h:mm a')}`}</div>
            <div>To: {`${moment.unix(r.date_to).format('MM/DD/YYYY, h:mm a')}`}</div>
          </div>
				</div>)}

        <div style={{fontWeight:500, textDecoration:'underline', marginBottom:5, marginTop:10}}>Items for sell: </div>
        {item.sell_items.map((r,k)=><div key={k} style={{border:'1px solid #bdb8b8',borderRadius:5, marginBottom:5, padding:4}}>
          <span style={{fontWeight:500}}>{` Item code: `}</span>
          {r.item_code},
          <span style={{fontWeight:500}}>{` Quantity: `}</span>
          {r.quantity}

        </div>)}
			</div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        	<div>
        		<div style={{marginBottom:10}}>
					<span style={{fontWeight:500}}>Patient: </span>
					{` ${item.patient_first_nm} ${item.patient_last_nm}` }
				</div>
				<div style={{marginBottom:10}}>
					<span style={{fontWeight:500}}>Total sum: </span>
					{` ${totalSum}`}
				</div>
        	</div>
            	
        </ExpansionPanelDetails>
    </ExpansionPanel>
        
     
    );
  }
}

// MMMM Do YYYY

export default withStyles(styles)(Panel);