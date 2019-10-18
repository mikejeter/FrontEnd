import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

function UserForm({values, errors, touched, status}) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    status && setUsers(users => [...users, status])
  }, [status])

  return (
    <>
    <h2>Sign Up!</h2>
    <Form className = 'register-form'>

      <div>
        {touched.username && errors.username && <p>{errors.username}</p>}
        <Field 
          className = 'text-field'
          type = 'text'
          name = 'username'
          placeholder = 'username'
        />
      </div>

      <div>
        {touched.email && errors.email && <p>{errors.email}</p>}
        <Field 
          className = 'text-field'
          type = 'text'
          name = 'email'
          placeholder = 'email' 
        />
      </div>

      <div>
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field 
          className = 'text-field'
          type = 'password'
          name = 'password'
          placeholder = 'Password' 
        />
      </div>

      <div className='tos-submit'>
        {touched.terms && errors.terms && <p>{errors.terms}</p>}
        <label>
        <Field
          type = 'checkbox'
          name = 'terms'
          checked={values.terms}
        />
        I Agree to the Terms of Service
        </label>
        <input 
          className = 'sub-btn'
          type='submit' 
          value='Sign Up!'
        />
      </div>
    </Form>
    </>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues ({username, email, password, terms}) {
    return {
      username: username ||"",
      email: email || "",
      password: password || "",
      terms: terms || false
    };
  },
  //VALIDATION
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required."),
    password: Yup.string()
      .min(8, "Please choose a password with at least 8 characters.")
      .required("Password is required."),
    terms: Yup.mixed()
      .required("Terms of Service Agreement required!")
  }),
  //END VALIDATION

  handleSubmit(values, { resetForm, setErrors, setSubmitting, setStatus }) {
    
    if (values.email === "12234@email.com") {
      setErrors({email: "A user with that email is already registered."});
    } else {
      axios 
        .post("https://reqres.in/api/users", values) //temporary user list api
        .then(results => {
          console.log(results); //logging results
          setStatus(results.data);
          resetForm(); //resetting form after submit
          setSubmitting(false); 
        })
        .catch(error => {
          console.log("There's been an error: ", error);
          setSubmitting(false);
        });
    }
  }
})(UserForm);

export default FormikUserForm;