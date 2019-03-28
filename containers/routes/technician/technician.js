import React, { Component } from 'react'
import { connect } from 'react-redux'
import Barcode from 'react-barcode'
import * as actions from '../../../actions'
import * as utils from '../../../components/functions/functions'
import moment from 'moment'
import Panel from './panel'
import Items from './items'
import TechItems from './techItems'

class Technician extends Component {
	state={tab:0}
	componentWillMount() {
			this.props.dispatch(actions.getSchedules(this.props.user.user_id, this.props.token))
			this.props.dispatch(actions.getTechnicianItems(this.props.user.user_id, this.props.token))
    		this.props.dispatch(actions.getSuppliers(this.props.token))

			
		}
	componentWillReceiveProps(nextProps) {

	}
	componentDidMount() {
		(this.props.user.role==7||this.props.user.role==6)&&this.setState({tab:1})

	}
	render() {

		const {user, token, schedules, items} = this.props
		const {tab} = this.state
		return (
			<div className="d-flex" style={{background:'#fff', height:'100%'}}>
				<div style={{width:'35%', borderRight:'1px solid #e2e2e2'}}>
					<div className="d-flex justify-content-center align-items-center flex-column" style={{borderBottom:'1px solid #e2e2e2', paddingBottom:15}}>
						<div style={{fontSize:'1.3rem', color:'#929292', padding:'15px 0 5px 0'}}>USER:</div>
						<div style={{fontSize:'1rem', fontWeight:500, textTransform:'uppercase'}}>{`${user.first_name} ${user.last_name}`}</div>
					</div>

					<div>
						{
							schedules.length>0&&schedules.map((e,i)=> (
							<Panel item={e} key={i} index={i}/>
							
						))
						}
					</div>
				</div>
				<div style={{width:'100%', padding:15}} className="d-flex flex-column align-items-start">
					<div className="d-flex" style={{marginTop:-15, marginBottom:15, border:'1px solid #ddd'}}>
						{user.role!==7&&user.role!==6&&<div 
							className="item-choice" 
							onClick={()=>this.setState({tab:0})}
							style={{borderBottom:tab==0&&'2px solid #23b9ec', color:tab==0&&'black'}}>STOCK ITEMS</div>}
						<div 
							className="item-choice" 
							onClick={()=>this.setState({tab:1})}
							style={{borderBottom:tab==1&&'2px solid #23b9ec', color:tab==1&&'black'}}>{user.role==7?`DRIVER ITEMS`:`TECHNICIAN ITEMS`}</div>
					</div>
					{tab==0&&<Items/>}
					{tab==1&&<TechItems/>}

				</div>
			</div>
		)
	}
}
const mapStateToProps=(state)=>{
  return {
    token: state.app.token,
    user:state.app.user,
    schedules:state.schedules.schedules,
  };
}
export default connect(mapStateToProps)(Technician);
