import React from 'react';

import { withStyles } from 'material-ui/styles';
import FormControlLabel from 'material-ui/Form/FormControlLabel';
import Switch from 'material-ui/Switch';

const styles = theme => ({
  colorSwitchBase: {
    height:25,
    color: '#24b9ec',
    '&$colorChecked': {
      color: '#24b9ec',
      '& + $colorBar': {
        backgroundColor: '#24b9ec',
      },
    },
  },
  colorBar: {},
  colorChecked: {},
  
});

class CustomizedSwitches extends React.Component {
  // state = {
  //   checkedA: true
  // };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  // };

  render() {
    const { classes, checked, handleCheck } = this.props;

    return (
        <FormControlLabel
          control={
            <Switch
              checked={checked}
              onChange={()=>handleCheck()}
              value="checked"
              classes={{
                switchBase: classes.colorSwitchBase,
                checked: classes.colorChecked,
                bar: classes.colorBar,
              }}
            />
          }
          label={<span style={{fontSize:'1rem'}}>All patients</span>}
        />
       
    );
  }
}


export default withStyles(styles)(CustomizedSwitches);