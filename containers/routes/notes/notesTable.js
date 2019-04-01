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
import * as utils from '../../../components/functions/functions'

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    // overflowX: 'auto',
    border:'1px solid #ddd'
  },
  rootHead: {
    fontWeight:600
  },
  table: {
    // minWidth: 700,
    maxWidth:'100vw'
  },
  row: {
    height:'32px',
    width:'100%',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    // '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  }
});



class SimpleTable extends React.Component {
  
  handleChangePage() {

  }
  render() {
    const { classes, items, editItem } = this.props;
    return (
      <Paper className={classes.root}>
        {<Table style={{tableLayout: 'auto'}} className={classes.table}>
          <TableHead className={classes.rootHead}>
            <TableRow className="table-head-cells" >
              <TableCell>When to check</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Done</TableCell>
              <TableCell></TableCell>
              


            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((n,i) => {
              return (
                <TableRow key={i} className={classes.row}>
                  <TableCell style={{width:'20%'}} component="th" scope="row" className="tb-cell">{utils.convertDate(n.when_to_do)}</TableCell>
                  <TableCell style={{whiteSpace: "normal", wordWrap: "break-word", width:'70%'}} className="tb-cell">{`${n.event_short_text} / ${n.event_description}`}</TableCell>
                  <TableCell style={{with:'10%'}} className="tb-cell">{n.done_flag=='N'?'No':'Y'}</TableCell>
                  <TableCell className="tb-cell" onClick={()=>editItem(n)}>
                    <i className="fas fa-edit"></i>
                  </TableCell>

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
