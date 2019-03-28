import React, { Component } from 'react'
import Menu, {SubMenu, MenuItem, MenuItemGroup, Divider} from 'rc-menu'
import 'rc-menu/assets/index.css'
import * as actions from '../../actions'

class MenuComponent extends Component  {
	render () {
		const {router, role} = this.props;
		console.log('this.PROPS', this.props)
	return <div>
		
				<Menu 
					mode="horizontal" 
					style={{fontSize:'1rem'}}
					// subMenuOpenDelay={0.5}
					subMenuCloseDelay={0.4}
					ref={el=> (this.menu = el)}
					onClick={()=>this.menu.store.setState({ openKeys: [] })}>

					{role!==6&&role!==7&&<MenuItem key="1" onClick={()=>router.push('/patient/search')}><div className="main-menuitem">PATIENT</div></MenuItem>}
					<MenuItem key="2" onClick={()=>router.push('/technician')}><div className="main-menuitem">{role==7?`DRIVER`:`TECHNICIAN`}</div></MenuItem>
					{role!==6&&role!==7&&<MenuItem key="3" onClick={()=>router.push('/notes')}><div className="main-menuitem">NOTES</div></MenuItem>}

					{role!==6&&role!==7&&<SubMenu id="main-submenu" title={<span>ADMIN</span>} key="4" popupOffset={[-15, 20]}>
					    <MenuItem key="4-1" onClick={()=>this.props.openModal(1)}>Attorney(Company)</MenuItem>
					    <Divider/>
					    <MenuItem key="4-2" onClick={()=>this.props.openModal(2)}>Company info</MenuItem>
					    <Divider/>
						<MenuItem key="4-3" onClick={()=>this.props.openModal(3)}>Bill Status</MenuItem>
					    <Divider/>
						{/*<MenuItem key="4-4" onClick={()=>this.props.openModal(4)}>Company</MenuItem>
					    <Divider/>*/}
					    <MenuItem key="4-5" onClick={()=>this.props.openModal(5)}>City</MenuItem>
					    <Divider/>
					    {/*<MenuItem key="4-6" onClick={()=>this.props.openModal(6)}>Diagnosis Code</MenuItem>
					    <Divider/>*/}
					    {/*<MenuItem key="4-7" onClick={()=>this.props.openModal(7)}>Doctor</MenuItem>
					    <Divider/>*/}
					    <MenuItem key="4-8" onClick={()=>this.props.openModal(8)}>Document Type</MenuItem>
					    <Divider/>
					    <MenuItem key="4-9" onClick={()=>this.props.openModal(9)}>Employee Status</MenuItem>
					    <Divider/>
					    <MenuItem key="4-10" onClick={()=>this.props.openModal(10)}>Providers</MenuItem>
					    <Divider/>
					    {/*<MenuItem key="4-11" onClick={()=>this.props.openModal(11)}>Map Visit</MenuItem>
					    <Divider/>
					    <MenuItem key="4-12" onClick={()=>this.props.openModal(12)}>MRI Codes</MenuItem>
					    <Divider/>
					    <MenuItem key="4-13" onClick={()=>this.props.openModal(13)}>NF-2 Status</MenuItem>*/}
					    {role==0&&<Divider/>}
					    {role==0&&<MenuItem key="4-14" onClick={()=>this.props.openModal(14)}>Add schedule for driver</MenuItem>}
					    {role==0&&<Divider/>}
					    {role==0&&<MenuItem key="4-15" onClick={()=>this.props.router.push('/delivery_reports')}>Delivery reports</MenuItem>}
					    {role==0&&<Divider/>}
					    {role==0&&<MenuItem key="4-16" onClick={()=>this.props.openModal(16)}>Create user</MenuItem>}
					    {role==0&&<Divider/>}
					    {role==0&&<MenuItem key="4-17" onClick={()=>this.props.openModal(17)}>Create line</MenuItem>}
					    {role==0&&<Divider/>}
					    {role==0&&<MenuItem key="4-18" onClick={()=>this.props.openModal(18)}>Create supplier</MenuItem>}
					    
					    
					</SubMenu>}
				  	{role!==6&&role!==7&&<SubMenu id="main-submenu" title={<span>REPORTS</span>} key="5" popupOffset={[-15, 20]}>
						<SubMenu key="5-1" title="Billing" id="custom-submenu">
						 <MenuItem key="5-1-1" onClick={()=>this.props.dispatch(actions.openReportsModal(1))}>Payments by provider</MenuItem>
					    <Divider/>
						 <MenuItem key="5-1-2" onClick={()=>this.props.dispatch(actions.openReportsModal(2))}>Patient billing history</MenuItem>
					    <Divider/>
						 <MenuItem key="5-1-3" onClick={()=>this.props.dispatch(actions.openReportsModal(3))}>Billing by provider</MenuItem>
					    <Divider/>
						 <MenuItem key="5-1-4" onClick={()=>this.props.dispatch(actions.openReportsModal(4))}>Payment register</MenuItem>
					    <Divider/>
						 <MenuItem key="5-1-5" onClick={()=>this.props.dispatch(actions.openReportsModal(5))}>Arbitration by provider</MenuItem>
						</SubMenu>
					    <Divider/>
						<MenuItem key="5-2">Notes</MenuItem>
					    <Divider/>
						<SubMenu key="5-3" title="Patient" id="custom-submenu">
						 <MenuItem key="5-3-1" onClick={()=>this.props.dispatch(actions.openReportsModal(6))}>List of patients</MenuItem>
					    <Divider/>
						 <MenuItem key="5-3-2" onClick={()=>this.props.dispatch(actions.openReportsModal(7))}>Without pickup</MenuItem>
					    <Divider/>
						 <MenuItem key="5-3-3" onClick={()=>this.props.dispatch(actions.openReportsModal(8))}>Ready for billing</MenuItem>
					    <Divider/>
						 <MenuItem key="5-3-4" onClick={()=>this.props.dispatch(actions.openReportsModal(9))}>Active patient w/out Insurance info.</MenuItem>
					    <Divider/>
						 <MenuItem key="5-3-5" onClick={()=>this.props.dispatch(actions.openReportsModal(10))}>Activity table</MenuItem>
						</SubMenu>
					    <Divider/>
						<MenuItem key="5-4">Proof of mailing</MenuItem>
						
					</SubMenu>}
				</Menu>
			</div>
	}
	
}

export default MenuComponent