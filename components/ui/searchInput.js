import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchInput from 'react-search-input'

class Footer extends Component {
  handleChange() {

  }
  render() {
    const {rounded, rest, title, onChange} = this.props
    let icon = this.props.icon ? <i className={this.props.icon} /> : null;
    return (
      <div style={{width:'100%'}} className="d-flex align-items-center">
        <div style={{color:'#565656', marginRight:10, fontWeight:'500', fontSize:'0.9rem'}}>{title}</div>
        <div className={`${this.props.icon ? "iconic-input" : ""}`} style={{width:this.props.inputWidth}}>
          {icon}
          <SearchInput
            autoComplete="off"
            className={`search-input ${rounded ? "rounded" : ""}`}
            onChange={e =>onChange(e)}
            style={{width:'100%'}}
            type='search'
            {...rest}

          />
        </div>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient
  };
}
export default connect(mapStateToProps)(Footer);