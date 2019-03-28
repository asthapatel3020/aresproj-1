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
import Toolbar from 'material-ui/Toolbar';
import Paper from 'material-ui/Paper';
import * as utils from '../../../../components/functions/functions'
import { FieldArray, reduxForm } from 'redux-form'
import Button from '../../../../components/ui/roundButton'
import Select from '../../../../components/ui/itemSelect'
import { arrayPush, arrayRemove } from 'redux-form';
import * as rdField from '../../../../components/form/renderField'


const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
    // overflowY:'visible',
    borderTop:'2px solid grey'
  },
  table: {
    // minWidth: 700,
    overflow:'visible'
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


const deleteItem=(dispatch, currentCode, selectCode)=> {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      dispatch(arrayRemove('visitRegistry', 'DiagnosisCodes1', currentCode))
      selectCode((currentCode-1))
    }
  }
function SimpleTable(props) {
  const { classes , dispatch, addCodes, currentCode, selectCode, specialties } = props;
  return (
    <div>
      <div className="d-flex justify-content-end" style={{padding:5}}>
          <Button onClick={addCodes} variant={'fab'} type='add' color='primary' style={{width:35, height:35, marginRight:10}}/>
          <Button 
            onClick={()=>deleteItem(dispatch, currentCode, selectCode )}
             variant={'fab'} 
             type='delete' color='secondary' style={{width:35, height:35}}/>
        </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className="table-head-cells">
              <TableCell>Specialty</TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
          
            </TableRow>
          </TableHead>
          <FieldArray 
                  name='DiagnosisCodes1'
                  isPayments={false}
                  component={rdField.renderDiagnosisCodes} 
                  classes={classes} 
                  currentCode={currentCode}
                  selectCode={selectCode}
                  utils={utils} 
                  specialties={specialties}/>
        </Table>
      </Paper>
    </div>
  );
}


const TempSimpleTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'visitRegistry' // a unique name for this form
})(TempSimpleTable);
