import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TablePagination from 'material-ui/Table/TablePagination';
import TableRow from 'material-ui/Table/TableRow';
import Paper from 'material-ui/Paper';
import { FieldArray, Field, reduxForm } from 'redux-form'
import * as rdField from '../../../../components/form/renderField'
import * as utils from '../../../../components/functions/functions'


const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    borderTop:'1px solid grey'
  },
  table: {
    // minWidth: 700,
    // maxWidth:'100vw'
  },
  row: {
    height:32,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  },
  rowhead: {
    fontWeight:600
  }
});

let id = 0;
function createData(v1, v2, v3, v4, v5, v6) {
  id += 1;
  return {id, v1, v2, v3, v4, v5, v6};
}



function SimpleTable(props) {
  const { classes, currentTreatment, currentPayment, selectPayment, paymentSources } = props;
  console.log('Simpletable', currentTreatment)
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className="table-head-cells">
            <TableCell>Check No</TableCell>
            <TableCell>Issued</TableCell>
            <TableCell>Received</TableCell>
            <TableCell>Paim Am.</TableCell>
            <TableCell>Paid by</TableCell>
            <TableCell>Note</TableCell>
         

          </TableRow>
        </TableHead>
        <FieldArray 
                    name={`paymentsCollections[${currentTreatment}].payments`}
                    component={rdField.renderPaymentRegistry} 
                    classes={classes} 
                    currentItem={currentPayment}
                    selectItem={selectPayment}
                    utils={utils}
                    options={paymentSources}
                    />
      </Table>
    </Paper>
  );
}


const TempSimpleTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'paymentsCollectionsForm' // a unique name for this form
})(TempSimpleTable);
