import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as utils from '../../../../../components/functions/functions'
class Report extends Component {
  render() {
    const {billing_history } = this.props.report
    return (
      <div >
          <div style={{textAlign:'center', marginBottom:15}}>
            <div style={{fontSize:'1.4rem', fontWeight:500}}>PATIENT BILLING HISTORY</div>
            <div style={{fontSize:'1rem', fontWeight:500}}>BY PROVIDER</div>
            <div style={{textTransform:'uppercase', fontWeight:500, fontSize:'1.1rem', marginTop:10}}>
              {`${billing_history.length>0&&billing_history[0].patient_last_nm}, ${billing_history.length>0&&billing_history[0].patient_first_nm}`}
            </div>
          </div>
        
          <div>
            <table className="normal-table">
              <thead>
                <tr>
                  <th>Bill #</th>
                  <th>Billing date</th> 
                  <th>Visit type</th>
                  <th>Billing period</th>
                  <th>Billed $</th>
                  <th>Paid $</th>
                  <th>DECO fee</th>
                  <th>Write-off</th>
                  <th>Att. fee</th>
                  <th>Balance</th>
                </tr>
              </thead>
              <tbody>
                {
                billing_history.map((e,i)=> {
                  return <tr key={i}>
                    <th>{e.bill_id}</th>
                    <th>{utils.convertDate(e.billing_dt)}</th> 
                    <th>{e.visit_type_nm}</th>
                    <th>period</th>
                    <th>{e.billed_am}</th>
                    <th>0.00</th>
                    <th>{e.deductable_am}</th>
                    <th>{e.write_off_am}</th>
                    <th>{e.lien_am}</th>
                    <th>{e.paid_am}</th>
                  </tr>
                    })
                  }
              </tbody>
              
            </table>
          </div>

          <div style={{marginTop:15}} className="d-flex justify-content-between">
            <div className="d-flex">
              <div style={{marginRight:10}}>Insurance:</div>
              <div style={{fontWeight:500}}>
                {billing_history.length>0&&billing_history[0].ic_name} 
                <br/>
                {billing_history.length>0&&billing_history[0].ic_address} 
                <br/>
                {billing_history.length>0&&`${billing_history[0].ic_city},${billing_history[0].ic_state} ${billing_history[0].ic_zip} `} 
              </div>
            </div>

            <div>
              <div>
                Claim No: 
                <span style={{fontWeight:500}}>{` ${billing_history.length>0&&billing_history[0].ins_claim_num}`}</span>
              </div>
              <div>
                Policy No:
                <span style={{fontWeight:500}}>{` ${billing_history.length>0&&billing_history[0].ins_policy_num}`}</span>
              </div>
            </div>
          </div>
      </div>
    )
  }
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    report:state.reports.report
  };
}
export default connect(mapStateToProps)(Report);