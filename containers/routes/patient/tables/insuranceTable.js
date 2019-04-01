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
function createData(v1, v2, v3, v4, v5) {
  id += 1;
  return {id, v1, v2, v3, v4, v5};
}


function SimpleTable(props) {
  const { classes, insurances } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className="table-head-cells">
            <TableCell>Insurance Company</TableCell>
            <TableCell>Contact Name</TableCell>
            <TableCell>Contact Phone</TableCell>
            <TableCell>Policy #</TableCell>
            <TableCell>Claim #</TableCell>
         

          </TableRow>
        </TableHead>
        <TableBody>
          
              <TableRow  className={classes.row}>
                {insurances.length>0&&<TableCell className="tb-cell" style={{wordWrap:'break-word'}}>
                  {`${insurances.ic_name}(${insurances.ic_address}, ${insurances.ic_city}, ${insurances.ic_state}, ${insurances.ic_zip})`}
                </TableCell>}
                <TableCell className="tb-cell">{}</TableCell>
                <TableCell className="tb-cell">{}</TableCell>
                <TableCell className="tb-cell">{}</TableCell>
                <TableCell className="tb-cell">{}</TableCell>
              </TableRow>
         
        </TableBody>
      </Table>
    </Paper>
  );
}


export default withStyles(styles)(SimpleTable);
