import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TablePagination from 'material-ui/Table/TablePagination';
import TableRow from 'material-ui/Table/TableRow';
import TableSortLabel from 'material-ui/Table/TableSortLabel';
import Paper from 'material-ui/Paper';
import * as actions from '../../../../actions'
import * as utils from '../../../../components/functions/functions'
import Button from '../../../../components/ui/roundButton'
import Select from '../../../../components/ui/itemSelect'
import { FieldArray, reduxForm } from 'redux-form'
import * as rdField from '../../../../components/form/renderField'
import { arrayPush, arrayRemove } from 'redux-form';
// import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
    borderTop:'2px solid grey'
  },
  table: {
    // minWidth: 700,
    // maxWidth:'100vw'
  },
  row: {
    height:'32px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  }
});



class SimpleTable extends React.Component {
  state={count:this.props.services.length-1, selectedService:'', tempServices:[]}
  

  handleSelect(e) {

  }

  addItem() {
    this.props.dispatch(arrayPush('visitRegistry', 'serviceList', {}))
    this.props.chooseService(this.state.count+1)
    this.setState({count:this.state.count+1})

  }
  render() {
    // console.log('manman', this.state.count) 
    const { classes, services, chooseService, currentService, dispatch, serviceList, deleteItem } = this.props;
    return (
    <div>
      <div className="d-flex justify-content-end" style={{padding:5}}>
        <Button onClick={()=>this.addItem()} variant={'fab'} type='add' color='primary' style={{width:35, height:35, marginRight:10}}/>
        <Button 
          onClick={()=>deleteItem()}
           variant={'fab'} 
           type='delete' color='secondary' style={{width:35, height:35}}/>
      </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className="table-head-cells">
              <TableCell>Billed</TableCell>
              <TableCell>Type of service</TableCell>
              <TableCell>Rx. Date</TableCell>
            </TableRow>
          </TableHead>
          
                <FieldArray 
                  name='serviceList' 
                  component={rdField.renderServiceList} 
                  classes={classes} 
                  onChange={()=>console.log('THISPROPSFIELDARR')}
                  currentService={currentService}
                  chooseService={chooseService}
                  utils={utils}
                  options={serviceList}/>
          
        </Table>
      </Paper>
    </div>
  );
  }
  
}


const TempSimpleTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'visitRegistry' // a unique name for this form
})(TempSimpleTable);
