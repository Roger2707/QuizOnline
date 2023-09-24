
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Form, Field } from 'react-final-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import './SaveSubject.css';
import axios from 'axios';

export const SaveSubject = (props) => {
    const [position, setPosition] = useState('center');
    const [classes, setClasses] = useState([]);


    const [subject, setSubject] = useState(props?.subject?.subject);


    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});

    useEffect(() => {
    }, []);




    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }
        return errors;
    };
    const show = (bol) => props.showSuccess(bol);
    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);

        if (subject != null) {
            data.subjectId = subject.subjectId;
            axios
                .put('http://localhost:9597/api/subject/update', data)
                .then((response) => {
                    if (response.status === 200) {
                       
                            show(true);
                            const load = () => props.load();
                            load();
                    } else {
                        show(false);

                    }
                })
                .catch((error) => {
                    console.log(error);
                    show(false);
                });


        } else {

            axios
                .post('http://localhost:9597/api/subject/create', data)
                .then((response) => {
                    if (response.status === 200) { 
                             
                            show(true);
                            const load = () => props.load();
                            load();
                    } else {
                        show(false);

                    }
                })
                .catch((error) => {
                    console.log(error);
                    show(false);
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
                <Form onSubmit={onSubmit} initialValuesEqual={() => true} initialValues={{name:subject?.name}} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">

                                <Field name="name" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Subject*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />

                    
                        <Button type="submit" label={props.id != "" ? "Update" : "Add"} className="mt-2" />
                    </form>
                )} />
            </div>
        </div>


    )
}


