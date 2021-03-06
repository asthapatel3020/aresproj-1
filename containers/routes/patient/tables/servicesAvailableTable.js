import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import * as utils from '../../../../components/functions/functions'
import Checkbox from '@material-ui/core/Checkbox';
import { FieldArray, reduxForm } from 'redux-form'
import * as rdField from '../../../../components/form/renderField'
const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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
  },
  rowhead: {
    fontWeight:600
  }
});


const checkBill=(e)=> {
  console.log('asd')
  e=true
}
function SimpleTable(props) {
  const { classes, data, setBilled, currentProvider } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className="table-head-cells">
            <TableCell></TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Srv.Cd</TableCell>
            <TableCell>Treating Provider</TableCell>
            <TableCell>Charge</TableCell>
          </TableRow>
        </TableHead>
        
         <FieldArray 
            name={`allBills.treating_providers[${currentProvider}].services_to_bill`}
            component={rdField.servicesToBill} 
            classes={classes} 
            // currentDetail={currentDetail}
            // chooseDetail={chooseDetail}
            utils={utils}
            />
          
        
      </Table>
    </Paper>
  );
}


export default withStyles(styles)(SimpleTable);
