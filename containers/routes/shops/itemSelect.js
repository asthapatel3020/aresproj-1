import React, { Component } from 'react';

const itemSelect = ({...props}) => {
	return <select  defaultValue={props.defaultValue} value={props.value} style={props.style} onChange={props.onSelect} className="form-control"  name="person[time_zone_name]" id="person_time_zone_name">
		{<option style={{color:'#f7f7f7'}} value={""}>{props.defaultOption}</option>}
		{props.items.map((item,i)=>(<option value={item.id} key={i}>{item.name}</option>))}
	</select>
}

export default itemSelect;