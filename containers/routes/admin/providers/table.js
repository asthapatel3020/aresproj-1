import React from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FieldArray, reduxForm } from 'redux-form'



const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
    maxHeight:'200px',
    borderTop:'2px solid grey'
  },
  table: {
    // minWidth: 700,
    // maxWidth:'100vw'
  },
  row: {
    height:30,
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  },
  rowhead: {
    fontWeight:600
  }
});


class SimpleTable extends React.Component {
  


  render() {
    const { classes, data, currentItem, selectItem } = this.props;

      return (
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow className="table-head-cells">
                <TableCell>ID</TableCell>
                <TableCell>Name and address</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.length>0&&data.map((n,i) => {
                return (
                  <TableRow 
                    key={i} 
                    className={classes.row}
                    onClick={()=>selectItem(n)}
                    style={{backgroundColor:currentItem.office_id==n.office_id&&'#cff3ff'}}>
                    <TableCell className="tb-cell">{n.office_id}</TableCell>
                    <TableCell className="tb-cell">{`${n.office_name}(${n.office_address}, ${n.office_city})`}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>
    );
  }
  
}


export default withStyles(styles)(SimpleTable);
