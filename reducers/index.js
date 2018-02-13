
import { routerStateReducer } from 'redux-react-router';
import { combineReducers } from 'redux';

// Outlet reducers

import ReduxOutlet from '../outlets/ReduxOutlet';
import LocalReduxOutlet from '../outlets/LocalReduxOutlet';

// custom reducers

import app from './app';
import countries from './reducers/countries';
import country from './reducers/country';
import loading from './reducers/loading';
import cities from './reducers/cities';
import city from './reducers/city';
import users from './reducers/users';
import retailers from './reducers/retailers';
import retailer from './reducers/retailer';
import matrix from './reducers/matrix';
import shops from './reducers/shops';
import categories from './reducers/categories';
import shop from './reducers/shop';
import questions from './reducers/questions';
import question from './reducers/question';
import brands from './reducers/brands';
import questionsOther from './reducers/questionsOther';
import user from './reducers/user';
import questionOther from './reducers/questionOther';
import filters from './reducers/filters';
import appliedFilters from './reducers/appliedFilters';
import reports from './reducers/reports';
import comments from './reducers/comments';
import modal from './reducers/modal';
import downloadMatrix from './reducers/downloadMatrix';
import questionStats from './reducers/questionStats';

export default {
	router: routerStateReducer,
	app,
	user,
	countries,
	country,
	loading,
	cities,
	city,
	users,
	retailers,
	retailer,
	matrix,
	shops,
	categories,
	shop,
	questions,
	question,
	brands,
	questionsOther,
	user,
	questionOther,
	filters,
	appliedFilters,
	reports,
	comments,
	modal,
	downloadMatrix,
	questionStats
}