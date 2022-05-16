export default function validate(values) {
    let errors = {};
    if (!values.pincode){
      errors.phoneno = 'Pincode no. is required';
    } else if (! values.phoneno.match(/^\d{6}$/)){
      errors.phoneno = 'Enter Valid Pincode '
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