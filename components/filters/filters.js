import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../actions';
import { connect } from "react-redux";
import Filter from './filter'
import {Button} from '../ui'
class Filters extends Component {
	state={}
	componentWillMount() {
		this.props.dispatch(actions.getCountries(this.props.token, this.props.id))
		this.props.dispatch(actions.getRetailers(this.props.token, this.props.id))
		this.props.dispatch(actions.getCategories(this.props.token, this.props.id))
		this.props.dispatch(actions.getUsers(this.props.token, this.props.id))
		this.props.dispatch(actions.getBrands(this.props.token, this.props.id))
		
		this.props.userAccess==2&&this.props.dispatch(actions.getCities(this.props.token, this.props.id, this.props.userCountry.id))
		
	}
	componentDidMount() {
  		
  	}
  	componentDidUpdate(prevProps, prevState) {
  		

  	}
	handleApply(filters) {
		this.props.dispatch(actions.applyFilter(filters))
		// this.props.dispatch(actions.applyFilter(filters))
		
	}
	toShowBrandFilter(path) {
		switch (path) {
			case "/downloadmatrix":
				return true;
			default: false;
		}
	}
	render() {
		const {from, to, countryId, cityId, retailerId, shopId, userId, catId, subCatId, brandId, periodType} = this.props.filters;
		const {appliedFilters} = this.props;
	
		// console.log("filters", this.props.filters)
		// console.log("APPLIEDfilters", this.props.appliedFilters)
		// console.log("filtersComponent", this.props.filters, this.props.appliedFilters)
		return (
			<div className="filter-wrapper">
				<div style={{textAlign:'center', color:'black', fontWeight:'800', fontSize:'1.3em'}}>Фильтры</div>
				<div className="filter-options">
					<Filter 
						isActive={appliedFilters.from&&appliedFilters.to?true:false} 
						checked={periodType?periodType:appliedFilters.periodType} 
						type="period" 
						title="Период"
					/>
					{this.props.userAccess==1&&
						<Filter 
							isActive={appliedFilters.countryId?true:false} 
							checked={countryId?countryId:appliedFilters.countryId} 
							countries={this.props.countries} 
							type="countries" 
							title="Страна" 
						/>}
					<Filter 
						isActive={appliedFilters.cityId?true:false} 
						checked={cityId?cityId:appliedFilters.cityId} 
						type="cities" 
						title="Город" 
					/>
					<Filter 
						isActive={appliedFilters.retailerId?true:false} 
						checked={retailerId?retailerId:appliedFilters.retailerId} 
						type="retailers" 
						title="Розничная сеть" 
						retailers={this.props.retailers}
					/>
					<Filter 
						isActive={appliedFilters.shopid?true:false} 
						checked={shopId?shopId:appliedFilters.shopId} 
						type="shops" 
						title="Магазин" 
						retailers={this.props.retailers}
					/>
					<Filter 
						isActive={appliedFilters.catId?true:false} 
						checked={catId?catId:appliedFilters.catId} 
						type="categories" 
						title="Категория" 
						categories={this.props.categories}
					/>
					<Filter 
						isActive={appliedFilters.subCatId?true:false}
						checked={subCatId?subCatId:appliedFilters.subCatId} 
						type="subcategories" 
						title="Подкатегория" 
						retailers={this.props.retailers}
					/>
					{this.toShowBrandFilter(this.props.pathname)&&
						<Filter isActive={appliedFilters.brandId?true:false} 
							checked={brandId?brandId:appliedFilters.brandId} 
							type="brands" 
							title="Бренд" 
							brands={this.props.brands}
						/>}
					<Filter 
						isActive={appliedFilters.userId?true:false} 
						checked={userId?userId:appliedFilters.userId} 
						type="users" 
						title="Пользователь" 
						users={this.props.users}
					/>
					
				</div>
				<div style={{marginTop:'10px'}}>
                  <Button onClick={()=>this.handleApply(this.props.filters)} label="Применить" style={{textAlign:'right'}} size="btn-sm" color="btn-warning"   /> 
					
				</div>
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    countries:state.countries.countries,
    userAccess:state.app.userAccess,
    userCountry:state.app.country,
    retailers:state.retailers.retailers,
    categories:state.categories.categories,
    filters:state.filters,
    users:state.users.users,
    appliedFilters: state.appliedFilters,
    brands:state.brands.brands

  };
}
export default connect(mapStateToProps)(Filters);
