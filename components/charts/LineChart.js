import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';
import React from 'react'
export default (props)=> {

    console.log("linechart", props.data)
    return (
      <ResponsiveContainer width="100%" height={330}>
        <LineChart width={600} height={300} data={props.data}
              margin={{top: 5, right: 30, bottom: 5, left:-30}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Line type="monotone" dataKey="value" stroke="#1390fb" activeDot={{r: 8}}/>
        </LineChart>
      </ResponsiveContainer>
    );
  }

