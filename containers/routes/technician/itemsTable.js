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
    const { classes, items, editItem, deleteItem, printQR } = this.props;
    return (
      <Paper className={classes.root}>
        {<Table className={classes.table}>
          <TableHead className={classes.rootHead}>
            <TableRow className="table-head-cells" >
              <TableCell>ID</TableCell>
              <TableCell>Item Code</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Cust. Type</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>


            </TableRow>
          </TableHead>
          <TableBody>
            {items.length>0&&items.map((n,i) => {
              return (
                <TableRow key={i} className={classes.row}>
                  <TableCell component="th" scope="row" className="tb-cell">{n.item_id}</TableCell>
                  <TableCell style={{width:'5%'}} className="tb-cell">{n.item_code}</TableCell>
                  <TableCell className="tb-cell">{n.ordering_price}</TableCell>
                  <TableCell className="tb-cell">{n.quantity}</TableCell>
                  <TableCell className="tb-cell">{n.item_description}</TableCell>
                  <TableCell className="tb-cell">{n.type}</TableCell>
                  <TableCell className="tb-cell">
                  {
                    n.customization_types&&n.customization_types.map((e,i)=>{
                      return <span key={i}>{`${e.name}` }{i<n.customization_types.length-1?', ':''}</span>
                    })
                  }
                  </TableCell>

                  <TableCell className="tb-cell" onClick={()=>editItem(n)}>
                    <i className="fas fa-edit"></i>
                  </TableCell>
                  <TableCell className="tb-cell" onClick={()=>deleteItem(n.item_id)}>
                    <i className="fas fa-trash-alt"></i>
                  </TableCell>
                  <TableCell className="tb-cell" onClick={()=>printQR(n)}>
                    <i className="fas fa-qrcode"></i>
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
