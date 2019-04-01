import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}



const styles = theme => ({
  root: {
  '&:hover':{
    background:'#0000000d'
  }
  },
  indicator:{ 
      backgroundColor: '#24b9ec',
      height:3
  },
  flexContainer: {
    background:'#fff',
    color:'#292929',
    boxShadow:'none'
  },
});

class SimpleTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.changeTab(value)
  };

  render() {
    const { classes, patient, changeTab, currentTab} = this.props;
    const { value } = this.state;

    return (
      
        <AppBar style={{boxShadow:'none', border:'1px solid #e2e2e2', zIndex:0}} position="static">
          <Tabs classes={{indicator:classes.indicator, flexContainer:classes.flexContainer}} 
          value={currentTab} onChange={this.handleChange}>
            <Tab classes={{root:classes.root}} label="Search" />
            {<Tab classes={{root:classes.root}} label="Patient" />}
            {patient.patient_id&&<Tab classes={{root:classes.root}} label="Visit Registry" />}
            {patient.patient_id&&<Tab classes={{root:classes.root}} label="Billing" />}
            {patient.patient_id&&<Tab classes={{root:classes.root}} label="Payments&Collections"  />}
          </Tabs>
        </AppBar>
        
     
    );
  }
}


export default withStyles(styles)(SimpleTabs);
