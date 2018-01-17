/**
 * Copyright 2015-present, Lights in the Sky (3273741 NS Ltd.)
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree. 
 * 
 * @providesModule timezonecontrol
 */

import React, { Component } from 'react';

const itemSelect = ({...props}) => {
	return <select  defaultValue={props.defaultValue} style={props.style} onChange={props.onSelect} className="form-control"  name="person[time_zone_name]" id="person_time_zone_name">
		{props.items.length>1&&<option disabled>Выберите из списка</option>}
		{props.items.map((item,i)=>(<option value={item.id} key={i}>{item.name}</option>))}
	</select>
}

export default itemSelect;