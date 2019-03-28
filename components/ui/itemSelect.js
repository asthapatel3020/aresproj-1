import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
// import { colourOptions } from '../data';
// import { Note } from '../styled-components';


const itemSelect = ({...props}) => {
	return (
		<Select
          className="basic-single"
          classNamePrefix="select"
          // defaultValue={colourOptions[0]}
          isSearchable={true}
          name={props.name}
          options={props.items}
          value={props.value}
          onChange={(e)=>props.onChange(e)}
          style={props.style}
        />
	)
	// return <select  defaultValue={props.defaultValue} style={props.style} onChange={props.onSelect} className="form-control"  name="person[time_zone_name]" id="person_time_zone_name">
	// 	{props.items.length>1&&<option disabled>{props.disLabel}</option>}
	// 	{props.items.map((item,i)=>(<option value={item.id} key={i}>{item}</option>))}
	// </select>
}

export default itemSelect;