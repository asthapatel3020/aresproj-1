import React, {Component} from 'react';
import classNames from 'classnames';

import { withStyles } from 'material-ui/styles';
import Table from 'material-ui/Table';
import TableBody from 'material-ui/Table/TableBody';
import TableCell from 'material-ui/Table/TableCell';
import TableHead from 'material-ui/Table/TableHead';
import TableRow from 'material-ui/Table/TableRow';
import Paper from 'material-ui/Paper';
import * as utils from '../../../../components/functions/functions'
import { arrayPush, arrayRemove, FieldArray, reduxForm  } from 'redux-form';
import * as rdField from '../../../../components/form/renderField'
// import RootRef from 'material-ui/RootRef/RootRef'
const styles = theme => ({
  root: {
    width: '100%',
    // maxWidth:'100vw',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    border:'1px solid grey',
    maxHeight:400
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



class  SimpleTable extends Component {

  componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  render () {
    const { classes, data, openModal, selectItem, currentItem } = this.props;
    // console.log('TABLE123', this.tableBottom)
    return (
      // <div style={{overflow:'auto', border:'1px solid grey'}} >
        <Paper  className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className="table-head-cells">
              <TableCell>City</TableCell>
              <TableCell>State</TableCell>
          
           

            </TableRow>
          </TableHead>
            <FieldArray 
                    name='citiesAdmin' 
                    component={rdField.renderCities} 
                    classes={classes} 
                    utils={utils}
                    selectItem={(e, i)=>selectItem(e, i)}
                    currentItem={currentItem}/>
        </Table>
      <div ref={(el) => { this.childTable = el; }}></div>

      </Paper>
      // </div>
      
    );
  }
  
}


const StatusesTable = withStyles(styles)(SimpleTable);
export default reduxForm({
    form: 'cityForm' // a unique name for this form
})(StatusesTable);
