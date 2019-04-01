import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from 'material-ui-icons/Delete';
import CloudUploadIcon from 'material-ui-icons/CloudUpload';
import KeyboardVoiceICon from 'material-ui-icons/KeyboardVoice';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import SaveIcon from 'material-ui-icons/Save';
import AddIcon from 'material-ui-icons/Add';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
  button: {
    margin: 0,
    borderRadius:0

  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});
const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#2296f3'
        }
      },
});
const buttonType=(type, classes)=> {
	switch (type) {
		case 'save':
			return <SaveIcon className={classes.rightIcon} />
		case 'add':
			return <AddIcon className={classes.rightIcon} />
    case 'close':
      return <CloseIcon className={classes.rightIcon} />
			
		default: return ''
	}

}
//["flat","raised","fab"].
function IconLabelButtons(props) {
  const { classes, variant, color, type, label, onClick, style } = props;
  return (
    <div>
    	<MuiThemeProvider theme={theme}>
	      <Button onClick={()=>onClick()} style={style} variant={variant} color={color} className={classes.button}>
	        {label&&label}
	        {buttonType(type, classes)}
	      </Button>
      	</MuiThemeProvider>
     
    </div>
  );
}


export default withStyles(styles)(IconLabelButtons);


 // <Button variant="contained" color="primary" className={classes.button}>
 //        Send
 //        <Icon className={classes.rightIcon}>send</Icon>
 //      </Button>
 //      <Button variant="contained" color="default" className={classes.button}>
 //        Upload
 //        <CloudUploadIcon className={classes.rightIcon} />
 //      </Button>
 //      <Button variant="contained" disabled color="secondary" className={classes.button}>
 //        <KeyboardVoiceICon className={classes.leftIcon} />
 //        Talk
 //      </Button>
 //      <Button variant="contained" size="small" className={classes.button}>
 //        <SaveIcon className={classes.leftIcon} />
 //        Save
 //      </Button>