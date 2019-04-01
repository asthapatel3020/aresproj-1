import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
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
    overflowX: 'auto',
    paddingBottom:10,
    borderTop:'2px solid grey'
  },
  table: {
    minWidth: 700,
    maxWidth:'100vw'
  },
  row: {
    height:'32px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  }
});


const deleteItem=(dispatch, currentServiceIdx, currentTreatment, selectTreatment)=> {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      dispatch(arrayRemove('visitRegistry', `serviceList[${currentServiceIdx}].treatments`, currentTreatment))
      currentTreatment!==0&&selectTreatment((currentTreatment-1))
    }
  }

const addItem=(addTreatments, currentService)=> {
  currentService.doctor_id?
  addTreatments():
  window.alert('Assign provider to this service and save.')
}
function SimpleTable(props) {
  const { classes, dispatch, currentServiceIdx, currentService, services, addTreatments, currentTreatment, selectTreatment } = props;
  console.log('aa', currentService, currentServiceIdx)
  return (
    <div>
      <div className="d-flex justify-content-end" style={{padding:5}}>
          <Button onClick={()=>addItem(addTreatments, currentService)} variant={'fab'} type='add' color='primary' style={{width:35, height:35, marginRight:10}}/>
          <Button 
            onClick={()=>deleteItem(dispatch, currentServiceIdx,currentTreatment, selectTreatment )}
             variant={'fab'} 
             type='delete' color='secondary' style={{width:35, height:35}}/>
        </div>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className="table-head-cells">
              <TableCell>Code</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>MOD</TableCell>
              <TableCell>Charge</TableCell>
              <TableCell>Units</TableCell>
              <TableCell>From</TableCell>
              <TableCell>To</TableCell>
              <TableCell>Svs Plc.</TableCell>
              <TableCell>PkUp Dt.</TableCell>
            </TableRow>
          </TableHead>
          <FieldArray 
                  name={`serviceList[${currentServiceIdx}].treatments`}
                  component={rdField.renderTreatmentsList} 
                  classes={classes} 
                  currentTreatment={currentTreatment}
                  selectTreatment={selectTreatment}
                  utils={utils} />
        </Table>
      </Paper>
    </div>
  );
}


const TempSimpleTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'visitRegistry' // a unique name for this form
})(TempSimpleTable);
