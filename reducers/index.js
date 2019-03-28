
import { routerStateReducer } from 'redux-react-router';
// import { combineReducers } from 'redux';
import app from './app';
import loading from './reducers/loading'
import patients from './reducers/patients'
import patient from './reducers/patient'
import services from './reducers/services'
import treatingProviders from './reducers/treatingProviders'
import treatments from './reducers/treatments'
import filters from './reducers/filters'
import codes from './reducers/codes'
import billing from './reducers/billing'
import attorney from './reducers/attorney'
import payments from './reducers/payments'
import insCompanies from './reducers/insCompanies'
import offices from './reducers/offices'
import alert from './reducers/alert'
import specialties from './reducers/specialties'
import items from './reducers/items'
import users from './reducers/users'
import schedules from './reducers/schedules'
import notes from './reducers/notes'
import paymentsCollections from './reducers/paymentsCollections'
import billStatuses from './reducers/billStatuses'
import city from './reducers/city'
import documents from './reducers/documents'
import claimTypes from './reducers/claimTypes'
import company from './reducers/company'
import insurances from './reducers/insurances'
import suppliers from './reducers/suppliers'
import reports from './reducers/reports'

export default {
	router: routerStateReducer,
	app,
	loading,
	patients,
	patient,
	services,
	treatingProviders,
	treatments,
	filters,
	codes,
	billing,
	attorney,
	payments,
	insCompanies,
	offices,
	alert,
	specialties,
	items,
	users,
	schedules,
	notes,
	paymentsCollections,
	billStatuses,
	city,
	documents,
	claimTypes,
	company,
	insurances,
	suppliers,
	reports

}