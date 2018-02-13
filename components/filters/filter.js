import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../actions';
import { connect } from "react-redux";
import Period from './filters/period'
class Filter extends Component {
	state={
		toShow:false, 
		from:'', 
		to:Math.floor(new Date()/1000), 
		startPick:'', 
		endPick:'',
		toShowPicker:false,
		countryId:'',
		cityId:''
	}

  	componentDidUpdate(prevProps, prevState) {
		prevProps.triggered!==this.props.triggered&&this.state.toShow&&this.setState({toShow:false})
  	}

  	handleCountry(id){
		this.props.dispatch(actions.addFilter(id, "country"))
		id&&this.props.dispatch(actions.getCities(this.props.token, this.props.id, id))

  	}
  	handleCity(id){
  		// console.log("citttt")
		this.props.dispatch(actions.addFilter(id, "city"))
  	}
  	handleShop(id){
		this.props.dispatch(actions.addFilter(id, "shop"))
  	}
  	handleUser(id){
		this.props.dispatch(actions.addFilter(id, "user"))
  	}
  	handleSubCategory(id){
		this.props.dispatch(actions.addFilter(id, "subcategory"))
  	}
  	handleBrand(id){
		this.props.dispatch(actions.addFilter(id, "brand"))
  	}
  	handleRetailer(id) {
		this.props.dispatch(actions.addFilter(id, "retailer"))
		id&&this.props.dispatch(actions.getShops(this.props.token, this.props.id, '', id))

  	}
  	handleCategory(id) {
		this.props.dispatch(actions.addFilter(id, "category"))
		id&&this.props.dispatch(actions.getSubCategories(this.props.token, this.props.id, id))

  	}

	ShowFilterInner(type) {
		const {checked} = this.props;
		// let year = Math.floor(date.setDate(date.getDate()-30)/1000)
		switch (type) {
			case "period":
				return <Period checked={this.props.checked}/>
			case "countries":
				return (
					<div className="filter-choices">
						<label htmlFor="all1" onClick={()=>this.handleCountry('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="countries" id={"all1"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.countries.map(e=>
							<div key={e.name}>
								<label key={e.name} htmlFor={e.name} onClick={()=>this.handleCountry(e.id)} >
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="countries" id={e.name} type="radio"/>
									<div >{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "cities":
				return (
					<div className="filter-choices">
						<label htmlFor="all2" onClick={()=>this.handleCity('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="cities" id={"all2"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.cities.length==0&&"Выберите страну"}
						{this.props.cities.map(e=>
							<div key={e.name}>
								<label htmlFor={e.name} onClick={()=>this.handleCity(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="cities" id={e.name} type="radio"/>
									<div>{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "retailers":
				return (
					<div className="filter-choices">
						<label htmlFor="all3" onClick={()=>this.handleRetailer('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="retailers" id={"all3"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.retailers.map(e=>
							<div key={e.name}>
								<label htmlFor={e.name} onClick={()=>this.handleRetailer(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="retailers" id={e.name} type="radio"/>
									<div>{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "categories":
				return (
					<div className="filter-choices">
						<label htmlFor="all4" onClick={()=>this.handleCategory('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="categories" id={"all4"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.categories.map(e=>
							<div key={e.name}>
								<label htmlFor={e.name} onClick={()=>this.handleCategory(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="retailers" id={e.name} type="radio"/>
									<div>{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "subcategories":
				return (
					<div className="filter-choices">
						<label htmlFor="all5" onClick={()=>this.handleSubCategory('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="subcategories" id={"all5"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.subCategories.length==0&&"Выберите категорию"}

						{this.props.subCategories.map(e=>
							<div key={e.name}>
								<label htmlFor={e.name} onClick={()=>this.handleSubCategory(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="retailers" id={e.name} type="radio"/>
									<div>{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "shops":
				return (
					<div className="filter-choices">
						<label htmlFor="all6" onClick={()=>this.handleShop('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="shops" id={"all6"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.shops.length==0&&"Выберите розничную сеть"}

						{this.props.shops.map(e=>
							<div key={e.name}>
								<label htmlFor={e.name} onClick={()=>this.handleShop(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="shops" id={e.name} type="radio"/>
									<div>{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "users":
				return (
					<div className="filter-choices">
						<label htmlFor="all7" onClick={()=>this.handleUser('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="users" id={"all7"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.users.map(e=>
							<div key={e.username}>
								<label htmlFor={e.username} onClick={()=>this.handleUser(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="users" id={e.username} type="radio"/>
									<div>{e.username}</div>
								</label>
							</div>
						)}
					</div>
					)
			case "brands":
				return (
					<div className="filter-choices">
						<label htmlFor="all8" onClick={()=>this.handleBrand('clear')} >
							<input readOnly onClick={(e)=>e.stopPropagation()} name="brands" id={"all8"} type="radio"/>
							<div>Все</div>
						</label>
						{this.props.brands.map(e=>
							<div key={e.name}>
								<label htmlFor={e.name} onClick={()=>this.handleBrand(e.id)}>
									<input checked={checked==e.id?true:false} readOnly onClick={(e)=>e.stopPropagation()} name="brands" id={e.name} type="radio"/>
									<div>{e.name}</div>
								</label>
							</div>
						)}
					</div>
					)
			default:
				return <div>default</div>
		}
	}
	render() {
		// console.log("йцу", this.props.isActive)

		// console.log("DATE", new Date(prevday*1000))
		
		return (
			<div style={{width:'100%', marginTop:'8px'}}>
				<div onClick={()=>this.setState({toShow:!this.state.toShow})} className="filter-option">
					<div className="radio-menu" style={{width:'15%', textAlign:'center'}}>
						<input type="radio" id={this.props.title} readOnly checked={this.props.isActive&&"true"}/>
						<label htmlFor={this.props.title}></label>
					</div>
					<div style={{width:'70%', padding:'0 2px', fontSize:'0.95em'}}>{this.props.title}</div>
					<div style={{width:'10%', textAlign:'right'}}> 
						<i className={this.state.toShow?"fa fa-caret-up":"fa fa-caret-down"} style={{color:'#ffc333', fontSize:'1.2em'}}/>
					</div>
				</div>
				{this.state.toShow&&this.ShowFilterInner(this.props.type)}
				
			</div>


		);
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    cities: state.cities.cities,
    subCategories:state.categories.subcategories,
    shops:state.shops.shops,
    triggered:state.appliedFilters.triggered
    // filters:state.filters

  };
}
export default connect(mapStateToProps)(Filter);
