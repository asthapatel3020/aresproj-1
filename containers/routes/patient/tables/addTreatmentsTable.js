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
import Paper from 'material-ui/Paper';
import Checkbox from 'material-ui/Checkbox';

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
    height:'25px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  }
});


function SimpleTable(props) {
  const { classes, items, selectTreatment } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className="table-head-cells">
            <TableCell>Charge</TableCell>
            <TableCell>Code</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length>0&&items.map((n,i) => {
            return (
              <TableRow 
                key={i} 
                className={classes.row} 
                onClick={()=>{if (window.confirm(`Add treatment '${n.pc_code_description}'?`)) selectTreatment(n.pc_id)}}>
                <TableCell className="tb-cell">{n.pc_charge}</TableCell>
                <TableCell className="tb-cell">{n.pc_code}</TableCell>
                <TableCell className="tb-cell">{n.pc_code_description}</TableCell>
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}


export default withStyles(styles)(SimpleTable);
