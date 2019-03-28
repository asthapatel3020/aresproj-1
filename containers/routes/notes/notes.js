import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchNotes from './searchNotes'
import EditNotes from './editNotes'
import * as actions from '../../../actions'

class Notes extends Component {
	state={tab:0}
	componentWillMount() {
		this.props.dispatch(actions.getSubjects(this.props.token))
	}
	render() {
		const {tab} = this.state
		const {subjects, token, notes, note, users} = this.props
		return (
			<div style={{background:'#fff', height:'100%'}} >
				<div style={{width:'100%', padding:15}} className="d-flex flex-column align-items-start">
					<div className="d-flex" style={{marginTop:-15, marginBottom:15, border:'1px solid #ddd'}}>
						<div 
							className="item-choice" 
							onClick={()=>this.setState({tab:0})}
							style={{borderBottom:tab==0&&'2px solid #23b9ec', color:tab==0&&'black'}}>SEARCH</div>
						<div 
							className="item-choice" 
							onClick={()=>this.setState({tab:1})}
							style={{borderBottom:tab==1&&'2px solid #23b9ec', color:tab==1&&'black'}}>NOTES</div>
					</div>
					{tab==0&&<SearchNotes subjects={subjects} notes={notes} token={token} changeTab={()=>this.setState({tab:1})}/>}
					{tab==1&&<EditNotes token={token} subjects={subjects} note={note} users={users}/>}

				</div>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    patient:state.patient.patient,
    token:state.app.token,
    subjects:state.notes.subjects,
    notes:state.notes.notes,
    users:state.users.users

  };
}
export default connect(mapStateToProps)(Notes);