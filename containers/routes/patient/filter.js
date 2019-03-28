import React, {Component} from 'react'

import { withStyles } from 'material-ui/styles';
import TextField from 'material-ui/TextField';
import MaskedInput from 'react-text-mask';

const styles = theme => ({
	  container: {
	    display: 'flex',
	    flexWrap: 'wrap',
	  },
	  textField: {
	    marginLeft: theme.spacing.unit,
	    marginRight: theme.spacing.unit,
	    marginTop:0,
	    marginBottom:0,
	    cursor:'pointer',
	    width: 150,
	  },
	  label: {
		color:'red'
	  }

	});

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={inputRef}
   	  mask={[/[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, '/', /[0-9]/, /[0-9]/, /[0-9]/, /[0-9]/]}
      placeholderChar={'_'}
      showMask
    />
  );
}


class Filter extends Component {

	render() {
		const {classes, label, type, onChange, value, dateMask} = this.props
		return (
			<div className="patient-search-filter-component">
				{dateMask?
					<TextField
						// style={{color:'red'}}
			   //      	id={type}
			   //      	label={label}
			   //      	InputProps={{
					 //    	className: classes.input
					 //    }}
					 //    InputLabelProps={{
					 //    	shrink:true
					 //    }}
			   //      	className={classes.textField}
			   //      	type={type?type:''}
			   //      	margin="normal"
			   //      	onChange={(e)=>onChange(e.target.value)}
			   //      	value={value}
			   			style={{color:'red'}}
			        	id={type}
			        	label={label}
			        	InputLabelProps={{
					    	shrink:true
					    }}
			        	InputProps={{
					    	className: classes.input,
					    	inputComponent: TextMaskCustom,
					    }}
			        	className={classes.textField}
			        	type={type?type:''}
			        	margin="normal"
			        	onChange={(e)=>onChange(e.target.value)}
			        	value={value}
		        	/>:
		        	<TextField
						style={{color:'red'}}
			        	id={type}
			        	label={label}
			        	InputProps={{
					    	className: classes.input
					    }}
			        	className={classes.textField}
			        	type={type?type:''}
			        	margin="normal"
			        	onChange={(e)=>onChange(e.target.value)}
			        	value={value}

		        	/>
		    	}	
			</div>
		)
		
	}
}
export default withStyles(styles)(Filter)