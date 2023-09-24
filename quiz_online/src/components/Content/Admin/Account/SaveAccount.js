
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Form, Field } from 'react-final-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import './SaveAccount.css';
import axios from 'axios';

export const SaveAccount = (props) => {
    const [position, setPosition] = useState('center');
    const [classes, setClasses] = useState([]);

    const getAccountFind = (username) => {
        axios
            .get('http://localhost:9597/api/account/findByUsername/' + username)
            .then((response) => {
                if (response.status === 200) {

                    return response?.data;
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const [account, setAccount] = useState(props?.account?.account);

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    const genders = [
        { id: false, name: 'Male' },
        { id: true, name: 'Female' }
    ];

    const roles = [
        { roleId: 2, name: 'Teacher' },
        { roleId: 3, name: 'Student' }
    ];

    const getClasses = () => {
        axios
            .get('http://localhost:9597/api/classes/findAllClasses')
            .then((response) => {
                if (response.status === 200) {

                    setClasses(response?.data);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAccount = (username) => {
        axios
            .get('http://localhost:9597/api/account/findByUsername/' + username)
            .then((response) => {
                if (response.status === 200) {

                    setAccount(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        getClasses();
        if (props.username != "") {
            setAccount(props.account);
        }



    }, []);




    const validate = (data) => {
        let errors = {};

        if (!data.firstName) {
            errors.firstName = 'First Name is required.';
        }

        if (!data.lastName) {
            errors.lastName = 'Last Name is required.';
        }
        if (!data.username) {
            errors.username = 'Username is required.';
        } else {
            getAccount(data.username);
            if ((account == null || account == [] || account == {} || account == '') || data.username == props.username) {

            } else {
                errors.username = 'Username is exists.';
            }
        }
        if (!data.address) {
            errors.address = 'Address is required.';
        }
        if (!data.phone) {
            errors.phone = 'Phone is required.';
        }
        if (data.dob == null) {
            errors.dob = 'Dob is required.';
        }

        if (data.gender == null) {
            errors.gender = 'Gender is required.';
        }

        if (data.classes == null) {
            errors.classes = 'Classes is required.';
        }

        if (!data.email) {
            errors.email = 'Email is required.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Invalid email address. E.g. example@email.com';
        }

    

        return errors;
    };
    const show = (bol) => props.showSuccess(bol);
    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);
        data.gender = data.gender.id;
        if (data?.role?.roleId === 2) {
            data.role.name = 'ROLE_TEACHER';
        } else if (data?.role?.roleId === 3) {
            data.role.name = 'ROLE_STUDENT';
        }
        data.password = '';
        if (data.classes.grade === 1) {
            data.classes.grade = { gradeId: 1, name: "Grade 10" };
        } else if (data.classes.grade === 2) {
            data.classes.grade = { gradeId: 2, name: "Grade 11" };
        }
        else if (data.classes.grade === 3) {
            data.classes.grade = { gradeId: 3, name: "Grade 12" };
        }
        if (props.username != "") {
            axios
                .put('http://localhost:9597/api/account/update', data)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response?.data);
                        if (props.username != "") {
                            getAccount(props.username);
                            show(true);
                            const load = () => props.load();
                            load();
                          
                        }
                    } else {
                        show(false);
                    

                    }
                })
                .catch((error) => {
                    console.log(error);
                    show(false);
                 
                });
               

        } else {
            const lo = (bon)=>props.setLoad(bon);
            lo(true);
           data.role={
            roleId:3,
            name:'ROLE_STUDENT'
           }
           data.status=1;
            data.created = new Date();
            axios
                .post('http://localhost:9597/api/account/create', data)
                .then((response) => {
                    if (response.status === 200) {
                        getAccount(props.username);
                        show(true);
                        const load = () => props.load();
                        load();
                        lo(false);
                        
                    } else {
                        show(false);
                        lo(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    show(false);
                    lo(false);
                });

        }

        form.restart();
        const load = () => props.load();
        load();
        const tran1 = () => props.setDisplay(false);
        tran1();



    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };


    return (


        <div className="flex justify-content-center">
            <div style={{ padding: "30px" }}>
                <Form onSubmit={onSubmit} initialValuesEqual={() => true} initialValues={{ username: account?.username, firstName: account?.firstName, lastName: account?.lastName, password: account?.password, email: account?.email, address: account?.address, phone: account?.phone, gender: genders.find(s => s.id === account?.gender), role: roles.find(s => s.roleId === account?.role), dob: account === null ? null : new Date(account?.dob), classes: account === null ? null : classes.find(s => s.name == account?.classes), avatar: account == null ? '' : account.avatar, status: account?.status, create:account?.create }} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">

                        <div className="row">
                            <div className="col-6">
                                <Field name="username" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right" >
                                            <InputText id="username" disabled={props?.username =="" ?"":"disabled"} {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="username" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Username*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className="col-6">
                                <Field name="email" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right">
                                            <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                        </div>

                        <br></br>
                        <div className="row">
                            <div className="col-6">
                                <Field name="firstName" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="firstName" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>First Name*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className="col-6">
                                <Field name="lastName" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="lastName" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="lastName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Last Name*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                        </div>
                        <br></br>

                        <Field name="address" render={({ input, meta }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="address" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="address" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Address*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <br></br>

                        <div className="row">
                            <div className="col-6">
                                <Field name="phone" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right">
                                            <InputText id="phone" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} keyfilter="int" />
                                            <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Phone*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className="col-6">
                                <Field name="dob" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Calendar id="dob" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} dateFormat="dd/mm/yy" mask="99/99/9999" showIcon />
                                            <label htmlFor="dob" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Birthday*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                        </div>

                        <br></br>

                        <div className="row">
                            <div className="col-6">
                                <Field name="gender" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="gender" {...input} options={genders} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="gender" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Gender*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                           
                            <div className="col-6">
                                <Field name="classes" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="classes" {...input} options={classes} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="classes" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Class*</label>

                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                        </div>

                        <br></br>
                        <Button type="submit" label={props.username != "" ? "Update" : "Add"} className="mt-2" />
                    </form>
                )} />
            </div>
        </div>


    )
}


