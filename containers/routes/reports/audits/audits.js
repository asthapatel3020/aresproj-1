import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../../actions';
import { connect } from "react-redux";
import LineChart from '../../../../components/charts/LineChart';
import PieChart from '../../../../components/charts/PieChart';
import RetailStats from './retailStats'
import UserStats from './userStats'

class Audits extends Component  {
	state={reportChoice:'dolya', currentPageS:1, currentPageB:1, totalS:'', totalB:''}

	render() {
		
		return (
			<div >

				<div className="route-wrapper" style={{marginBottom:'2%'}}>
					<LineChart 
		              data={this.props.graphic}
		            />
				</div>
				<div style={{display:'flex', justifyContent:'space-between', marginBottom:'2%'}}>
					<div className="reports-block" style={{maxHeight:'250px', overflow:'auto'}}>
						<div style={{fontWeight:'600', color:'black'}}>Розничные сети</div>
						<RetailStats items={this.props.retailStats}/>
					</div>
					<div className="reports-block">
						<div style={{fontWeight:'600', color:'black'}}>Инспекторы</div>
						<UserStats items={this.props.userStats}/>

					</div>
				</div>
			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    filters: state.appliedFilters,
    comments:state.comments
  };
}
export default connect(mapStateToProps)(Audits);
