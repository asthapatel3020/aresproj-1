import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../../components/ui/Input'
class StatusData extends Component {

	
	render() {
		const {sDataType} = this.props
		
		return (
			<div className="col-md-5 signup-steps offset-md-1 d-flex flex-column" >
					<div className="row align-items-center no-gutters" style={{padding:'0 2rem', height:'15%', backgroundColor:'#edb533', width:'100%', color:'#fff', fontSize:'1rem', fontWeight:'600'}}>
						<div className="col-12">ЭТАПЫ РЕГИСТРАЦИИ</div>
					</div>
					<div className="d-flex justify-content-center " style={{padding:'2rem 0', width:'65%', margin:'0 auto'}}>
						{
							sDataType==1?
							<img src="../../../dist/images/step1.png" alt=""  style={{width:'100%', height:'100%'}}/>:
							sDataType==2?
							<img src="../../../dist/images/step2.png" alt="" style={{width:'100%', height:'100%'}}/>:
							<img src="../../../dist/images/step3.png" alt="" style={{width:'100%', height:'100%'}}/>
						}
					</div>
						<div style={{padding:'0 2rem', fontSize:'0.9rem'}}>
						<div className="signup-status row" >
							<div className="col-1">
								<i className="far fa-check-circle" style={{fontSize:'1.3rem', color:sDataType>=2&&'#7ddec7'}}></i>
							</div>
							<div className="col-8 offset-md-1" style={{color:sDataType>=2&&'black'}}>Контактные данные</div>
						</div>
						<div className="signup-status row">
							<div className="col-1">
								<i className="far fa-check-circle" style={{fontSize:'1.3rem', color:sDataType>=3&&'#7ddec7'}}></i>
							</div>
							<div className="col-8 offset-md-1" style={{color:sDataType>=3&&'black'}}>Подтверждение телефона</div>
						</div>
						<div className="signup-status row">
							<div className="col-1">
								<i className="far fa-check-circle" style={{fontSize:'1.3rem', color:sDataType=="4"&&'#7ddec7'}}></i>
							</div>
							<div className="col-8 offset-md-1" style={{color:sDataType==4&&'black'}}>Основная информация</div>
						</div>
						
					</div>

					<div className="mt-auto" style={{borderTop:'1px solid #edb533', padding:'1rem 1rem'}}>
							<p style={{color:'#8e8c8c'}}>
								- Пожалуйста заполните всю информацию для завершения регистрации.
								<br/> <br/>
								- НЕ ОБНОВЛЯЙТЕ СТРАНИЦУ ПОКА НЕ ЗАВЕРШИТЕ РЕГИСТРАЦИЮ!

							</p>
					</div>
			</div>	
		)
	}
}
export default StatusData