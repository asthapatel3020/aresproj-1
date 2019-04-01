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
    const { classes, patients } = this.props;
    console.log('qqq',patients)
    return (
      <Paper className={classes.root}>
        {patients.patients.length>0&&<Table className={classes.table}>
          <TableHead className={classes.rootHead}>
            <TableRow className="table-head-cells" >
              <TableCell>ID</TableCell>
              <TableCell>Patient Name</TableCell>
              <TableCell>Patient Address</TableCell>
              <TableCell>D.O.A</TableCell>
              <TableCell>D.O.B.</TableCell>
              <TableCell>Insurance Company</TableCell>
              <TableCell>Policy #</TableCell>
              <TableCell>Claim #</TableCell>
              <TableCell>Doctor & Office</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.patients.map((n,i) => {
              return (
                <TableRow key={i} onClick={()=>this.props.choosePatient(n, n.patient_id)} className={classes.row}>
                  <TableCell component="th" scope="row" className="tb-cell">
                    {n.patient_id}
                  </TableCell>
                  <TableCell style={{width:'5%'}} className="tb-cell">{`${n.patient_first_nm} ${n.patient_last_nm}`}</TableCell>
                  <TableCell className="tb-cell">{n.patient_address}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.patient_date_of_accident)}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.patient_date_of_birth)}</TableCell>
                  <TableCell className="tb-cell">{n.insurances.length>0?n.insurances[0].ic_name:''}</TableCell>
                  <TableCell className="tb-cell">{n.insurances.length>0?n.insurances[0].policy_num:''}</TableCell>
                  <TableCell className="tb-cell">{n.insurances.length>0?n.insurances[0].claim_num:''}</TableCell>
                  <TableCell width='40px 'style={{width:'40px'}} className="tb-cell">{`${n.doctor_first_nm} ${n.doctor_last_nm}(${n.office_name})`}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
                   
        </Table>}
        <TablePagination
            className="pagination"
            component="div"
            count={patients.pagination.total_pages*30-7}
            rowsPerPage={30}
            page={patients.pagination.current_page-1}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            rowsPerPageOptions={[]}
            // onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
      </Paper>
    );
  }
}


export default withStyles(styles)(SimpleTable);
