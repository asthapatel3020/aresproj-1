import "babel-polyfill";
import React from 'react';
import ReactDom from 'react-dom';
import Root from './containers/Root';
import configureStore from './store/configureStore'

const store = configureStore();

ReactDom.render(
	<Root store={store}/>,
  document.getElementById('wrapperContainer')
);