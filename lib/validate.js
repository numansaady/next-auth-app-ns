export default function login_validate(values) {
  const errors = {};

//   Validation for email
  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

//   Validation for password
  if(!values.password){
    errors.password = "Required"
  }else if(values.password.length < 8 || values.password.length > 20){
    errors.password = "Password must be greater than 8 and less then 20 character long"
  }else if(values.password.includes(' ')){
    errors.password = 'Invalid Password'
  }

  return errors;
}

export function registerValidate(values){
    const errors = {}

    // Validation for username
    if (!values.username) {
        errors.username = "Required";
      } else if (values.username.includes(' ')) {
        errors.username = "Invalid username";
      }

    // Validation for Email
    if (!values.email) {
        errors.email = "Required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
      }
    
    //   Validation for password
      if(!values.password){
        errors.password = "Required"
      }else if(values.password.length < 8 || values.password.length > 20){
        errors.password = "Password must be greater than 8 and less then 20 character long"
      }else if(values.password.includes(' ')){
        errors.password = 'Invalid Password'
      }

    //   Validation for confirm password
    if(!values.cpassword){
        errors.cpassword = "Required"
      }else if(values.password !== values.cpassword){
        errors.cpassword = "Password not matched"
      }else if(values.cpassword.includes(' ')){
        errors.cpassword = 'Invalid Confirm Password'
      }
    
      return errors;
}