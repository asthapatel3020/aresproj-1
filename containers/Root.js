import React, { Component } from "react";
import { Provider } from "react-redux";
import { Router, Route, Link, browserHistory, IndexRoute } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import { hot } from 'react-hot-loader'
// import configureStore from "../store/configureStore";

// import Landing from "./Landing";
// import Signup from "./Signup";

import App from "./App";
import Startpage from "./startpage";
import PatientSearch from "./routes/patient/patientSearch";
import Technician from "./routes/technician/technician";
import Notes from "./routes/notes/notes";
import DeliveryReports from './routes/admin/deliveryReports/reports'

var shallowCompare = require("react-addons-shallow-compare");

class Root extends Component {
  state={history:syncHistoryWithStore(browserHistory, this.props.store)}
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  componentDidMount() {
    const store = this.props.store
    const history = syncHistoryWithStore(browserHistory, store);
    this.setState({history:history})
  }
  render() {

    return (
      <Provider store={this.props.store}>
        <Router 
          key={Math.random()} 
          onUpdate={() => window.scrollTo(0, 0)} 
          history={this.state.history}>
          <Route path="/" component={App}>
            <IndexRoute
              component={Startpage}
              pageName="Main"
              pageDescription="mainpage"
            />
            <Route
              component={PatientSearch}
              pageName="patientSearch"
              pageDescription="patientSearch"
              path="/patient/search"
            />

            <Route
              component={Technician}
              pageName="patientSearch"
              pageDescription="patientSearch"
              path="/technician"
            />

            <Route
              component={Notes}
              pageName="notes"
              pageDescription="patientSearch"
              path="/notes"
            />
            
            <Route
              component={DeliveryReports}
              pageName="notes"
              pageDescription="patientSearch"
              path="/delivery_reports"
            />

          </Route>

        </Router>
      </Provider>
    );
  }
}
export default hot(module)(Root)