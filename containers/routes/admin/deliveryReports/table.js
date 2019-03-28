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

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    border:'1px solid grey'
  },
  table: {
    // minWidth: 700,
    // maxWidth:'100vw'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    // '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  },
  rowhead: {
    fontWeight:600
  }
});



function SimpleTable(props) {
  const { classes, data, openModal } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className="table-head-cells">
            <TableCell>Deliv. Date to</TableCell>
            <TableCell>Patient name</TableCell>
            <TableCell>Patient DOA</TableCell>
            <TableCell>Deliv. address</TableCell>
            <TableCell>Lawyer office</TableCell>
            <TableCell>Patient photo</TableCell>
            <TableCell>Documents photo</TableCell>
            <TableCell></TableCell>
         

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((n,i) => {
            return (
              <TableRow key={i} className={classes.row}>
                <TableCell className="tb-cell">{utils.convertDate(n.delivery_date_to)}</TableCell>
                <TableCell className="tb-cell">{`${n.patient_first_nm} ${n.patient_last_nm}`}</TableCell>
                <TableCell className="tb-cell">{utils.convertDate(n.patient_date_of_birth)}</TableCell>
                <TableCell className="tb-cell">{n.delivery_address}</TableCell>
                <TableCell className="tb-cell">{n.lw_office_name}</TableCell>
                <TableCell className="tb-cell">{n.v1}</TableCell>
                <TableCell className="tb-cell">{n.v1}</TableCell>
                <TableCell className="tb-cell">
                  <i onClick={()=>openModal(n)} className="fas fa-folder-open"></i>
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}


export default withStyles(styles)(SimpleTable);
