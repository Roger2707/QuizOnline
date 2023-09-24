import React, { useState } from "react";
import "./Modal.css";
import stu01 from '../assets/stu01.jpg'
import { Link, useHistory } from "react-router-dom";
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Password } from 'primereact/password';

import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';


function ModalChangePassword({ setModalChangePasswordOpen, account }) {
  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});
  const history = useHistory();

  const handleChangePassword = () => {


    setModalChangePasswordOpen(false);
    console.log(account);
  }
  const validate = (data) => {
    let errors = {};

    if (!data.password) {
      errors.password = 'Password is required.';
    }


    return errors;
  };
  const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
  const getFormErrorMessage = (meta) => {
    return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
  };
  const onSubmit = (data, form) => {
    setFormData(data);
    setShowMessage(true);

    form.restart();
  };
  const passwordHeader = <h6>Pick a password</h6>;
  const passwordFooter = (
    <React.Fragment>
      <Divider />
      <p className="mt-2">Suggestions</p>
      <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
        <li>At least one lowercase</li>
        <li>At least one uppercase</li>
        <li>At least one numeric</li>
        <li>Minimum 8 characters</li>
      </ul>
    </React.Fragment>
  );
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setModalChangePasswordOpen(false);
            }}
          >
            X
          </button>
        </div>
        <div className="title">
          <h1>Change Password</h1>
        </div>
        <div className="body">
          <div className="flex justify-content-center" style={{width:'20vw'}}>
            <div className="card">
              <Form onSubmit={onSubmit} initialValues={{ password: '' }} validate={validate} render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">

                  <Field name="password" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                        <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
                   
                  <Field name="newPassword" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password id="newPassword" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                        <label htmlFor="newPassword" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />
   
                  <Field name="confirmPassword" render={({ input, meta }) => (
                    <div className="field">
                      <span className="p-float-label">
                        <Password id="confirmPassword" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })}  />
                        <label htmlFor="confirmPassword" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                      </span>
                      {getFormErrorMessage(meta)}
                    </div>
                  )} />




                  <Button type="submit" label="Submit" className="mt-2" />
                </form>
              )} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button
            onClick={() => {
              setModalChangePasswordOpen(false);
            }}
            id="cancelBtn"
          >
            Cancel
          </button>
          <button
            onClick={handleChangePassword}
          >Change</button>
        </div>
      </div>
    </div>
  );
}

export default ModalChangePassword;


