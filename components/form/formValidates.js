export const validate = values => {
  const errors = {}
  if (!values.username) {
    errors.username = 'Требуется для заполнения'
  } else if (values.username.length > 15) {
    errors.username = 'Must be 15 characters or less'
  }
  if (!values.type) {
    errors.type = 'Type is required'
  }
  if (!values.supplier_company_line_id) {
    errors.supplier_company_line_id = 'Line is required'
  }
  if (!values.email) {
    errors.email = 'Требуется для заполнения'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Неверный email'
  }
  if (!values.username10) {
    errors.username10 = 'Username required'
  } else if (values.username10.length>10) {
    errors.username10 = 'Must not exceed 10 characters'
  }
  if (!values.age) {
    errors.age = 'Требуется для заполнения'
  } else if (isNaN(Number(values.age))) {
    errors.age = 'Допускаются только цифры'
  } else if (Number(values.age) < 18) {
    errors.age = 'Sorry, you must be at least 18 years old'
  }
  if (!values.phone) {
    errors.phone = 'Требуется для заполнения'
  }
  if (!values.country) {
    errors.country = 'Требуется для заполнения'
  } else if (!/^[А-Я ]+$/i.test(values.country)) {
    errors.country = 'Введите настоящее название страны'
  }
  if (!values.patient_first_nm) {
    errors.patient_first_nm = 'First name required'
  }
  if (!values.patient_last_nm) {
    errors.patient_last_nm = 'Last name required'
  }
  if (!values.office_id) {
    errors.office_id = 'Office required'
  }
  if (!values.doctor_id) {
    errors.doctor_id = 'Doctor required'
  }
   if (!values.delivery_state) {
    errors.delivery_state = 'State required'
  }
     if (!values.delivery_city) {
    errors.delivery_city = 'City required'
  }
     if (!values.delivery_address) {
    errors.delivery_address = 'Address required'
  }
     if (!values.delivery_latitude) {
    errors.delivery_latitude = 'Latitude required'
  }
     if (!values.delivery_longitude) {
    errors.delivery_longitude = 'Longitude required'
  }

  if (!values.item_code) {
    errors.item_code = 'Item code required'
  }
  else if (values.item_code.length>20) {
    errors.item_code = 'Item code cannot exceed 20 characters'
  }
  if (!values.item_description) {
    errors.item_description = 'Item description required'
  } else if (values.item_description.length>50) {
    errors.item_description = 'Item code cannot exceed 50 characters'
  }
  if (!values.ordering_price) {
    errors.ordering_price = 'Ordering price required'
  }
  if (!values.stock_qnty) {
    errors.stock_qnty = 'Quantity required'
  }
  return errors
}