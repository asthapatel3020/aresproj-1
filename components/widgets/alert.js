import React from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
// import IconButton from 'material-ui-icons/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 3,
    height: theme.spacing.unit * 4,
  },
  root: {
    background:'green',
    width:100
  }
});

class SimpleSnackbar extends React.Component {
  state = {
    open: false,
  }

  componentWillReceiveProps(nextProps) {
    this.props.open!==nextProps.open&&this.setState({open:true})
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    const { classes, msg, open } = this.props;
    return (
      <div>
        
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={2500}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
            classes: {root: classes.root}
          }}
          message={<span id="message-id">{msg}</span>}
          action={[
            // <IconButton
            //   key="close"
            //   aria-label="Close"
            //   color="inherit"
            //   className={classes.close}
            //   onClick={this.handleClose}
            // >
            //   <CloseIcon />,
            // </IconButton>,
          ]}
        />
      </div>
    );
  }
}

export default withStyles(styles)(SimpleSnackbar);