import React, { useState, useEffect } from "react";
import {withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = props => {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      if (props.status) {
        setUsers([...users, props.status]);
      }
    }, [props.status]);
  
    return (
      <div className="user-form">
        <Form>
          <Field type="text" name="item" placeholder="Item Name" />
          {props.touched.item && props.errors.item && (
            <p className="error">{props.errors.item}</p>
          )}
          <Field type="text" name="description" placeholder="Description" />
          {props.touched.description && props.errors.description && (
            <p className="error">{props.errors.description}</p>
          )}
          <Field type="text" name="price" placeholder="Price" />
          {props.touched.price && props.errors.price && (
            <p className="error">{props.errors.price}</p>
          )}
          <button type="submit">Submit!</button>
        </Form>
        {users.map(user => (
  <ul key={user.id}>
    <li>Item Name: {user.item}</li>
    <li>Description: {user.description}</li>
    <li>Price: {user.price}</li>
  </ul>
))}
    </div>
  );
};
const myMapPropsToValues = props => {
  console.log(props);
  const returnObj = {
    item: props.item || "",
    description: props.description || "",
    price: props.price || "",
  };
  return returnObj;
};

const myHandleSubmit = (values, { setStatus }) => {
  console.log("submit pressed! ... sending...");
  axios
    .post("https://reqres.in/api/users/", values)
    .then(res => {
      console.log(res);
      setStatus(res.data);
    })
    .catch(err => console.log(err));
};
const yupSchema = Yup.object().shape({
  item: Yup.string().required("please type a item"),
  description: Yup.string().required("please type a description")
});

const formikObj = {
  mapPropsToValues: myMapPropsToValues,
  handleSubmit: myHandleSubmit,
  validationSchema: yupSchema
};

const EnhancedFormHOC = withFormik(formikObj);
const EnhancedUserForm = EnhancedFormHOC(UserForm);

export default EnhancedUserForm;