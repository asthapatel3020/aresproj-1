import React, { Component } from "react";

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {
      valid: true,
      errorMessage:''
    };
  }

  handleChange(e) {
    // validate based on format
    !this.state.valid&&this.validate(e)
    if (this.props.onFieldChange) {
      this.props.onFieldChange(e);
    }
  }

  isValid() {
    return this.state.valid;
  }
  handleBlur(e) {
    this.validate(e);
  }
  validate(e) {
    let val = e.currentTarget.value;
    if (this.props.required) {
      if (isEmpty(val)) {
        
        this.setState({ valid: false, errorMessage:'Поле должно быть заполнено' });
        return;
      }
      this.setState({ valid: this.validateFormat(this.props.format, val), errorMessage:this.props.errorMessage });
    } else {
      this.setState({ valid: this.validateFormat(this.props.format, val) });
    }
  }

  validateLength(val, minLength, maxLength) {
    return true;
  }

  
  validateFormat(format, val) {
    switch (format) {
      case "email":
        return validations.isEmail("", val);
      case "noNumbers":
        return validations.isAlpha("", val);
      case "numbers":
        return validations.isNumeric("", val)  
      case "login":
        return validations.isLogin(val, val)
      case "password":
        return validations.isPassword(val, val)
      case "phone":
        return validations.isNumeric("", val)&&validations.isLength("", val, 11)
      default:
        return true;
    }
  }

  render() {
    // console.log("input")
    let icon = this.props.icon ? <i className={this.props.icon} /> : null;
    let format = this.props.format;
    let error = this.state.valid ? null : <div className="help-block text-left" style={{color:'red'}}>{this.state.errorMessage}</div>;
    // let myError = this.props.isLogin
    let { errorMessage, onFieldChange, classes, rounded, isFull, isValid, title, type, ...rest } = this.props;
    // console.log("isvalid", isValid)
    return (
      <div className={`${classes}`} style={{width:'100%'}}>
        <div style={{color:'#565656', marginBottom:8}}>{title}</div>
        <div style={{width:'100%'}} className={`${this.props.icon ? "iconic-input" : ""}`}>
          {icon}
          <input
            // type={format}
            autoComplete="off"
            className={`form-control ${rounded ? "rounded" : ""}${!this.state.valid?'invalid-input':''}`}
            onChange={e => this.handleChange(e)}
            onBlur={e=>this.handleBlur(e)}
            style={{width:'100%'}}
            type={type?type:'text'}
            {...rest}
          />
          {error}
        </div>
      </div>
    );
  }
}

// validations

var isExisty = function(value) {
  return value !== null && value !== undefined;
};

var isEmpty = function(value) {
  return value === "";
};

var validations = {
  isDefaultRequiredValue: function(values, value) {
    return value === undefined || value === "";
  },
  isExisty: function(values, value) {
    return isExisty(value);
  },
  matchRegexp: function(values, value, regexp) {
    return !isExisty(value) || isEmpty(value) || regexp.test(value);
  },
  isUndefined: function(values, value) {
    return value === undefined;
  },
  isEmptyString: function(values, value) {
    return isEmpty(value);
  },
  isEmail: function(values, value) {
    return validations.matchRegexp(
      values,
      value,
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i
    );
  },
  isUrl: function(values, value) {
    return validations.matchRegexp(
      values,
      value,
      /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i
    );
  },
  isTrue: function(values, value) {
    return value === true;
  },
  isFalse: function(values, value) {
    return value === false;
  },
  isNumeric: function(values, value) {
    if (typeof value === "number") {
      return true;
    }
    return validations.matchRegexp(values, value, /^[0-9+()-]+$/i);
  },
  isAlpha: function(values, value) {
    return validations.matchRegexp(values, value, /^[А-Я ]+$/i);
  },
  isAlphanumeric: function(values, value) {
    return validations.matchRegexp(values, value, /^[0-9A-Z]+$/i);
  },
  isLogin: function(values, value) {
    return validations.matchRegexp(values, value, /^[0-9A-Z._-]+$/i);
  },
  isPassword: function(values, value) {
    return validations.matchRegexp(values, value, /[^А-Я ]+$/i);
  },
  isInt: function(values, value) {
    return validations.matchRegexp(values, value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
  },
  isFloat: function(values, value) {
    return validations.matchRegexp(
      values,
      value,
      /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/
    );
  },
  isWords: function(values, value) {
    return validations.matchRegexp(values, value, /^[A-Z\s]+$/i);
  },
  isSpecialWords: function(values, value) {
    return validations.matchRegexp(values, value, /^[A-Z\s\u00C0-\u017F]+$/i);
  },
  isLength: function(values, value, length) {
    return !isExisty(value) || isEmpty(value) || value.length === length;
  },
  equals: function(values, value, eql) {
    return !isExisty(value) || isEmpty(value) || value == eql;
  },
  equalsField: function(values, value, field) {
    return value == values[field];
  },
  maxLength: function(values, value, length) {
    return !isExisty(value) || value.length <= length;
  },
  minLength: function(values, value, length) {
    return !isExisty(value) || isEmpty(value) || value.length >= length;
  }
};




export default Input;
