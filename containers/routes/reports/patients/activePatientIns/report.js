import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as utils from '../../../../../components/functions/functions'
class Report extends Component {
  render() {
    const {patients } = this.props.report
    console.log('rendered')
    return (
      <div >
          <div style={{textAlign:'center', marginBottom:15}}>
            <div style={{fontSize:'1.4rem', fontWeight:500}}>List of Active Patients w/out Insurance Information</div>
            
          </div>
        
          <div>
            <table className="normal-table">
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Patient Name</th> 
                  <th>Home phone</th>
                  <th>Alternate phone</th>
                  <th>DOA</th>
                  <th>Days after DOA</th>
                </tr>
              </thead>
              <tbody >
                {
                patients.map((n,j)=> {
                  return  <tr key={j}>
                            <th>{n.patient_id}</th>
                            <th>{`${n.patient_last_nm}, ${n.patient_first_nm}`}</th>
                            <th>{utils.handlePhoneNumber(n.patient_home_phone)}</th>
                            <th>{utils.handlePhoneNumber(n.patient_alternate_phone)}</th> 
                            <th>{utils.convertDate(n.patient_date_of_accident)}</th> 
                            <th>{n.after_doa}</th>
                            
                          </tr>
                        })
                      
                    
                    
                  }
              </tbody>
              
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