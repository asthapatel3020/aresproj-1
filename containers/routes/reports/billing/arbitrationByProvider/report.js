import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as utils from '../../../../../components/functions/functions'
class Report extends Component {
  render() {
    const {procedures } = this.props.report
    console.log('rendered')
    return (
      <div >
          <div style={{textAlign:'center', marginBottom:15}}>
            <div style={{fontSize:'1.4rem', fontWeight:500}}>ARBITRATION</div>
            <div style={{fontSize:'1rem', fontWeight:500}}>BY LAWYER</div>
            
          </div>
        
          <div>
            <table className="normal-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient name</th>
                  <th>Insurance</th> 
                  <th>Billing dt.</th>
                  <th>Billing period</th>
                  <th>Billed $</th>
                  <th>Paid $</th>
                  <th>Bad. Dbt $</th>
                  <th>Balance</th>
                </tr>
              </thead>
              
                {
                procedures.map((n,j)=> {
                  console.log('PROCED', n)
                  return <tbody key={`999${j}`}>
                    <tr >
                      <th style={{fontWeight:500, fontSize:'0.9rem'}}>{n[0].office_name}</th>
                    </tr>
                      {
                        n.map((e,i)=> {
                          console.log('PROCEDN', e)
                          return <tr key={i}>
                            <th>{e.patient_id}</th>
                            <th>{`${e.patient_last_nm}, ${e.patient_first_nm}`}</th>
                            <th>{`${e.ic_name}(${e.ic_address})`}</th>
                            <th>{utils.convertDate(e.billing_dt)}</th> 
                            <th>billing period</th> 
                            <th>{e.limit_pc_charge}</th>
                            <th>{e.paid_am}</th>
                            <th>bad dbt</th>
                            <th>{e.pc_charge}</th>
                            
                          </tr>
                        })
                      }
                    </tbody>
                    })
                  }
              
              
            </table>
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