import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import TableRow from '@material-ui/core/TableRow';
import * as utils from '../../../../components/functions/functions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  rootHead: {
    fontWeight:600
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




class SimpleTable extends React.Component {
  
  handleChangePage() {

  }
  render() {
    const { classes, patients, choosePatient } = this.props;
    return (
      <Paper className={classes.root}>
        {patients.length>0&&<Table className={classes.table}>
          <TableHead className={classes.rootHead}>
            <TableRow className="table-head-cells" >
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Patient Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((n,i) => {
              return (
                <TableRow key={i} onClick={()=>choosePatient(n.patient_id)} className={classes.row}>
                  <TableCell component="th" scope="row" className="tb-cell">
                    {n.patient_id}
                  </TableCell>
                  <TableCell style={{width:'5%'}} className="tb-cell">{`${n.patient_first_nm} ${n.patient_last_nm}`}</TableCell>
                  <TableCell className="tb-cell">{n.patient_address}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
                   
        </Table>}
        
      </Paper>
    );
  }
}


export default withStyles(styles)(SimpleTable);
