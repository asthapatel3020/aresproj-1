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
import * as actions from '../../../../actions'
import { FieldArray, reduxForm } from 'redux-form'
import Button from '../../../../components/ui/roundButton'
import RaisedButton from '../../../../components/ui/MaterialButton'

import Select from '../../../../components/ui/itemSelect'
import { arrayPush, arrayRemove } from 'redux-form';
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
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  }
});



class SimpleTable extends React.Component {
  state={currentCode:0}
  
  chooseCode(e) {
    this.setState({currentCode:e})
  }
  deleteItem() {
    if (window.confirm('Are you sure you wish to delete this item?')) {
      this.props.dispatch(arrayRemove('billing', `allBills.treating_providers[${this.props.currentProvider}].specialties[0].services[${this.props.currentServiceType}].bill_diagnosis_codes`, this.state.currentCode))
      this.state.currentCode!==0&&this.setState({currentCode:this.state.currentCode-1})
    }
  }
  render() {
    const { classes , dispatch, addCodes, currentCode, selectCode, data, loadCodes, currentProvider, currentServiceType, currentBill  } = this.props;
    
    return (
      <div>
        <div className="d-flex justify-content-between" style={{padding:5}}>
            <RaisedButton onClick={()=>loadCodes()} label='Copy from Patient' variant={'raised'} type='' color='default' style={{height:35, fontSize:13, boxShadow:'none'}} />
            <div className="d-flex">
              <Button onClick={()=>addCodes()} variant={'fab'} type='add' color='primary' style={{width:35, height:35, marginRight:10}}/>
              <Button 
                onClick={()=>this.deleteItem()}
                 variant={'fab'} 
                 type='delete' color='secondary' style={{width:35, height:35}}/>
            </div>
          </div>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className="table-head-cells">
                <TableCell>Code</TableCell>
                <TableCell>Description</TableCell>
            
              </TableRow>
            </TableHead>
            <FieldArray 
              component={rdField.renderDiagnosisCodesPayment}
              name={`allBills.treating_providers[${currentProvider}].specialties[0].services[${currentServiceType}].bill_diagnosis_codes`}
              classes={classes}
              chooseCode={(e)=>this.chooseCode(e)}
              currentCode={this.state.currentCode}
            />
          </Table>
        </Paper>
      </div>
    );
  }
}


const TempSimpleTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'billing' // a unique name for this form
})(TempSimpleTable);
