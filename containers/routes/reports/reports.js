import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../../actions';
import { connect } from "react-redux";
import Dolya from './dolya/dolya'
import Audits from './audits/audits'
import DifferentPrices from './differentPrices/differentPrices'
import DifferentProducts from './differentProducts/differentProducts'

class Reports extends Component  {
	state={reportChoice:'dolya'}
	componentWillMount() {

		this.props.dispatch(actions.getDolya(this.props.token, this.props.id, this.props.filters))
		this.props.dispatch(actions.getAuditsLineChart(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getDolyaPie(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getDolyaRetailStats(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getDolyaCategoryStats(this.props.token, this.props.id, this.props.filters))
		
		this.props.filters.from&&this.props.dispatch(actions.getAuditsRetailStats(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getAuditsUserStats(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getAllStats(this.props.token, this.props.id, this.props.filters))
		
		this.props.dispatch(actions.getPricesLineChart(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getPricesRetailStats(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getPricesCategoryStats(this.props.token, this.props.id, this.props.filters))

		this.props.dispatch(actions.getAmountLineChart(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getAmountRetailStats(this.props.token, this.props.id, this.props.filters))
		this.props.filters.from&&this.props.dispatch(actions.getAmountCategoryStats(this.props.token, this.props.id, this.props.filters))
		
	}
	componentWillReceiveProps(nextProps) {
		nextProps.filters.from&&
		nextProps.filters.to&&
		nextProps.filters!==this.props.filters&&		
		this.props.dispatch(actions.getDolyaPie(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAllStats(this.props.token, this.props.id, nextProps.filters))

		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getDolya(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getDolyaRetailStats(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getDolyaCategoryStats(this.props.token, this.props.id, nextProps.filters))

		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAuditsLineChart(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAuditsRetailStats(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAuditsUserStats(this.props.token, this.props.id, nextProps.filters))

		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getPricesLineChart(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getPricesRetailStats(this.props.token, this.props.id, nextProps.filters))
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getPricesCategoryStats(this.props.token, this.props.id, nextProps.filters))

		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAmountLineChart(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAmountRetailStats(this.props.token, this.props.id, nextProps.filters))
		
		nextProps.filters.from&&
		nextProps.filters!==this.props.filters&&
		this.props.dispatch(actions.getAmountCategoryStats(this.props.token, this.props.id, nextProps.filters))
	
		
	}
	render() {
		// console.log("graph", this.props.reports.allStats)
		const {
				piechart, 
				retailStats, 
				catStats, 
				auditsGraphic, 
				auditsRetailStats, 
				auditsUsers, 
				allStats, 
				pricesGraphic,
				pricesRetailStats,
				pricesCategoryStats,
				pricesProductStats,
				productMeta,
				amountGraphic,
				amountRetailStats,
				amountCategoryStats,
				amountProductStats,
				amountProductMeta,

			} = this.props.reports
		return (
			<div style={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
				<div className="route-wrapper" style={{marginBottom:20, width:'100%', display:'flex', height:120, padding:0}}>
					<div 
						onClick={()=>this.setState({reportChoice:'dolya'})} 
						className={this.state.reportChoice=='dolya'?'report-chosen report-choice':'report-choice'}
					>
						<div><i className="fa fa-pie-chart" style={{color:'#03a9f4'}}></i></div>
						<div>{allStats.shelf_share?`${allStats.shelf_share}%`:'-'}</div>
						<div>Доля на полке</div>
					</div>
					<div 
						onClick={()=>this.setState({reportChoice:'audits'})} 
						className={this.state.reportChoice=='audits'?'report-chosen report-choice':'report-choice'}
					>
						<div><i className="fa fa-copy" style={{color:'#ffc333'}}></i></div>
						<div>{allStats.audits?allStats.audits:'-'}</div>
						<div>Аудитов</div>
					</div>
					<div 
						onClick={()=>this.setState({reportChoice:'prices'})} 
						className={this.state.reportChoice=='prices'?'report-chosen report-choice':'report-choice'}
					>
						<div><i className="fa fa-money" style={{color:'#18c751'}}></i></div>
						<div>{allStats.different_prices?allStats.different_prices:'-'}</div>
						<div>Несовпадений цен</div>
					</div>
					<div 
						onClick={()=>this.setState({reportChoice:'products'})} 
						className={this.state.reportChoice=='products'?'report-chosen report-choice':'report-choice'}
					>
						<div><i className="fa fa-remove" style={{color:'#ea5a5a'}}></i></div>
						<div>{allStats.different_amounts?allStats.different_amounts:'-'}</div>
						<div>Нессответсвий ассортимента</div>
					</div>
				</div>
				<div style={{width:'100%'}}>
					{this.state.reportChoice=='dolya'&&
						<Dolya  
							graphic={this.props.reports.graphic} 
							piechart={piechart}
							retailStats={retailStats}
							catStats={catStats}
						/>
					}
					{this.state.reportChoice=='audits'&&
						<Audits  
							graphic={auditsGraphic} 
							retailStats={auditsRetailStats}
							userStats={auditsUsers}
						/>
					}
					{this.state.reportChoice=='prices'&&
						<DifferentPrices  
							graphic={pricesGraphic} 
							retailStats={pricesRetailStats}
							categoryStats={pricesCategoryStats}
							productStats={pricesProductStats}
							productMeta={productMeta}
						/>
					}
					{this.state.reportChoice=='products'&&
						<DifferentProducts 
							graphic={amountGraphic} 
							retailStats={amountRetailStats}
							categoryStats={amountCategoryStats}
							productStats={amountProductStats}
							productMeta={amountProductMeta}
						/>
					}
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
	errors: state.matrix.errors,
	isSent:state.matrix.addSuccess,
	reports:state.reports
  };
}
export default connect(mapStateToProps)(Reports);
