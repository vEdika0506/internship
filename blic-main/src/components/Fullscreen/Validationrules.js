export default function validate(values) {
    let errors = {};
    if (!values.email) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email address is invalid';
    }
    if (!values.phoneno){
      errors.phoneno = 'Phone no. is required';
    } else if (! values.phoneno.match(/^\d{10}$/)){
      errors.phoneno = 'Phone No. must be of 10 digits'
    }
    if (!values.fullname){
      errors.fullname = 'Full Name is required'
    }else if (!values.fullname.match( /^[a-zA-Z]+ [a-zA-Z]+$/)){
      errors.fullname = 'Enter valid Full Name eg. Aniket Verma '
    }
    if (!values.ticked){
      console.log('tick',values.ticked)
      errors.ticked = 'Please Accept terms and conditions'
    }
    return errors;
  };