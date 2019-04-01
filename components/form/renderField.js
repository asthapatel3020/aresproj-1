import React, { Component} from 'react';
import Multiselect from 'react-widgets/lib/Multiselect'
import 'react-widgets/dist/css/react-widgets.css'
import Select from "react-select";
import AsyncSelect from 'react-select/lib/Async'
import 'react-select/dist/react-select.css';
import { Field, formValueSelector} from 'redux-form'
import Dropzone from 'react-dropzone'
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import * as utils from '../../components/functions/functions'
import Checkbox from '@material-ui/core/Checkbox';
import { createTextMask} from 'redux-form-input-masks';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; 
import moment from 'moment'
import { connect } from 'react-redux';

const dateMask = createTextMask({
  pattern: '99/99/99'
})
// import Select from '../../components/ui/itemSelect'

export const renderTextarea = ({input, label, height, width, type, value, icon, fixedLabel, placeholder, style, meta: { touched, error, warning }}) => {
  console.log("icon", icon)
  return <div style={{marginTop:15}} className="d-flex">
    <div style={{color:'#565656', marginRight:10, fontWeight:500, fontSize:'1rem', minWidth:fixedLabel&&fixedLabel}} >{label}</div>
    <div style={{width:'100%'}}>
      <textarea 
        value={value} 
        autoComplete="off" 
        {...input} 
        className={touched&&error&&"invalid-input"} 
        placeholder={placeholder} 
        type={type} 
        style={{width:'100%', height:height?height:140, width:width?width:'100%', fontSize:'0.9rem', border:'1px solid #dfdfdf', padding:10}}/>
      {touched &&
        ((error && <div style={{color:'red', margin:'5px 0 8px 0'}}>{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
}
export const hidden =({input, value})=> {
  return <div></div>
}

export const renderField = ({input, label, type, icon, value, labelSize, style, placeholder,  meta: { touched, error, warning }}) => {
  return <div style={{marginTop:10, width:'100%'}}>
    <div style={{color:'#565656', fontWeight:500, fontSize:labelSize?labelSize:'1rem'}}>{label}</div>
    <div className={`${icon ? "iconic-input" : ""}`}>
      {icon&&<i className={icon}></i>}
      <input value={value} autoComplete="off" {...input} className={touched&&error&&"invalid-input"} placeholder={placeholder} type={type} style={style}/>
      {touched &&
        ((error && <div style={{color:'red', fontSize:'0.7rem'}}>{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
}

export const renderHorizontalField = ({input, noMargin, labelSize, disabled, label, type, value, icon, placeholder, style, fixedLabel,  meta: { touched, error, warning }}) => {
  console.log('renderDisab', disabled)
  return <div style={{marginTop:noMargin?0:15, textAlign:'right'}} className="d-flex align-items-center">
    <div style={{color:'#565656', whiteSpace:'nowrap', marginRight:10, fontWeight:500, fontSize:labelSize?labelSize:'1rem', minWidth:fixedLabel&&fixedLabel}} >{label}</div>
    <div className={`${icon ? "iconic-input" : ""}`} style={{width:'100%'}}>
      {icon&&<i className={icon}></i>}
      <input
         value={value} 
         autoComplete="off" 
         {...input} 
         className={'hinput'} 
         placeholder={placeholder} 
         type={type} 
         style={style}
         disabled={disabled}/>
      {touched &&
        ((error && <div style={{color:'red', margin:'5px 0 8px 0'}}>{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
}


// ARES COMPONENTS
export const renderInvisibleField = ({input, label, type, icon, value, isDate, placeholder, style, meta: { touched, error, warning }}) => {
  return <div>
      <input 
        value={value} 
        style={style}
        autoComplete="off" 
        // disabled={ isInitializedFromState ? "disabled" : false }
        {...input} 
        className={touched&&error?"invalid-input invis-input":'invis-input'} 
        placeholder={placeholder} 
        type={type}/>

      {touched &&
        ((error && <div style={{color:'red', margin:'5px 0 8px 0'}}>{error}</div>) ||
          (warning && <span>{warning}</span>))}
  </div>
}
const customStyles = base => ({
    height: 50,
});
const selectStyle1 = base => ({
    height: 50,
    width:100
});
export const tableSelect = ({input, label, type, icon, style,getAsyncPatients,  onSelect, disabled, myStyles,  placeholder, options, className, items, meta: { touched, error, warning }}) => {
  const { name, value, onBlur, onChange, onFocus } = input;
  return <div style={style}>
            <Select 
              value={value} 
              onChange={onChange} 
              // items={this.props.serviceList} 
              clearable={false}
              onBlur={() => onBlur(value)}
              onBlurResetsInput={false}
              disabled={disabled}
              options={options}
              menuPosition={'absolute'}
              menuPortalTarget={document.body}
              name={name} 
              styles={{control: myStyles?myStyles:customStyles, menuPortal: base => ({ ...base, zIndex: 9999 })}}
              placeholder={placeholder}
              menuPlacement={'bottom'}
              className={className}/>

              {touched &&
                ((error && <div style={{color:'red', fontSize:'0.7rem'}}>{error}</div>) ||
                  (warning && <span>{warning}</span>))}
          </div>
}
export const valueSelect = ({input, label, type, icon, style,  onSelect, disabled, myStyles,  placeholder, options, className, items, meta: { touched, error, warning }}) => {
  const { name, value, onBlur, onChange, onFocus } = input;
  return <div style={style}>
            <Select 
              value={value} 
              onChange={(e)=>{onChange(e); onSelect(e)}} 
              // items={this.props.serviceList} 

              disabled={disabled}
              options={options}
              menuPortalTarget={document.body}
              name={name} 
              styles={{control: myStyles?myStyles:customStyles}}
              placeholder={placeholder}
              className={className}/>

              {touched &&
                ((error && <div style={{color:'red', fontSize:'0.7rem'}}>{error}</div>) ||
                  (warning && <span>{warning}</span>))}
          </div>
}
export const asyncSelect = ({input, label, type, icon, style, getAsyncPatients, placeholder, options, className, items, meta: { touched, error, warning }}) => {
  const { name, value, onBlur, onChange, onFocus } = input;
  return <div style={style}>
            <Select 
              value={value} 
              onInputChange={(e)=>getAsyncPatients(e)}
              onChange={onChange} 
              // items={this.props.serviceList} 
              options={options}
              name={name} 
              styles={{control: customStyles}}
              placeholder={placeholder}
              className={className}/>

              {touched &&
                ((error && <div style={{color:'red', fontSize:'0.7rem'}}>{error}</div>) ||
                  (warning && <span>{warning}</span>))}
          </div>
}
// pricelist
export const renderServiceList =({fields, skillsList, classes, chooseService, currentService, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>chooseService(i)} 
                  style={{backgroundColor:currentService==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.bill_id`}  component={renderString} style={{fontWeight:600}}/>
                  </TableCell>
                  <TableCell className="tb-cell" style={{overflow:'visible'}}>
                    <Field name={`${e}.visit_type_id`}  className="select-top" placeholder={'Choose service'} component={tableSelect} options={options}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.visit_dt`}  isDate component={renderInvisibleField} style={{maxWidth:60}} {...dateMask}/>
                  </TableCell>
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}
export const renderPaymentEvents =({fields, skillsList, classes, deleteNote, currentService, options, utils, meta:{error}})=> {
    return <div>

      {fields.map((e, i)=>{
        return <div 
                  key={i} 
                  // className={classes.row} 
                  // onClick={()=>chooseService(i)} 
                  // style={{backgroundColor:currentService==i&&'#cff3ff'}}
                  >
                  <div className="d-flex">
                      <div className="tb-cell" style={{borderRight:'none'}}>
                        <div>Created at</div>
                        <Field name={`${e}.when_created`}  isDate component={renderInvisibleField}  {...dateMask}/>
                      </div>
                      <div className="tb-cell" style={{overflow:'visible', borderRight:'none'}}>
                        <div>Follow up</div>
                        <Field name={`${e}.when_to_do`}  isDate component={renderInvisibleField}  {...dateMask}/>
                      </div>
                      <div className="tb-cell" style={{overflow:'visible', borderRight:'none'}}>
                        <div>Done</div>
                        <Field name={`${e}.done_flag`}  component={tableSelect} options={[{value:'N', label:'No'}, {value:'Y', label:'Yes'}]}/>
                      </div>
                  </div>
                  <div className="d-flex"> 
                      <div className="tb-cell" style={{borderRight:'none'}}>
                        <div>Assigned to</div>
                        <Field name={`${e}.assigned_to`} component={renderInvisibleField} />
                      </div>
                      <div className="tb-cell" style={{overflow:'visible', borderRight:'none', width:'45%'}}>
                        <div>Type</div>
                        <Field name={`${e}.subject_id`}  component={tableSelect} options={options}/>
                      </div>

                  </div>

                  <div style={{marginLeft:10, marginTop:10}}>
                      <Field name={`${e}.event_short_text`} style={{fontSize:'0.8125rem'}}component={renderInvisibleField} />
                  </div>
                  <div>
                      <Field name={`${e}.event_description`} component={renderTextarea} height={50}/>
                  </div>
                  

                  <div 
                    style={{width:'100%', textAlign:'right', color:'gray', textDecoration:'underline', cursor:'pointer'}} 
                    onClick={()=>deleteNote(i)}>
                      delete note
                    </div>
                </div>
      }
      
        
      )}
    </div>
      
}

export const renderBillStatuses =({fields, skillsList, selectItem, currentItem, classes, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectItem(`${e}.bill_status_nm`, i)} 
                  style={{backgroundColor:currentItem==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.bill_status_nm`}  component={renderInvisibleField} />
                  </TableCell>
                   <TableCell className="tb-cell">
                    <Field name={`${e}.bill_status_description`}  component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell" style={{overflow:'visible'}}>
                    <Field name={`${e}.active_in`}   component={tableSelect} options={options}/>
                  </TableCell>
                  <TableCell> 
                    <Select
                      // defaultValue={colourOptions[0]}
                      isClearable
                      styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                      menuPortalTarget={document.body}
                      isSearchable
                      name="color"
                      menuPosition={'absolute'}
                      menuPlacement={'bottom'}
                      // options={colourOptions}
                    />
                  </TableCell>
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}

export const renderCities =({fields, skillsList, selectItem, currentItem, classes, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectItem(`${e}.city_id`, i)} 
                  style={{backgroundColor:currentItem==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.city_name`}  component={renderInvisibleField} />
                  </TableCell>
                   <TableCell className="tb-cell">
                    <Field name={`${e}.state`}  component={renderInvisibleField} />
                  </TableCell>
                 
                  
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}
export const renderDocs =({fields, skillsList, selectItem, currentItem, classes, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectItem(`${e}.doc_type_nm`, i)} 
                  style={{backgroundColor:currentItem==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.doc_type_id`}  component={renderInvisibleField} />
                  </TableCell>
                  
                 
                  
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}
export const renderTreatmentsList =({fields, skillsList, classes, selectTreatment, currentTreatment, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectTreatment(i)} 
                  style={{backgroundColor:currentTreatment==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_code`}  style={{maxWidth:45}} component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_code_description`}  style={{width:220}} component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_modifier`}  style={{width:32}} component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_charge`}  style={{width:50}} component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.units`}  style={{width:25}} component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.from_dt`}  style={{width:62}} component={renderInvisibleField}  {...dateMask}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.to_dt`}  style={{width:62}} component={renderInvisibleField}  {...dateMask}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.place_of_service`}  style={{width:30}} component={renderInvisibleField}  />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pickup_dt`}  style={{width:62}} component={renderInvisibleField} {...dateMask} />
                  </TableCell>
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}

export const renderDiagnosisCodes =({fields, skillsList, classes, selectCode, specialties, isPayments, currentCode, options, utils, meta:{error}})=> {
  
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectCode(i)} 
                  style={{backgroundColor:currentCode==i&&'#cff3ff'}}>

                  {!isPayments&&<TableCell className="tb-cell" style={{overflow:'visible'}}>
                    <Field name={`${e}.specialty_cd`}  style={{width:85}} options={specialties} component={tableSelect} />
                  </TableCell>}
                  <TableCell className="tb-cell">
                    <Field name={`${e}.dc_code`}  style={{width:55}} component={renderInvisibleField} />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.dc_code_description`}  style={{width:210}}  component={renderInvisibleField} />
                  </TableCell>
                
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}

const renderString=(field)=> {
  // console.log('ASD', field)
  return <span style={field.style}>{field.input.value}</span>
}
const renderNumString=(field)=> {
  // console.log('ASD', field)
  return <span style={field.style}>{utils.numberWithCommas(field.input.value)}</span>
}
const changeVal=(e)=> {
  e=!e
}
export const renderCheckBox=({ input, label })=> {
  console.log('ASD', input.value)
  // let val = input.value==null||input.value=='N'?false:true
  return <Checkbox
                    checked={input.value ? true : false}
                    onChange={input.onChange}
                    // value='billSwitch'
                    color="primary"
                  />
}
export const renderDiagnosisCodesPayment =({fields, skillsList, classes, chooseCode, currentCode, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>chooseCode(i)} 
                  style={{backgroundColor:currentCode==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.dc_code`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.dc_code_description`} component={renderString}/>
                  </TableCell>
                
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}

export const servicesToBill =({fields, skillsList, classes, chooseDetail, currentDetail, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  // onClick={()=>chooseDetail(i)} 
                  // style={{backgroundColor:currentDetail==i&&'#cff3ff'}}
                  >

                  <TableCell className="tb-cell">
                   <Field name={`${e}.bill_status_id`} component={renderCheckBox}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.visit_dt`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.visit_type_cd`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.office_name`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.billed_am`} component={renderString}/>
                  </TableCell>
                  
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}
export const renderBillDetail =({fields, skillsList, classes, chooseDetail, currentDetail, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>chooseDetail(i)} 
                  style={{backgroundColor:currentDetail==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.visit_dt`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.visit_type_cd`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_code`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_code_description`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_charge`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.units`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.dc_1`} component={renderCheckBox}/>
                    <Field name={`${e}.dc_2`} component={renderCheckBox}/>
                    <Field name={`${e}.dc_3`} component={renderCheckBox}/>
                    <Field name={`${e}.dc_4`} component={renderCheckBox}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.mod_1`}  style={{width:30}} component={renderInvisibleField}  />
                    <Field name={`${e}.mod_2`}  style={{width:50}} component={renderInvisibleField}  />
                  </TableCell>
                  
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}
export const renderBillingInfo =({fields, skillsList, classes, chooseBill, currentBill, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
        return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>chooseBill(i)} 
                  style={{backgroundColor:currentBill==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.bill_id`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.office_name`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.speciality_code`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.billed_am`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.billing_dt`}  style={{width:62}} component={renderInvisibleField}  {...dateMask}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.employment_in`} component={renderCheckBox}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.auto_accident_in`} component={renderCheckBox}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.other_accident_in`} component={renderCheckBox}/>
                  </TableCell>
                </TableRow>
      }
      
        
      )}
    </TableBody>
  )
}
export const renderDateTime = ({input, label, minTime, maxTime, type, icon, value,fontSize, isDate, placeholder, style, meta: { touched, error, warning }}) => {
  return <div>
      <div style={{color:'#565656', fontWeight:500, fontSize:fontSize?fontSize:'1rem'}}>{label}</div>
      <DatePicker
          // {...input}
          dateForm="MM/DD/YYYY"
          showTimeSelect
          dateFormat="LLL"
          timeCaption="time"
          timeIntervals={30}
          minTime={minTime?minTime:null}
          maxTime={maxTime?maxTime:null}
          minDate={new Date()}
          // maxDate={addMonths(new Date(), 5)}
          selected={input.value || null}
          onChange={input.onChange}
      />
      {touched && error && <span>{error}</span>}
  </div>
}

let Item = ({ e, i, fields, isRent, items }) => {
  console.log('JTEM', e, isRent)
  return <div key={i} className="d-flex align-items-center" style={{border:'1px solid #ccc9c9', padding:10, borderRadius:10, marginTop:10}}>
          <div style={{width:'55%'}}>
            <div className="d-flex align-items-end">
              <div style={{width:'70%', marginTop:10, marginRight:'1rem'}}>
                <div style={{fontWeight:500, fontSize:'0.9rem', color:'#565656'}}>Item:</div>
                <Field 
                  name={`${e}.item`}  
                  placeholder={'Select item'} 
                  component={tableSelect} 
                  // className="select-top"
                  options={items}/>
              </div>
              <div style={{width:'40px'}}>
                <Field 
                    name={`${e}.quantity`}  
                    type="text"
                    label='Quantity'
                    style={{width:'100%', padding:5}}
                    component={renderField} 
                    labelSize='0.9rem'
                  />
              </div>
              {isRent=='R'&&<div>SOOQA</div>}
          
            </div>

          </div>
          
    <div className="select-clear a-hover" onClick={()=>fields.remove(i)} style={{marginLeft:50, fontSize:'0.74rem', marginBottom:6}}>Remove</div>
  </div>
}
const selector = formValueSelector('addToInventoryForm')

Item = connect(
  (state, props) => ({

    isRent: selector(state, `${props}`)
  })
)(Item)
export const renderSkills =({fields, items, classes, chooseService, currentService, options, utils, meta:{error}})=> {
  return (
    <div>
      {fields.map((e, i)=>
        <Item e={e} fields={fields} items={items} key={i} i={i} /> 
      
      )}
      <div className="a-hover" style={{color:'grey', marginTop:10}} onClick={() => fields.push()}>Add item</div>
    </div>
      
  )
}
export const renderItemsWithoutDate =({fields, items, classes, chooseService, currentService, options, utils, meta:{error}})=> {
  return (
    <div>
      {fields.map((e, i)=>{
        return <div className="d-flex align-items-end" key={i}>
          <div style={{width:'25%', marginTop:10, marginRight:'1rem'}}>
            <div style={{fontWeight:500, fontSize:'0.9rem', color:'#565656'}}>Item:</div>
            <Field 
            name={`${e}.item`}  
            placeholder={'Select item'} 
            component={tableSelect} 
            // className="select-top"
            options={items}/>
          </div>
          <div style={{width:'30px'}}>
            <Field 
                name={`${e}.quantity`}  
                type="text"
                label='Quantity'
                style={{width:'100%', padding:5}}
                component={renderField} 
                labelSize='0.9rem'
              />
          </div>
         
          <div className="select-clear a-hover" onClick={()=>fields.remove(i)} style={{marginLeft:50, fontSize:'0.74rem', marginBottom:6}}>Remove</div>
        </div>
      }
      )}
      <div className="a-hover" style={{color:'grey', marginTop:10}} onClick={() => fields.push()}>Add item</div>
    </div>
      
  )
}
export const renderPaymentsCollections =({fields, classes, selectItem, currentItem, options, utils, meta:{error}})=> {
  return (
    <TableBody>
      {fields.map((e, i)=>{
          return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectItem(i)} 
                  style={{backgroundColor:currentItem==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.bill_id`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.billing_dt`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.mailing_dt`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.office_name`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.billing_period`}   component={renderString}  />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.code_units`} component={renderString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.pc_charge`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.paid_am`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.write_off_am`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.balance`} component={renderNumString}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.denied_dt`} component={renderInvisibleField} {...dateMask} style={{width:62}}/>
                  </TableCell>
                  <TableCell className="tb-cell" style={{overflow:'visible'}}>
                    <Field name={`${e}.bill_status_id`} placeholder={'Choose status'} component={tableSelect} options={options}/>
                  </TableCell>
                </TableRow>
        
      }
      
        
      )}
    </TableBody>
  )
}



export const renderPaymentRegistry =({fields, classes, selectItem, currentItem, options, utils, meta:{error}})=> {
  console.log('PAYMREG', fields)
  return (
    <TableBody>
      {fields.map((e, i)=>{
          return <TableRow 
                  key={i} 
                  className={classes.row} 
                  onClick={()=>selectItem(i)} 
                  style={{backgroundColor:currentItem==i&&'#cff3ff'}}>

                  <TableCell className="tb-cell">
                    <Field name={`${e}.check_no_tx`} style={{width:60}} component={renderInvisibleField}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.check_issued_dt`}  style={{width:70}} {...dateMask}  component={renderInvisibleField}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.payment_dt`}  style={{width:70}} {...dateMask}  component={renderInvisibleField}/>
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.check_am`} style={{width:60}} component={renderInvisibleField}/>
                  </TableCell>
                  <TableCell className="tb-cell" style={{width:100, overflow:'visible'}}>
                    <Field name={`${e}.payment_source_id`}  options={options} style={{width:'100px'}} component={tableSelect}  />
                  </TableCell>
                  <TableCell className="tb-cell">
                    <Field name={`${e}.comments_tx`} style={{width:200}} component={renderInvisibleField}/>
                  </TableCell>
                  
                </TableRow>
        
      }
      
        
      )}
    </TableBody>
  )
}



export const renderCheckBoxGroup =({input, fields, classes, options, utils, meta:{error}})=> {
      console.log('checkbox', options)
    return <div className="d-flex">
      {
        options.map((option, index) => {
            return (
            <div className="checkbox" key={index} style={{marginRight:10}}>
                <label>
                    <input type="checkbox"
                           name={`${input.name}[${index}]`}
                           value={option.id}
                           checked={input.value.indexOf(option.id) !== -1}
                           onChange={(event) => {
                               const newValue = [...input.value];
                               if (event.target.checked) {
                                   newValue.push(option.id);
                               } else {
                                   newValue.splice(newValue.indexOf(option.id), 1);
                               }

                               return input.onChange(newValue);
                           }}/>
                    {option.name}
                </label>
            </div>)
        })
      }
    </div>
     
}


export const renderCheckBoxTable =({input, fields, classes, columns, options, utils, meta:{error}})=> {
      console.log('checkbox', options)
    return <div>
      <div></div>
      <div className="d-flex">
        {
          options.map((option, index) => {
              return (
              <div className="checkbox" key={index} style={{marginRight:10}}>
                  <label>
                      <input type="checkbox"
                             name={`${input.name}[${index}]`}
                             value={option.id}
                             checked={input.value.indexOf(option.id) !== -1}
                             onChange={(event) => {
                                 const newValue = [...input.value];
                                 if (event.target.checked) {
                                     newValue.push(option.id);
                                 } else {
                                     newValue.splice(newValue.indexOf(option.id), 1);
                                 }

                                 return input.onChange(newValue);
                             }}/>
                      {option.name}
                  </label>
              </div>)
          })
        }
      </div>
    </div>
      
     
}
