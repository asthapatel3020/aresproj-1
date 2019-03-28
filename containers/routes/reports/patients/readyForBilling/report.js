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
      <div>
        <div>
            <div style={{fontSize:'1.4rem', fontWeight:500, padding:'15px 0', textDecoration:'underline', textAlign:'center'}}>
              PATIENTS READY FOR BILLING
            </div>
        </div>
        <Paper className={classes.root}>
          {report.patients.length>0&&<Table className={classes.table}>
            <TableHead className={classes.rootHead}>
              <TableRow className="table-head-cells" >
                <TableCell>Patient ID</TableCell>
                <TableCell>Patient name</TableCell>
                <TableCell>DOA</TableCell>
                <TableCell>Provider</TableCell>
                <TableCell>Visit type</TableCell>
                <TableCell>Days after DOS</TableCell>
                <TableCell>First not billed visit date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {report.patients.length>0&&report.patients.map((n,i) => {
                return (
                  <TableRow key={i} className={classes.row}>
                  
                    <TableCell className="tb-cell">{n.patient_id}</TableCell>
                    <TableCell className="tb-cell">{`${n.patient_last_nm}, ${n.patient_first_nm}`}</TableCell>
                    <TableCell className="tb-cell">{utils.convertDate('')}</TableCell>
                    <TableCell className="tb-cell">{`${n.office_name}`}</TableCell>
                    <TableCell className="tb-cell">{n.visit_type_nm}</TableCell>
                    <TableCell className="tb-cell">{n.after_dos}</TableCell>
                    <TableCell className="tb-cell">{utils.convertDate(n.visit_dt)}</TableCell>
                    
                  
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
      </div>
      
    );
  }
}


export default withStyles(styles)(SimpleTable);
