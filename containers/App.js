import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Login from './login';
import * as actions from '../actions';
import { bindActionCreators } from "redux";
import { fetchMe, auth, signup, logout, isAuthenticated } from '../actions';
import Footer from './footer'
// import Loading from 'react-loading-bar'
import Loading from '../components/widgets/loading'
import ModalFactory from '../components/modals/factory'
import Lawyer from './routes/admin/attorney/Lawyer'
import LawyerPatient from './routes/admin/attorneyPatient/Lawyer'
import BillStatuses from './routes/admin/billStatus/billStatus'
import Alert from '../components/widgets/alert'
import Schedule from './routes/admin/schedule/schedule'
import Item from './routes/admin/item/item'
import CreateUser from './routes/admin/createUser/createUser'
import CreateLine from './routes/admin/line/createLine'
import CreateSupplier from './routes/admin/supplier/createSupplier'
import City from './routes/admin/city/city'
import Docs from './routes/admin/documentTypes/documentTypes'
import CompanyInfo from './routes/admin/company/company'
import Providers from './routes/admin/providers/providers'
import Reports from './routes/reports/reports'
class App extends Component {
  state={
    state1:false,
    state2:false,
    state3:false,
    state4:false,
    state5:false,
    state6:false,
    state7:false,
    state8:false,
    state9:false,
    state10:false,
    state11:false,
    state12:false,
    state13:false,
    state14:false,
    state15:false,
    state16:false
  }
  componentDidMount() {
    
     // console.log('didmount', this.props)
    this.props.token&&this.props.dispatch(actions.getAttornies(this.props.token))
    this.props.token&&this.props.dispatch(actions.getProviderList(this.props.token)) 
    this.props.token&&this.props.dispatch(actions.getItems(this.props.token)) 
    this.props.token&&this.props.dispatch(actions.getUsers(this.props.token))
    this.props.token&&this.props.dispatch(actions.getBillStatuses(this.props.token))
    this.props.token&&this.props.dispatch(actions.getDocs(this.props.token))
    this.props.token&&this.props.dispatch(actions.getClaimTypes(this.props.token))
    this.props.token&&this.props.dispatch(actions.getCities(this.props.token))
    this.props.token&&this.props.dispatch(actions.getSchedules(1, this.props.token))
    this.props.token&&this.props.dispatch(actions.getProviderList(this.props.token))
    this.props.token&&this.props.dispatch(actions.getCompanyInfo(this.props.token))
    this.props.token&&this.props.dispatch(actions.getSubjects(this.props.token))
    this.props.token&&this.props.dispatch(actions.getSuppliers(this.props.token))
    this.props.token&&this.props.dispatch(actions.getOffices(this.props.token))
    this.props.token&&this.props.dispatch(actions.getServiceList(this.props.token))
    this.props.token&&this.props.dispatch(actions.getTreatmentsList(this.props.token))

    

  }
  componentWillMount() {
    this.props.dispatch(actions.isLoggedIn())
    

  }
  // componentDidUpdate(nextProps) {
  //   nextProps.dispatch(actions.isLoggedIn())
  // }
  componentWillReceiveProps(nextProps) {

    console.log('nextprops',nextProps)
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getAttornies(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getProviderList(nextProps.token)) 
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getItems(nextProps.token)) 
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getUsers(nextProps.token)) 
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getSchedules(1, nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getProviderList(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getSuppliers(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getSubjects(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getCompanyInfo(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getBillStatuses(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getDocs(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getClaimTypes(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getCities(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getOffices(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getServiceList(nextProps.token))
    this.props.token!==nextProps.token&&nextProps.dispatch(actions.getTreatmentsList(nextProps.token))


    // nextProps.token&&nextProps.dispatch(actions.getAttornies(nextProps.token))
    // nextProps.token&&nextProps.dispatch(actions.getProviderList(nextProps.token))  
  }
  onUnload(){
    this.props.router.push('/')
  }
  openModal(modal) {
    this.setState({[`state${modal}`]:true})
  }
  closeModal(modal, withoutAlert) {
    console.log('without', withoutAlert)
    if (withoutAlert=='noalert') {
      this.setState({[`state${modal}`]:false})

    } else {
      if (window.confirm('Are you sure you want to close the window?')) {
        this.setState({[`state${modal}`]:false})
      }
    }
    
  }
  onLogin(e) {
    this.props.dispatch(actions.signIn(e.login,e.password))
  }
  render() {
    const { location, children, dispatch, loggedIn, alert } = this.props;
    const { pathname } = location;
    const value = pathname.substring(1);
    console.log("propsapptoshow", this.props.isLoading)
    
     
        if (!loggedIn) {

          return <div>
            {/*<Loading
              show={this.props.isLoading}
              color="#1172d6"
              showSpinner={true}
            />*/}
            <Loading showLoader={this.props.isLoading}/>}
            <Login onSubmit={(e)=>this.onLogin(e)}/>
          </div>
        }
        else {

          return <div className="vbox container-fluid">
            <Lawyer open={this.state.state1} onClose={(e)=>this.closeModal(e)}/>
            <BillStatuses open={this.state.state3} onClose={(e)=>this.closeModal(e)}/>
            <Item open={this.state.state15} onClose={(e)=>this.closeModal(e)}/>
            <Schedule open={this.state.state14} onClose={(e, s)=>this.closeModal(e, s)}/>
            <CreateUser open={this.state.state16} onClose={(e, i)=>this.closeModal(e, i)}/>
            <CreateLine open={this.state.state17} onClose={(e, i)=>this.closeModal(e, i)}/>
            <CreateSupplier open={this.state.state18} onClose={(e, i)=>this.closeModal(e, i)}/>
            <City open={this.state.state5} onClose={(e)=>this.closeModal(e)}/>
            <CompanyInfo open={this.state.state2} onClose={(e)=>this.closeModal(e)}/>
            <Providers open={this.state.state10} onClose={(e)=>this.closeModal(e)}/>
            <Docs open={this.state.state8} onClose={(e)=>this.closeModal(e)}/>
            <Alert open={alert.openState} msg={alert.msg}/>
            <Loading showLoader={this.props.isLoading}/>
            <Reports />
            <div className="row">
                <section className="hbox stretch" style={{width:'100%', background:'#f3f4f8'}}>
                    
                    <section id="content">
                      <Header 
                        router={this.props.router} 
                        location={this.props.router.location.pathname}
                        dispatch={this.props.dispatch} 
                        openModal={(e)=>this.openModal(e)}/>
                      <div className="row"
                      >
                      
                        
                      </div>
                      {/*
                        <div className="footer" >
                          <Footer />
                      </div>
                      */}
                    </section>
                </section>
            </div>
          </div>

      }      
    
  }
}

const mapStateToProps=(state)=>{
  return {
    loggedIn: state.app.loggedIn,
    token: state.app.token,
    isLoading: state.loading.loading,
    alert:state.alert
  };
}
// const mapDispatchToProps = dispatch => ({
//     actions: bindActionCreators(actions, dispatch)
// });
export default connect(mapStateToProps)(App);