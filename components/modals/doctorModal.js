import React, {Component} from 'react';
import {Link} from 'react-router';
import * as actions from '../../actions';
import { connect } from "react-redux";
import GraphicByDoctor from '../../containers/routes/graphics/graphicByDoctor'
import BarChart from '../../components/charts/horizontalBarChart';

class DoctorModal extends Component  {
	constructor(props) {
        super(props);

        this.setWrapperRef = this.setWrapperRef.bind(this);           
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    
	state={currentDoc:'Berkowitz, Dov'}
	componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
	setWrapperRef(node) {
        this.wrapperRef = node;
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
        	setTimeout(() => {
			  this.props.closeModal()
			}, 200);

        	
        }
    }


	componentWillMount() {
		// this.props.dispatch(actions.getGraphic('Berkowitz, Dov'))
		// this.props.dispatch(actions.getInfo())
		// this.props.dispatch(actions.getInfoEquip())
		// this.props.dispatch(actions.getCommentsBrand(this.props.token, this.props.id, this.props.filters, 1))
		
	}
					// 

	
	render() {
		const {piechart, comments} = this.props;
		let doctorNames = []
		console.log("JOJO", this.props)

		this.props.doctors.map(e=>doctorNames.push(e.doctor))
		return (
			<div ref={this.setWrapperRef}>
				<div className="route-wrapper" style={{marginBottom:'2%', padding:'2%'}}>
					<div style={{textAlign:'center', fontSize:'2em'}}>{this.props.modalDoc}</div>
					{this.props.docEquip.map(e=>{
						return (
							<div key={e.name}>

							{e.equip.length>0&&<span style={{color:'#148ffc', fontWeight:'600'}}>{e.name}:</span>}
							{e.equip.map(t=>{
								return <div key={t.equipment} style={{paddingLeft:5}}>{t.equipment}:{' '}<b>{t.quantity}</b></div>
							})}
							</div>
						)
						
					})}
					<br/>
					{this.props.docInfo.length>0&&<BarChart 
		              data={this.props.docInfo} 
		              // data={arr}
		            />}
		           
				</div>



			</div>
		)
	}
}
function mapStateToProps(state) {
  return {
    token:state.app.token,
    id:state.app.id,
    filters: state.appliedFilters,
    comments:state.comments,
    doctor:state.reports.doctor,
    doctors:state.reports.doctors,
    initialDoctors:state.reports.initialDoctors,
    docInfo:state.reports.doctorInfo,
    equip:state.reports.equip,
    docEquip:state.reports.docEquip

  };
}

export default connect(mapStateToProps)(DoctorModal);

