import React, {PureComponent} from 'react';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
    border:'1px solid rgb(226, 226, 226)',
    maxHeight:500
  },
  root1: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflow: 'auto',
    border:'1px solid rgb(226, 226, 226)',
    maxHeight:140
  },
  table: {
    // minWidth: 700,
    // maxWidth:'100vw'
  },
  head: {
    height:30
  },
  row: {
    height:'25px',
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
    '&:hover': {backgroundColor:'#e0e0e0', cursor:'pointer'}
  }
});


class  CheckBoxTable extends PureComponent { 

  // shouldComponentUpdate(nextProps, nextState) { 
  //  return false
  // }
  render () {
    const { classes, items, selectCode, fields, input, tableName, cell1Label, cell2Label, columnsNumber, cell1, cell2, options, tableHeight } = this.props;
    
    console.log('props', this.props)
  return (
      <Paper className={columnsNumber==1?classes.root1:classes.root} style={{maxHeight:tableHeight&&tableHeight}}>
        <Table className={classes.table} >
          
          <TableHead className={classes.head}>
          {
            columnsNumber==1?<TableRow style={{height:30}}className="table-head-cells">
              <TableCell></TableCell>
              <TableCell>{cell1Label}</TableCell>
            </TableRow>:
            <TableRow style={{height:30}}className="table-head-cells">
              <TableCell></TableCell>
              <TableCell>{cell1Label}</TableCell>
              <TableCell>{cell2Label}</TableCell>
            </TableRow>
          }
           
          </TableHead>
          <TableBody>
            {
              options.map((option, index) => {
                return columnsNumber==1?(
                  <TableRow key={index} className={classes.row} >
                      <TableCell style={{width:30, padding:2}}>
                          <input type="checkbox"
                                id={`${tableName}${index}`}
                                className="tb-cell"
                                 name={`${input.name}[${index}]`}
                                 value={option.value}
                                 checked={input.value.indexOf(option.value) !== -1}
                                 onChange={(event) => {
                                     const newValue = [...input.value];
                                     if (event.target.checked) {
                                         newValue.push(option.value);
                                     } else {
                                         newValue.splice(newValue.indexOf(option.value), 1);
                                     }

                                     return input.onChange(newValue);
                                 }}/>
                      </TableCell>
                        <TableCell className="tb-cell">
                          <label htmlFor={`${tableName}${index}`}>
                            {option[cell1]}
                          </label>
                        </TableCell>
                  </TableRow>
                  ):
                (
                  <TableRow key={index} className={classes.row} >
                      <TableCell style={{width:30, padding:5}}>
                          <input type="checkbox"
                                id={`${tableName}${index}`}
                                className="tb-cell"
                                 name={`${input.name}[${index}]`}
                                 value={option.value}
                                 checked={input.value.indexOf(option.value) !== -1}
                                 onChange={(event) => {
                                     const newValue = [...input.value];
                                     if (event.target.checked) {
                                         newValue.push(option.value);
                                     } else {
                                         newValue.splice(newValue.indexOf(option.value), 1);
                                     }

                                     return input.onChange(newValue);
                                 }}/>
                      </TableCell>
                      
                        <TableCell className="tb-cell">
                          <label htmlFor={`${tableName}${index}`}>
                            {option[cell1]}
                          </label>
                        </TableCell>
                        <TableCell className="tb-cell">
                          <label htmlFor={`${tableName}${index}`}>
                            {option[cell2]}
                          </label>
                        </TableCell>
                  </TableRow>
                  )
              })
            }
            
          </TableBody>
        </Table>
      </Paper>
    );
  }
  
}



export default withStyles(styles)(CheckBoxTable);
