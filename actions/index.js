import axios from 'axios';
import qs from 'qs'
// export const API_URL = 'http://iqlabs.kz/whirlpool/public/';
// const API_URL = 'https://api.whirlpool-kz.net/';
export const API_URL = 'https://gg.com';

let config = { headers:{'Authorization': "bearer " + token}}
export const choosePatient=(patient, token)=> {
	return {
		type: "CHOOSE_PATIENT",
		// promise: axios.get(`${API_URL}patients/${patientId}`)
		promise: axios.get(`${API_URL}patients?patient_id=${patient}&token=${token}`)
	}
}
export const getCompanies=(token)=> {
	return {
		type: "GET_INS_COMPANIES",
		promise: axios.get(`${API_URL}insurance-companies?token=${token}`)
	}
}
export const getSuppliers=(token)=> {
	return {
		type: "GET_SUPPLIERS",
		promise: axios.get(`${API_URL}supplier-companies?token=${token}`)
	}
}
export const getLines=(token, supplier_id)=> {
	return {
		type: "GET_LINES",
		promise: axios.get(`${API_URL}supplier-companies/${supplier_id}/lines?token=${token}`)
	}
}
export const getSubjects=(token)=> {
	return {
		type: "GET_SUBJECTS_LIST",
		promise: axios.get(`${API_URL}events/subjects?token=${token}`)
	}
}
export const getOffices=(token, name)=> {
	return {
		type: "GET_OFFICES",
		promise: name?
			axios.get(`${API_URL}offices?name=${name}&token=${token}`):
			axios.get(`${API_URL}offices?token=${token}`)
	}
}
export const getBillingInfo=(patientId, token)=> {
	return {
		type: "GET_BILLING_INFO",
		promise: axios.get(`${API_URL}patients/${patientId}/billing?token=${token}`)
	}
}
export const getPayments=(patientId, token)=> {
	return {
		type: "GET_PAYMENTS",
		promise: axios.get(`${API_URL}patients/${patientId}/payments?token=${token}`)
	}
}
export const logout=(token)=> {
	console.log('token',token)
	return {
		type: "USER_LOGOUT",
		promise: axios.get(`${API_URL}auth/logout?token=${token}`)
		// promise: axios.get(`${API_URL}auth/logout?token=${token}`,{},

		// 	{
		// headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
		// })
	}
}
const filterNotes=(filters)=> {
	let s = ''
	let done_flag = filters.done_flag?`&done_flag=${filters.done_flag}`:'';
	let fromDate = filters.fromDate?`&from=${filters.fromDate}`:'';
	let toDate = filters.toDate?`&to=${filters.toDate}`:'';
	
	s = done_flag+fromDate+toDate
	return s
	
}
export const getNotes=(filters, token)=> {
	console.log(filters)
	let filterQuery = filters?filterNotes(filters):''
	console.log('query',filterQuery)
	return {
		type : "GET_NOTES_LIST",
		promise: axios.get(`${API_URL}events?page=1${filterQuery}`,
		{
			headers:{ 'Authorization': "bearer " + token}
		})
		
	}
}

export const getPatientsList=(page, filters, token)=> {
	console.log(filters)
	let filterQuery = filters?checkFilters(filters):''
	return {
		type : "GET_PATIENTS_LIST",
		// promise: axios.get(`${API_URL}patients?`+filterQuery,
		promise: axios.get(`${API_URL}patients?page=${page}`+filterQuery,
		{
			headers:{ 'Authorization': "bearer " + token}
		})
	}
}
export const checkLastName=(lastName, token)=> {
	return {
		type : "GET_PATIENTS_FOR_LASTNAME",
		promise: axios.get(`${API_URL}patients?page=${1}&patient_last_nm=${lastName}`,
		{
			headers:{ 'Authorization': "bearer " + token}
		})
	}
}
export const resetPatientsForLastName=()=> {
	return {
		type : "RESET_PATIENTS_FOR_LASTNAME",
	}
}
export const getAsyncPatients=(lastName, token)=> {
	return {
		type : "GET_PATIENTS_FOR_SELECT",
		promise: axios.get(`${API_URL}patients?patient_last_nm=${lastName}&token=${token}`)
	}
}
export const getServiceList=(token)=> {
	return {
		type : "GET_SERVICE_LIST",
		promise: axios.get(`${API_URL}services/types?token=${token}`)
	}
}
export const getProviderList=(token)=> {
	return {
		type : "GET_PROVIDER_LIST",
		promise: axios.get(`${API_URL}doctors?token=${token}`)
	}
}
export const getSpecialties=(token)=> {
	return {
		type : "GET_SPECIALTY_LIST",
		promise: axios.get(`${API_URL}specialties?token=${token}`)
	}
}
export const getTreatmentsList=(token)=> {
	return {
		type : "GET_TREATMENTS_LIST",
		promise: axios.get(`${API_URL}procedure-codes?token=${token}`)
	}
}
export const getCompanyInfo=(token)=> {
	return {
		type : "GET_COMPANY_INFO",
		promise: axios.get(`${API_URL}company?token=${token}`)
	}
}
export const getCodesList=(token)=> {
	return {
		type : "GET_CODES_LIST",
		promise: axios.get(`${API_URL}diagnosis-codes?token=${token}`)
	}
}
export const getPatientVisitRegistry=(patientId, token)=> {
	return {
		type: "GET_PATIENT_VISIT_REGISTRY",
		promise: axios.get(`${API_URL}patients/${patientId}/visit-registry?token=${token}`)
	}
}

export const selectCurrentService=(service)=> {
	return {
		type: "SELECT_CURRENT_SERVICE",
		service:service
	}
}
export const selectCurrentPayment=(payment)=> {
	return {
		type: "SELECT_CURRENT_PAYMENT",
		payment:payment
	}
}
export const selectCurrentOffice=(office)=> {
	return {
		type: "SELECT_CURRENT_OFFICE",
		office:office
	}
}
export const selectCurrentBillStatus=(status)=> {
	return {
		type: "SELECT_CURRENT_STATUS",
		status:status
	}
}
export const selectCurrentCity=(city)=> {
	return {
		type: "SELECT_CURRENT_CITY",
		city:city
	}
}
export const selectCurrentDoc=(doc)=> {
	return {
		type: "SELECT_CURRENT_DOC",
		doc:doc
	}
}
export const signIn=(login, pass)=> {
	console.log('asd')
	return {
		type: "SIGN_IN",
		promise: axios.post(`${API_URL}auth/login`,
			qs.stringify({username:login, password:pass}),
			{
		headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
		})
	}
}
export const isLoggedIn=()=> {
	return {
		type: 'IS_AUTHENTICATED'
	}
}
export const setFilter=(item, type)=> {
	return {
		type: `SET_FILTER_${type.toUpperCase()}`,
		item:item
	}
}
export const editNote=(note)=> {
	return {
		type: `EDIT_NOTE`,
		note:note
	}
}
const checkFilters=(filters)=> {
	console.log('filters',filters)
	let finalQuery = '';
	let patientId = filters.patientId?`&patient_id=${filters.patientId}`:'';
	let firstName = filters.firstName?`&patient_first_nm=${filters.firstName}`:'';
	let lastName = filters.lastName?`&patient_last_nm=${filters.lastName}`:'';
	let phone = filters.phone?`&patient_home_phone=${filters.phone}`:'';
	let DOA = filters.DOA?`&patient_date_of_accident_to=${filters.DOA}&patient_date_of_accident_from=${filters.DOA}`:'';
	let DOB = filters.DOB?`&patient_date_of_birth=${filters.DOB}`:'';
	let claimNum = filters.claimNum?`&claim_num=${filters.claimNum}`:'';
	let policyNum = filters.policyNum?`&policy_num=${filters.policyNum}`:'';
	let claim_type_cd = filters.claim_type_cd?`&claim_type_cd=${filters.claim_type_cd}`:'';

	
	finalQuery= patientId+firstName+lastName+phone+DOA+DOB+claimNum+policyNum+claim_type_cd;
	return finalQuery;
}

export const getAttornies=(token)=> {
	return {
		type: "GET_ATTORNIES",
		promise: axios.get(`${API_URL}attornies?token=${token}`)
	}
}
export const getItems=(token)=> {
	return {
		type: "GET_ITEMS_LIST",
		promise: axios.get(`${API_URL}items?token=${token}`)
	}
}
export const getTechnicianItems=(userId, token)=> {
	return {
		type: "GET_TECHNICIAN_ITEMS_LIST",
		promise: axios.get(`${API_URL}users/${userId}/inventory?token=${token}`)
	}
}
export const getBillStatuses=( token)=> {
	return {
		type: "GET_BILL_STATUS_LIST",
		promise: axios.get(`${API_URL}bill-statuses?token=${token}`)
	}
}
export const getCities=( token)=> {
	return {
		type: "GET_CITIES_LIST",
		promise: axios.get(`${API_URL}cities?token=${token}`)
	}
}
export const getClaimTypes=( token)=> {
	return {
		type: "GET_CLAIMS_LIST",
		promise: axios.get(`${API_URL}claim-types?token=${token}`)
	}
}
export const getDocs=(token)=> {
	return {
		type: "GET_DOCS_LIST",
		promise: axios.get(`${API_URL}document-types?token=${token}`)
	}
}
export const getItemsByPage=(page, token)=> {
	return {
		type: "GET_ITEMS_LIST",
		promise: axios.get(`${API_URL}items?token=${token}&page=${page}`)
	}
}
export const getInsurances=(patient_id, token)=> {
	return {
		type: "GET_INSURANCES",
		promise: axios.get(`${API_URL}patients/${patient_id}/insurances?token=${token}`)
	}
}
export const getPaymentSources=(token)=> {
	return {
		type: "GET_PAYMENT_SOURCES",
		promise: axios.get(`${API_URL}payments/sources?token=${token}`)
	}
}
export const getUsers=(token)=> {
	return {
		type: "GET_USERS_LIST",
		promise: axios.get(`${API_URL}users?token=${token}`)
	}
}
export const getSchedules=(id, token)=> {
	console.log('getted')
	return {
		type: "GET_SCHEDULES_LIST",
		// promise: axios.get(`${API_URL}deliveries?token=${token}&user_id=${id}`)
		promise: axios.get(`${API_URL}deliveries?token=${token}`)
	}
}
export const createAttorney=(attorney, token)=> {
	return {
		type: "CREATE_ATTORNEY",
		promise: axios.post(`${API_URL}attornies`,
			qs.stringify(attorney),
			{
		headers:{ 'Authorization': "bearer " + token}
		})
	}
}
export const updateAttorney=(attorney, token)=> {
	// let obj = {...attorney, _method:'PUT'}
	return {
		type: "UPDATE_ATTORNEY",
		promise: axios.put(`${API_URL}attornies/${attorney.lw_id}`,
			qs.stringify(attorney),
			{
		headers:{ 'Authorization': "bearer " + token}
		})
	}
}
export const deleteAttorney=(attorneyId)=> {
	return {
		type: "DELETE_ATTORNEY",
		promise: axios.delete(`${API_URL}attornies/${attorneyId}`,
			{
		headers:{ 'Content-Type':'application/x-www-form-urlencoded'}
		})
	}
}

export const selectAttorney=(attorney)=> {
	return {
		type: `SELECT_ATTORNEY`,
		attorney:attorney
	}
}

export const selectCurrentTreatment=(treatment)=> {
	return {
		type: `SELECT_CURRENT_TREATMENT`,
		treatment:treatment
	}
}
export const loadCodes=(codes)=> {
	console.log('codes',codes)
	return {
		type:'LOAD_CODES',
		codes:codes
	}
}
export const deleteService=(services)=> {
	return {
		type:'DELETE_SERVICE',
		services:services
	}
}
export const deleteStatus=(status)=> {
	return {
		type:'DELETE_STATUS',
		status:status
	}
}

export const deleteCity=(city)=> {
	return {
		type:'DELETE_CITY',
		city:city
	}
}
export const deleteDoc=(doc)=> {
	return {
		type:'DELETE_DOC',
		doc:doc
	}
}
export const selectProvider=(provider)=> {
	return {
		type:'SELECT_PROVIDER',
		provider:provider
	}
}
export const setItemForEdit=(item)=> {
	console.log("SETITEM", item)
	return {
		type:'SET_ITEM_FOR_EDIT',
		itemForEdit:item
	}
}
export const setTechItemForEdit=(item)=> {
	return {
		type:'SET_TECH_ITEM_FOR_EDIT',
		itemForEdit:item
	}
}
export const setBilled=(bill)=> {
	return {
		type:'SET_BILLED',
		bill:bill
	}
}
export const selectBill=(bill)=> {
	return {
		type:'SELECT_BILL',
		bill:bill
	}
}
export const selectServiceType=(provider)=> {
	return {
		type:'SELECT_SERVICE_TYPE',
		serviceType:serviceType
	}
}
export const resetDeletedServices=()=> {
	return {
		type:'RESET_DELETED_SERVICES',
	}
}
export const createPatient=()=> {
	return {
		type:'CREATE_PATIENT',
	}
}
export const openAlert=(msg)=> {
	return {
		type:'OPEN_ALERT',
		msg:msg
	}
}
export const openReportsModal=(modal)=> {
	return {
		type:'OPEN_REPORTS_MODAL',
		modal:modal
	}
}
export const alertToSave=()=> {
	return {
		type:'ALERT_TO_SAVE'
	}
}
export const resetAlertToSave=()=> {
	return {
		type:'RESET_ALERT_TO_SAVE'
	}
}
export const getPaymentsByProvider=(token, filters, page)=> {
	let params = '';
	let bill_statuses = filters.bill_statuses?`&bill_statuses=${JSON.stringify(filters.bill_statuses)}`:'';
	let providers = filters.providers?`&providers=${JSON.stringify(filters.providers)}`:'';
	let claim_type_cd = filters.claim_type_cd?`&claim_type_cd=${filters.claim_type_cd}`:'';
	let doctors = filters.doctors?`&doctors=${JSON.stringify(filters.doctors)}`:'';
	let billing_date_from = filters.billing_date_from?`&billing_date_from=${filters.billing_date_from}`:'';
	let billing_date_to = filters.billing_date_to?`&billing_date_to=${filters.billing_date_to}`:'';
	let rx_date_from = filters.rx_date_from?`&rx_date_from=${filters.rx_date_from}`:'';
	let rx_date_to = filters.rx_date_to?`&rx_date_to=${filters.rx_date_to}`:'';
	params = bill_statuses+providers+claim_type_cd+doctors+billing_date_from+billing_date_to+rx_date_from+rx_date_to
	
	console.log('params', filters, params)
	return {
		type: "GET_REPORT",
		promise: axios.get(`${API_URL}reports/billing/payment-by-provider?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getBillingByProvider=(token, filters, page)=> {
	let params = '';
	let providers = filters.providers?`&providers=${JSON.stringify(filters.providers)}`:'';
	let claim_type_cd = filters.claim_type_cd?`&claim_type_cd=${filters.claim_type_cd}`:'';
	let doctors = filters.doctors?`&doctors=${JSON.stringify(filters.doctors)}`:'';
	let billing_date_from = filters.billing_date_from?`&billing_date_from=${filters.billing_date_from}`:'';
	let billing_date_to = filters.billing_date_to?`&billing_date_to=${filters.billing_date_to}`:'';
	let with_balance = filters.with_balance?`&with_balance=${filters.with_balance}`:'';
	params = providers+claim_type_cd+doctors+billing_date_from+billing_date_to+with_balance
	
	console.log('params', filters, params)
	return {
		type: "GET_REPORT_BILLING_BY_PROVIDER",
		promise: axios.get(`${API_URL}reports/billing/billing-by-provider?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getArbitrationByProvider=(token, filters, page)=> {
	let params = '';
	let provider = filters.provider_id?`&provider_id=${filters.provider_id}`:'';
	let lawyer = filters.lw_id?`&lw_id=${filters.lw_id}`:'';
	let doctors = filters.doctors?`&doctors=${JSON.stringify(filters.doctors)}`:'';
	let attorney_date_from = filters.attorney_date_from?`&attorney_date_from=${filters.attorney_date_from}`:'';
	let attorney_date_to = filters.attorney_date_to?`&attorney_date_to=${filters.attorney_date_to}`:'';
	let accident_date_from = filters.accident_date_from?`&accident_date_from=${filters.accident_date_from}`:'';
	let accident_date_to = filters.accident_date_to?`&accident_date_to=${filters.accident_date_to}`:'';
	params = provider+lawyer+doctors+accident_date_from+accident_date_to+attorney_date_from+attorney_date_to
	
	return {
		type: "GET_REPORT_ARBITRATION_BY_PROVIDER",
		promise: axios.get(`${API_URL}reports/billing/arbitration-by-lawyer?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getPaymentRegister=(token, filters, page)=> {
	let params = '';
	let bill_statuses = filters.bill_statuses?`&bill_statuses=${JSON.stringify(filters.bill_statuses)}`:'';
	let visit_types = filters.visit_types?`&visit_types=${JSON.stringify(filters.visit_types)}`:'';
	let providers = filters.providers?`&providers=${JSON.stringify(filters.providers)}`:'';
	let claim_type_cd = filters.claim_type_cd?`&claim_type_cd=${filters.claim_type_cd}`:'';
	let doctors = filters.doctors?`&doctors=${JSON.stringify(filters.doctors)}`:'';
	let billing_date_from = filters.billing_date_from?`&billing_date_from=${filters.billing_date_from}`:'';
	let billing_date_to = filters.billing_date_to?`&billing_date_to=${filters.billing_date_to}`:'';
	let rx_date_from = filters.rx_date_from?`&rx_date_from=${filters.rx_date_from}`:'';
	let rx_date_to = filters.rx_date_to?`&rx_date_to=${filters.rx_date_to}`:'';
	let with_balance = filters.with_balance?`&with_balance=${filters.with_balance}`:'';

	params = bill_statuses+providers+claim_type_cd+doctors+billing_date_from+billing_date_to+rx_date_from+rx_date_to+with_balance
	
	console.log('params', filters, params)
	return {
		type: "GET_REPORT_BILLING_BY_PROVIDER",
		promise: axios.get(`${API_URL}reports/billing/payment-register?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getListOfPatients=(token, filters, page)=> {
	let params = '';
	let insurances = filters.insurances?`&insurances=${JSON.stringify(filters.insurances)}`:'';
	let claim_type_cd = filters.claim_type_cd?`&claim_type_cd=${filters.claim_type_cd}`:'';
	let doctors = filters.doctors?`&doctors=${JSON.stringify(filters.doctors)}`:'';
	let accident_date_from = filters.accident_date_from?`&accident_date_from=${filters.accident_date_from}`:'';
	let accident_date_to = filters.accident_date_to?`&accident_date_to=${filters.accident_date_to}`:'';
	let patient_status_changed_dt_from = filters.patient_status_changed_dt_from?`&patient_status_changed_dt_from=${filters.patient_status_changed_dt_from}`:'';
	let patient_status_changed_dt_to = filters.patient_status_changed_dt_to?`&patient_status_changed_dt_to=${filters.patient_status_changed_dt_to}`:'';
	let patient_status = filters.patient_status?`&patient_status=${filters.patient_status}`:'';

	params = insurances+claim_type_cd+doctors+accident_date_from+accident_date_to+patient_status_changed_dt_from+patient_status_changed_dt_to+patient_status+claim_type_cd
	
	console.log('params', filters, params)
	return {
		type: "GET_REPORT",
		promise: axios.get(`${API_URL}patients?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getWithoutPickup=(token, filters, page)=> {
	let params = '';
	
	let codes = filters.codes?`&codes=${JSON.stringify(filters.codes)}`:'';
	let finish_date_from = filters.finish_date_from?`&finish_date_from=${filters.finish_date_from}`:'';
	let finish_date_to = filters.finish_date_to?`&finish_date_to=${filters.finish_date_to}`:'';
	
	params = codes+finish_date_from+finish_date_to
	
	return {
		type: "GET_REPORT",
		promise: axios.get(`${API_URL}reports/patient/without-pickup?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getReadyForBilling=(token, filters, page)=> {
	let params = '';
	
	let accident_date_from = filters.accident_date_from?`&accident_date_from=${filters.accident_date_from}`:'';
	let accident_date_to = filters.accident_date_to?`&accident_date_to=${filters.accident_date_to}`:'';
	let after_dos = filters.after_dos?`&after_dos=${filters.after_dos}`:'';
	let claim_type_cd = filters.claim_type_cd?`&claim_type_cd=${filters.claim_type_cd}`:'';
	let provider_id = filters.provider_id?`&provider_id=${filters.provider_id}`:'';
	let statuses = filters.patient_statuses?`&statuses=${JSON.stringify(filters.patient_statuses)}`:'';
	
	params = statuses+accident_date_from+accident_date_to+after_dos+provider_id
	
	return {
		type: "GET_REPORT",
		promise: axios.get(`${API_URL}reports/patient/ready-for-billing?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getActivePatientIns=(token, filters, page)=> {
	let params = '';
	
	let after_doa = filters.after_doa?`&after_doa=${filters.after_doa}`:'';
	
	params = after_doa
	
	return {
		type: "GET_REPORT",
		promise: axios.get(`${API_URL}reports/patient/without-insurance?token=${token}&page=${page}&${params}`),
		params:params
	}
}
export const getPatientBillingHistory=(token, patientId, page)=> {

	return {
		type: "GET_REPORT",
		promise: axios.get(`${API_URL}reports/billing/patient-billing-history?patient_id=${patientId}&token=${token}&page=${page}`),
		params:''
	}
}
