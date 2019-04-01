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
        {report.patients.length>0&&<Table className={classes.table}>
          <TableHead className={classes.rootHead}>
            <TableRow className="table-head-cells" >
              <TableCell>Account</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Rx dt.</TableCell>
              <TableCell>Start dt.</TableCell>
              <TableCell>Finish dt.</TableCell>
              <TableCell>Equipment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {report.patients.length>0&&report.patients.map((n,i) => {
              return (
                <TableRow key={i} className={classes.row}>
                
                  <TableCell className="tb-cell">{n.patient_id}</TableCell>
                  <TableCell className="tb-cell">{`${n.patient_last_nm}, ${n.patient_first_nm}`}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.patient_date_of_birth)}</TableCell>
                  <TableCell className="tb-cell">{`${n.doctor_last_nm}, ${n.doctor_first_nm}`}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.visit_dt)}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.from_dt)}</TableCell>
                  <TableCell className="tb-cell">{utils.convertDate(n.to_dt)}</TableCell>
                  <TableCell className="tb-cell">{n.pc_code}</TableCell>
                  
                
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
