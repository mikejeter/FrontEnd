import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserForm({values, errors, touched}) {
  
  return (
    <>
    <h2>Login!</h2>
    <Form className = 'login-form'>

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
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field 
          className = 'text-field'
          type = 'password'
          name = 'password'
          placeholder = 'Password' 
        />
      </div>

      <div>  
        <input 
          className = 'sub-btn'
          type='submit' 
          value='Sign In!'
        />

        <p>Don't have an account? <Link to="/register">Sign up today!</Link></p>
      </div>
    </Form>
    </>
  );
};

const FormikUserForm = withFormik({
  mapPropsToValues ({username, password}) {
    return {
      username: username ||"",
      password: password || ""
    };
  },
  //VALIDATION
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .required("Name is required"),
    password: Yup.string()
      .required("Please enter your password.")
  }),
  //END VALIDATION

  handleSubmit(values, { resetForm, setSubmitting, }) {

      axios 
        .post("https://reqres.in/api/users", values) //temporary user list api
        .then(results => {
          /*if (results.data.token) {
            //push to specific user dashboard/page
          } */
          
          console.log(results); //logging results
          resetForm(); //resetting form after submit
          setSubmitting(false); 
        })
        .catch(error => {
          console.log("There's been an error: ", error);
          setSubmitting(false);
        });
    }
  }
)(UserForm);

export default FormikUserForm;