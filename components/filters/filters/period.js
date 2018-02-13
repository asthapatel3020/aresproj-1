import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import DatePicker from 'react-datepicker';
class Period extends Component  {
	state={toShowPicker:false, startPick:'', endPick:''}

	handleChange(from1, to, periodType) {
		this.setState({toShowPicker:false})
		this.props.dispatch(actions.addFilter({from:from1, to:to}, "period", periodType))
	}
	//to:Math.floor(date._d/1000), 
	handleChangeTo=(date)=> {
		this.setState({endPick:date})
  	}
  	handleChangeFrom=(date)=> {
		this.setState({startPick:date})
  	}
  	componentDidUpdate(prevProps, prevState) {
  		this.state.startPick&&
  		this.state.endPick&&
  		(prevState.startPick!==this.state.startPick||prevState.endPick!==this.state.endPick)
  		&&this.state.toShowPicker&&
  		this.props.dispatch(actions.addFilter({from:Math.floor(this.state.startPick._d/1000), to:Math.floor(this.state.endPick._d/1000)}, "period", "period"))
  	}
	render() {
		let date = new Date();
		let now = Math.floor(date/1000)
		let days7 = Math.floor(new Date().setDate(date.getDate()-6)/1000)
		let days30 = Math.floor(new Date().setDate(date.getDate()-29)/1000)
		let year = Math.floor(new Date(date.getFullYear(), 0, 1)/1000)
		const {checked} = this.props
		return (
			<div className="filter-choices period">
							<label htmlFor="0" onClick={()=>this.handleChange('clear','clear', "all")} >
								<input checked={checked=='all'&&true} readOnly onClick={(e)=>e.stopPropagation()} name="period" id="0" type="radio"/>
								<div>Все</div>
							</label>
							<label htmlFor="1" onClick={()=>this.handleChange(days7, now, "days7")} >
								<input checked={checked=='days7'&&true} readOnly onClick={(e)=>e.stopPropagation()} name="period" id="1" type="radio"/>
								<div>7 дней</div>
							</label>
							<label htmlFor="2" onClick={()=>this.handleChange(days30, now, "days30")}>
								<input checked={checked=='days30'&&true} readOnly onClick={(e)=>e.stopPropagation()} name="period" id="2" type="radio"/>
								<div>30 дней</div>
							</label>
							<label htmlFor="3" onClick={()=>this.handleChange(year, now, "year")}>
								<input checked={checked=='year'&&true} readOnly onClick={(e)=>e.stopPropagation()} name="period" id="3" type="radio"/>
								<div>Текущий год</div>
							</label>
							<label htmlFor="4" onClick={()=>this.setState({toShowPicker:true})}>
								<input checked={checked=='period'&&true} readOnly onClick={(e)=>e.stopPropagation()} name="period" id="4" type="radio"/>
								<div style={{textDecoration:this.state.toShowPicker&&'underline'}}>Период</div>
							</label>
								{this.state.toShowPicker&&<div>
									<div style={{display:'flex', width:'100%', marginBottom:5}}>
										<div style={{width:25}}>{"C: "}</div>
										<DatePicker dateFormat="DD/MM/YYYY" className="picker" selected={this.state.startPick} onChange={this.handleChangeFrom} />
									</div>
									<div style={{display:'flex', width:'100%'}}>
										<div style={{width:25}}>{"До: "}</div>
										<DatePicker dateFormat="DD/MM/YYYY" className="picker" selected={this.state.endPick} onChange={this.handleChangeTo} />
									</div>
								</div>}
						</div>
		)
	}
}
export default connect()(Period);
