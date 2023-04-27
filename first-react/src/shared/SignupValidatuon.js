function validation(values) {
    let errors = {}
    const name_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,}$/
    
    if (values.name === "") {
        errors.name = "name should not be empty"
      } else if (!name_pattern.test(values.name)) {
        errors.name = "name format is invalid"
      } else {
        errors.name = ""
      }
    if (values.email === "") {
      errors.email = "Email should not be empty"
    } else if (!email_pattern.test(values.email)) {
      errors.email = "Email format is invalid"
    } else {
      errors.email = ""
    }
    
    if (values.password === "") {
      errors.password = "Password should not be empty"
    } else if (!password_pattern.test(values.password)) {
      errors.password = "Password format is invalid"
    } else {
      errors.password = ""
    }
    
    return errors
  }
  
  export default validation;
  