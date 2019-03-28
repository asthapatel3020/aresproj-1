import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TablePagination from 'material-ui/Table/TablePagination';
import TableRow from 'material-ui/Table/TableRow';
import { FieldArray, Field, reduxForm } from 'redux-form'
import Paper from 'material-ui/Paper';
import * as utils from '../../../../components/functions/functions'
import * as rdField from '../../../../components/form/renderField'


const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    // overflowY:'visible',
    borderTop:'2px solid grey'
  },
  table: {
    // minWidth: 700,
    // maxWidth:'100vw'
  },
  row: {
    // overflowY:'visible',
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



function SimpleTable(props) {
  const { classes, data, statuses, selectTreatment, currentTreatment } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className="table-head-cells">
            <TableCell>Bill #</TableCell>
            <TableCell>Billing dt.</TableCell>
            <TableCell>Mailing dt.</TableCell>
            <TableCell>Reffering Provider</TableCell>
            <TableCell>Billing period</TableCell>
            <TableCell>Code/Units</TableCell>
            <TableCell>Billed $</TableCell>
            <TableCell><span>Paid $</span></TableCell>
            <TableCell>Adjust. $</TableCell>
            <TableCell>Balance $</TableCell>
            <TableCell>Denied</TableCell>
            <TableCell>Status</TableCell>
            
          </TableRow>
        </TableHead>
          <FieldArray 
                    name={`paymentsCollections`}
                    component={rdField.renderPaymentsCollections} 
                    classes={classes} 
                    currentItem={currentTreatment}
                    selectItem={selectTreatment}
                    utils={utils}
                    options={props.billStatuses}
                    />
        
      </Table>
    </Paper>
  );
}


const TempSimpleTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'paymentsCollectionsForm' // a unique name for this form
})(TempSimpleTable);
