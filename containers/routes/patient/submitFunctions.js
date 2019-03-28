import moment from 'moment'
import * as actions from '../../../actions'
import axios from 'axios'
import qs from 'qs'
import * as utils from '../../../components/functions/functions'
import {reset} from 'redux-form'
// ------------------------VISIT REGISTRY SUBMIT

export const submit=(values, dispatch, props)=> {
	console.log('SUBMITTED', values, props)
	dispatch({type:'DO_REQUEST'})

	const services = []
	const codes = []

	values.DiagnosisCodes1.map(e=> {
		console.log('ASD', e.specialty_cd)
		codes.push({
			company_id:'AR',
			dc_id:e.dc_id,
			specialty_cd:e.specialty_cd.value?e.specialty_cd.value:e.specialty_cd,
			patient_id:values.patientId

		})
	})
	values.serviceList.map((e,i)=>{
		console.log('services', e)
		const finalTreatments = [] 
		e.treatments&&e.treatments.map((r,i)=> {
			finalTreatments.push({
				...(r.bill_status_id)&&{bill_status_id:r.bill_status_id},
				billed_am:r.billed_am?r.billed_am:null,
				dc_1:r.dc_1?r.dc_1:null,
				dc_2:r.dc_2?r.dc_2:null,
				dc_3:r.dc_3?r.dc_3:null,
				dc_4:r.dc_4?r.dc_4:null,
				deductable_am:r.deductable_am?r.deductable_am:null,
				denied_dt:r.denied_dt?r.denied_dt:null,
				interest_am:r.interest_am?r.interest_am:null,
				lien_am:r.lien_am?r.lien_am:null,
				limit_pc_charge:r.limit_pc_charge?r.limit_pc_charge:null,
				lw_id:r.lw_id?r.lw_id:null,
				mod_1:r.mod_1?r.mod_1:null,
				mod_2:r.mod_2?r.mod_2:null,
				paid_am:r.paid_am?r.paid_am:null,
				pickup_dt:r.pickup_dt?utils.reverseDateMask(r.pickup_dt):null,
				place_of_service:r.place_of_service?r.place_of_service:null,
				recovered_dt:r.recovered_dt?r.recovered_dt:null,
				sent_to_attorney_am:r.sent_to_attorney_am?r.sent_to_attorney_am:null,
				sent_to_attorney_dt:r.sent_to_attorney_dt?r.sent_to_attorney_dt:null,
				units:r.units?r.units:null,
				write_off_am:r.write_off_am?r.write_off_am:null,
				company_id:'AR',
				from_dt:utils.reverseDateMask(r.from_dt),
				to_dt:utils.reverseDateMask(r.to_dt),
				patient_id:values.patientId,
				pc_charge:r.pc_charge,
				pc_code:r.pc_code,
				pc_id:r.pc_id,
				pc_code_description:r.pc_code_description,
				pc_modifier:r.pc_modifier,
				seq_order:r.seq_order?parseInt(r.seq_order):utils.setSequence(r, e.treatments.slice(0,i).concat(e.treatments.slice(i+1,e.treatments.length)))

			})
		})

		services.push({
			bill_id:e.bill_id,
			company_cd:'AR',
			treatments:finalTreatments,
			doctor_id:(e.doctor_id)?e.doctor_id.doctor_id?e.doctor_id.doctor_id:e.doctor_id:e.doctor_id,
			patient_id:values.patientId,
			visit_dc_nm:(e.doctor_id)?e.doctor_id.doctor_id?e.doctor_id.label:`${e.doctor_last_nm}, ${e.doctor_first_nm}(${e.office_name})`:null,
			visit_dt:utils.reverseDateMask(e.visit_dt),
			visit_id:e.visit_id,
			visit_list_id:null,
			visit_type_cd:e.visit_type_id.value?e.visit_type_id.value+'':e.visit_type_id,
			
		})
	})

	console.log('1 point')
	const finalRequest = {
		...(codes.length>0)&&{diagnosis_codes:codes},
        ...(services.length>0)&&{services:services},
       	...(props.deleted_services.length>0)&&{deleted_services:props.deleted_services}
	}
	// request
	


	axios.put(`${actions.API_URL}patients/${values.patientId}/visit-registry`,
					qs.stringify(finalRequest),
		         {
		        headers:{ 'Authorization': "bearer " + values.token}
		        }).then(res=> {
        	dispatch(actions.getPatientVisitRegistry(values.patientId, values.token))
  			dispatch(actions.getBillingInfo(values.patientId, values.token))
  			dispatch(actions.getPayments(values.patientId, values.token))
  			dispatch(reset('visitRegistry'))
			dispatch({type:'DO_SUCCESS'})
			dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
			dispatch({type:'RESET_ALERT_TO_SAVE'})
			console.log('res',res)
          return res;
        }).catch(err=> {
			dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })
	console.log('FINAL', finalRequest)

}

// ------------------------BILLING SUBMIT

export const submitBilling=(values, dispatch, props)=> {
	console.log('SUBMITTEDBILLING', values)
	dispatch({type:'DO_REQUEST'})

	const bills = []
	
	let currentDate = new Date()

	// console.log('SUBMIT', values)


	values.allBills.treating_providers.map(e=>{
		console.log('billingE', e)
		e.services_to_bill.map(t=> {
			delete t['bill_id']
			bills.push({
				...t,
				bill_status_id:t.bill_status_id==true?1:t.bill_status_id==false?null:t.bill_status_id,
				company_id:'AR'

			})
		})
		e.specialties.map(t=> {
			e.specialties.length>0&&t.services.map(r=> {
				
				r.bill_diagnosis_codes.map((s,i)=> {
					s['company_id']='AR'
					s['patient_id'] = r.patient_id
					s['specialty_cd'] = t.specialty_cd
					if (s.dc_code==null) r.bill_diagnosis_codes.splice(i, 1);

				})
				r.treatments.map(s=> {
					s['dc_1']=s.dc_1==true?'Y':null
					s['dc_2']=s.dc_2==true?'Y':null
					s['dc_3']=s.dc_3==true?'Y':null
					s['dc_4']=s.dc_4==true?'Y':null

					// s['visit_dt']=s.visit_dt?utils.reverseDateMask(s.visit_dt.replace(/\//g,'')):null
					delete s['visit_dt']
					delete s['bill_status_nm']
					delete s['lw_first_name']
					delete s['lw_last_name']
					delete s['lw_last_name']
					delete s['bill_status_description']
					delete s['active_in']
					delete s['visit_type_cd']
				})
				delete Object.assign(r, {['diagnosis_codes']: r['bill_diagnosis_codes'] })['bill_diagnosis_codes']
				delete r['company_cd']
				delete r['doctor_first_nm']
				delete r['doctor_last_nm']
				delete r['doctor_id']
				delete r['office_address']
				delete r['office_city']
				delete r['visit_dt']
				delete r['visit_list_id']
				delete r['visit_type_id']
				delete r['visit_type_cd']
				delete r['visit_type_nm']
				delete r['office_id']
				delete r['office_name']
				delete r['office_state']
				delete r['office_zip']
				delete r['visit_dc_nm']
				delete r['specialty_code']
				delete r['specialty_nm']
				bills.push({
					...r,
					...(r.billing_dt)&&{billing_dt:r.billing_dt?utils.reverseDateMask(r.billing_dt):null},


				})
				// bills.push({
				// 	auto_accident_in:e.auto_accident_in,
				// 	bill_diagnosis_codes:e.bill_diagnosis_codes,
				// 	bill_id:e.bill_id,
				// 	bill_status_id:1,
				// 	billed_am:e.billed_am,
				// 	comments_tx:e.comments_tx,
				// 	billing_dt:e.billing_dt,
				// 	company_id:'AR',
				// 	deductable_am:e.deductable_am,
				// 	denail_in:e.denail_in,
				// 	denied_dt:e.denied_dt,
				// 	employment_in:e.employment_in,
				// 	provider_id:e.doctor_id,
				// 	patient_id:values.patientId,

				// })
			})
		})
	})
	
	let finalRequest = {
		bills:bills
	}
	console.log('FINALBILLING', JSON.stringify(finalRequest))
	
	//request
	
	axios.put(`${actions.API_URL}patients/${values.patientId}/billing`,
        qs.stringify(finalRequest),
         {
        headers:{ 'Authorization': "bearer " + values.token}
        }).then(res=> {
        	dispatch(actions.getPatientVisitRegistry(values.patientId, values.token))
  			dispatch(actions.getBillingInfo(values.patientId, values.token))
  			dispatch(actions.getPayments(values.patientId, values.token))
			dispatch({type:'DO_SUCCESS'})
			dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
			console.log('resbilling',res)
          return res;
        }).catch(err=> {
			dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })
}

// ---------------------- PAYMENTS & COLLECTIONS SUBMIT
export const submitPayments=(values, dispatch, props)=> {
	console.log('PAYMENTSUBMIT', values)
	console.log('PAYMENTSUBMIT_PROPS', props)
	
	dispatch({type:'DO_REQUEST'})
	
	let deleted_events = []
	let events = []
	let treatments = []
	
	values.paymentsCollections.map(e=> {
		let payments = []
		e.payments.map(r=> {
			console.log('payment', r)
			payments.push({
			bill_id:e.bill_id,
			check_am:r.check_am,
			check_issued_dt:r.check_issued_dt?utils.reverseDateMask(r.check_issued_dt):null,
			payment_dt:r.payment_dt?utils.reverseDateMask(r.payment_dt):null,
			comments_tx:r.comments_tx,
			visit_id:e.visit_id,
			payment_source_id:r.payment_source_id.value?r.payment_source_id.value:r.payment_source_id,
			pc_id:e.pc_id,
			patient_id:props.patient.patient_id,
			company_id:'AR',
			pc_modifier:e.pc_modifier,
			check_no_tx:r.check_no_tx



			})
		})
		console.log('step1')

		treatments.push({
			bill_status_id:e.bill_status_id.value?e.bill_status_id.value:e.bill_status_id,
			comments_tx:e.comments_tx,
			deductable_am:e.deductable_am,
			denied_dt:e.denied_dt?utils.reverseDateMask(e.denied_dt):null,
			interest_am:e.interest_am,
			lien_am:e.lien_am,
			...(e.lw_id)?{lw_id:e.lw_id.value?e.lw_id.value:e.lw_id}:{lw_id:null},
			pc_id:e.pc_id,
			recovered_dt:e.recovered_dt?utils.reverseDateMask(e.recovered_dt):null,
			sent_to_attorney_am:e.sent_to_attorney_am,
			sent_to_attorney_dt:e.sent_to_attorney_dt?utils.reverseDateMask(e.sent_to_attorney_dt):null,
			write_off_am:e.write_off_am,
			payments:payments
		})
		

	})
	values.events.map(e=> {
		events.push({
			...e,
			done_flag:e.done_flag.value?e.done_flag.value:e.done_flag,
			subject_id:e.subject_id.value?e.subject_id.value:e.subject_id,
			when_to_do:e.when_to_do?utils.reverseDateMask(e.when_to_do):null,
			when_created:e.when_created?utils.reverseDateMask(e.when_created):null,

		})
	})



	console.log('FINAL', treatments)
	let final = {
		treatments:treatments,
		events:events
	}
	console.log('Stringified', JSON.stringify(final))
	// axios.put(`${actions.API_URL}patients/${props.patient.patient_id}/payments`,
 //        qs.stringify(final),
 //         {
 //        headers:{ 'Authorization': "bearer " + props.token}
 //        }).then(res=> {
 //  			dispatch(actions.choosePatient(props.patient.patient_id, props.token))
	// 		dispatch({type:'DO_SUCCESS'})
	// 		dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
	// 		console.log('res',res)
 //          return res;
 //        }).catch(err=> {
	// 		dispatch({type:'DO_FAILURE'})
 //        	console.log('err', err)
 //        	return false
 //        })
}


// ------------------------PATIENT SUBMIT

export const submitPatient=(values, dispatch)=> {
	console.log('SUBMIT', values)

	const id = values.patient_id
	const doa = values.patient_date_of_accident?
		utils.reverseDateMask(values.patient_date_of_accident):
		null
	const regDate = values.first_visit_dt?
		utils.reverseDateMask(values.first_visit_dt):
		null
	
	const dob = values.patient_date_of_birth?
		utils.reverseDateMask(values.patient_date_of_birth):
		null
	let self_flag = values.ins_policy_self_flag==true?'Y':'N'
	const final = {
		patient_date_of_accident:doa, 
		first_visit_dt:regDate,
		doctor_id:316, 
		office_id:346,
		company_id:'AR',
		// ins_contact_nm:values.contact_nm,
		emergency_contact_name:values.emergency_contact_name,
		emergency_contact_phone:values.emergency_contact_phone,
		// ...(values.lw_id)?{lw_id:values.lw_id.value?values.lw_id.value:values.lw_id}:{lw_id:null},
		patient_address:values.patient_address,
		patient_alternate_phone:values.patient_alternate_phone,
		patient_city:values.patient_city,
		patient_date_of_birth:dob,
		patient_first_nm:values.patient_first_nm,
		patient_last_nm:values.patient_last_nm,
		patient_home_phone:values.patient_home_phone,
		...(values.patient_id)&&{patient_id:values.patient_id},
		patient_mid_init:values.patient_mid_init,
		patient_sex:values.patient_sex.value?values.patient_sex.value:values.patient_sex,
		patient_ssn:values.patient_ssn,
		patient_state:values.patient_state,
		...(values.patient_status)?{patient_status:values.patient_status.value?values.patient_status.value:values.patient_status}:{patient_status:null},
		patient_zip:values.patient_zip,
		ins_policy_self_flag:self_flag,
		ins_information_flag:'Y',
		patient_active_flag:'Y',
		comments:values.comments
		// ins_phone_num:values.phone_num,
		// ins_policy_num:values.policy_num,
		// ins_claim_num:values.claim_num

	}
	console.log('step1')
	const finalInsurances = {
		insurances:[
			{
				contact_nm:values.contact_nm,
				claim_num:values.claim_num,
				company_id:'AR',
				...(values.ic_id)?{ic_id:values.ic_id.value?values.ic_id.value:values.ic_id}:{ic_id:null},
				phone_num:values.phone_num,
				policy_num:values.policy_num,
				...(values.lw_id)?{lw_id:values.lw_id.value?values.lw_id.value:values.lw_id}:{lw_id:null},
				policy_holder:values.policy_holder,
				...(values.insurance_id)&&{insurance_id:values.insurance_id}
			}
		]
	}
	delete final.token
	dispatch({type:'DO_REQUEST'})
	// delete values.patient_id
	// delete values.token
	console.log('FINALPATIENT', final)
	console.log('FINALINSURANCE', finalInsurances)
	console.log('FINALINSURANCESTRING', JSON.stringify(finalInsurances))

	if (values.patient_id) {
		
		// patient info
		axios.put(`${actions.API_URL}patients/${values.patient_id}`,
        qs.stringify(final),
         {
        headers:{ 'Authorization': "bearer " + values.token}
        }).then(res=> {
  			dispatch(actions.choosePatient(values.patient_id, values.token))
			dispatch({type:'DO_SUCCESS'})
			dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
			dispatch({type:'RESET_ALERT_TO_SAVE'})
			console.log('res',res)
          return res;
        }).catch(err=> {
			dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })
		
		// insurances

		axios.put(`${actions.API_URL}patients/${values.patient_id}/insurances`,
        qs.stringify(finalInsurances),
         {
        headers:{ 'Authorization': "bearer " + values.token}
        }).then(res=> {
  			dispatch(actions.choosePatient(values.patient_id, values.token))
			dispatch({type:'DO_SUCCESS'})
			dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
			dispatch({type:'RESET_ALERT_TO_SAVE'})
			console.log('res',res)
          return res;
        }).catch(err=> {
			dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })

	} else {
		axios.post(`${actions.API_URL}patients`,
        qs.stringify(final),
         {
        headers:{ 'Authorization': "bearer " + values.token}
        }).then(res=> {
  			// dispatch(actions.choosePatient(values.patient_id, values.token))
			// success -> update insurance
			console.log('RESPATIENT', res.data.data.id)
			axios.put(`${actions.API_URL}patients/${res.data.data.id}/insurances`,
		        qs.stringify(finalInsurances),
		         {
		        headers:{ 'Authorization': "bearer " + values.token}
		        }).then(res1=> {
		  			dispatch(actions.choosePatient(res.data.data.id, values.token))
					dispatch({type:'DO_SUCCESS'})
					// dispatch({type:'OPEN_ALERT', msg:'Successfully updated!'})
					dispatch({type:'RESET_ALERT_TO_SAVE'})
					console.log('res1',res1)
		          return res;
		        }).catch(err1=> {
					dispatch({type:'DO_FAILURE'})
		        	console.log('err1', err1)
		        	return false
		    })

			dispatch({type:'DO_SUCCESS'})
			dispatch({type:'OPEN_ALERT', msg:'Successfully created!'})
			dispatch({type:'RESET_ALERT_TO_SAVE'})
			console.log('res',res)
          return res;
        }).catch(err=> {
			dispatch({type:'DO_FAILURE'})
        	console.log('err', err)
        	return false
        })
	}
	

    
}