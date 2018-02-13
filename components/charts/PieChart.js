import React from 'react';
import {PieChart, Pie, Legend, Cell, ResponsiveContainer} from 'recharts';

let sum = (a, b) => a+b;
const RADIAN = Math.PI / 180;                    
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,name }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 1.3;
  const x  = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy  + radius * Math.sin(-midAngle * RADIAN);
 
  return (
    <text width='5px'x={x*1.01} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'}  dominantBaseline="central">
      <tspan style={{fontWeight:'600'}}>{name}</tspan>
      <tspan dy="1.1em" dx="-1.8em">{`${(percent * 100).toFixed(0)}%`}</tspan>
      
    </text>

  );
};

export default class MyPieChart extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ea5a5a', '#00b9b1', '#fff46e', '#ffb8b8'];
    return (
    //   <ReactChartist type="Pie" className={'ct-chart'}  data={this.props.data} options={options} />
    <ResponsiveContainer width="100%" height={330}>
    <PieChart width={300} height={330}>

        <Pie 
         dataKey='value'

          data={this.props.data} 
          cx={'50%'} 
          cy={150}  
          isAnimationActive={false}
          labelLine={true}
          fill="#82ca9d" 
          label={renderCustomizedLabel}
          outerRadius={'65%'} 
        >
          {this.props.data.map((entry, index) => <Cell key={entry} fill={COLORS[index % COLORS.length]}/>)}
        </Pie>
       </PieChart>
       </ResponsiveContainer>
    );

  }
}
