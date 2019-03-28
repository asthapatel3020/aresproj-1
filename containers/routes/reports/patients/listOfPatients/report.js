import React from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableFooter from 'material-ui/Table/TableFooter';
import TableHead from 'material-ui/Table/TableHead';
import TablePagination from 'material-ui/Table/TablePagination';
import Paper from 'material-ui/Paper';
import TableRow from 'material-ui/Table/TableRow';
import * as utils from '../../../../../components/functions/functions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    border:'1px solid rgb(221, 221, 221)',
    overflowX: 'auto',
    maxHeight:500
  },
  rootHead: {
    fontWeight:600,
  },
  table: {
    // minWidth: 700,
    maxWidth:'100vw',
    maxHeight:500
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
    const { classes, report, params } = this.props;
    console.log('report', report)
    return (
      <Paper className={classes.root}>
        {report.procedures.length>0&&<Table className={classes.table}>
          <TableHead className={classes.rootHead}>
            <TableRow className="table-head-cells" >
              <TableCell>Billing Office</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Insurance</TableCell>
              <TableCell>Doctor</TableCell>
              <TableCell>Type of service</TableCell>
              <TableCell>Type of case</TableCell>
              <TableCell>Rx Date</TableCell>
              <TableCell>Bill #</TableCell>
              <TableCell>Bill date</TableCell>
              <TableCell>Billed</TableCell>
              <TableCell>Received Dt.</TableCell>
              <TableCell>Denied Dt.</TableCell>
              <TableCell>Ins pay</TableCell>
              <TableCell>Attorney</TableCell>
              <TableCell>Sent to att. dt.</TableCell>
              <TableCell>Sent to att. $</TableCell>
              <TableCell>Recovered dt.</TableCell>
              <TableCell>Att. pay $</TableCell>
              <TableCell>Interest $</TableCell>
              <TableCell>Att. fee</TableCell>
              <TableCell>Adjust</TableCell>
              <TableCell>DECO fee</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Account</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.procedures.length>0&&report.procedures.map((n,i) => {
              return (
                <TableRow key={i} className={classes.row}>
                  <TableCell component="th" scope="row" className="tb-cell">
                    {n.office_name}
                  </TableCell>
                  <TableCell style={{width:'5%'}} className="tb-cell">{`${n.patient_first_nm} ${n.patient_last_nm}`}</TableCell>
                  <TableCell className="tb-cell">{n.ic_name}</TableCell>
                  <TableCell className="tb-cell">{`${n.doctor_last_nm}, ${n.doctor_first_nm}`}</TableCell>
                  <TableCell className="tb-cell">{`${n.pc_code} ${n.pc_modifier}`}</TableCell>
                  <TableCell className="tb-cell">{n.claim_type_nm}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.visit_dt)}</TableCell>
                  <TableCell className="tb-cell">{n.bill_id}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.billing_dt)}</TableCell>
                  <TableCell className="tb-cell">{n.limit_pc_charge}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.payment_dt)}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.denied_dt)}</TableCell>
                  <TableCell className="tb-cell">{n.paid_am}</TableCell>
                  <TableCell className="tb-cell">{`${n.lw_first_name} ${n.lw_last_name}`}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.sent_to_attorney_dt)}</TableCell>
                  <TableCell className="tb-cell">{n.sent_to_attorney_am}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.recovered_dt)}</TableCell>
                  <TableCell className="tb-cell">{n.lien_am}</TableCell>
                  <TableCell className="tb-cell">{n.interest_am}</TableCell>
                  <TableCell className="tb-cell">{n.lw_fee_pr}</TableCell>
                  <TableCell className="tb-cell">{n.write_off_am}</TableCell>
                  <TableCell className="tb-cell">{n.deductable_am}</TableCell>
                  <TableCell className="tb-cell">{n.bill_status_nm}</TableCell>
                  <TableCell className="tb-cell">{n.patient_id}</TableCell>
                
                </TableRow>
              );
            })}
          </TableBody>
                   
        </Table>}
        <TablePagination
            className="pagination"
            component="div"
            count={report.pagination.total_pages*30-7}
            rowsPerPage={30}
            page={report.pagination.current_page-1}
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
