
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Form, Field } from 'react-final-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';
import './SaveClass.css';
import axios from 'axios';

export const SaveClass = (props) => {
    const [position, setPosition] = useState('center');
    const [grades, setGrades] = useState(props?.grades?.grades);
    const [clas, setClas] = useState(props?.clas?.clas);

    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});


    const getGrades = () => {
        axios
            .get('http://localhost:9597/api/grade/findAllGrade')
            .then((response) => {
                if (response.status === 200) {

                    setGrades(response?.data);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
  
    useEffect(() => {
        //getGrades();
       
    }, []);




    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }

        if (!data.grade) {
            errors.grade = 'Grade is required.';
        }

    

        return errors;
    };
    const show = (bol) => props.showSuccess(bol);
    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);

        if (props?.clas?.clas != null) {
            data.classId = props.clas.clas.classId;
            axios
                .put('http://localhost:9597/api/classes/update', data)
                .then((response) => {
                    if (response.status === 200) {
                        console.log(response?.data);
                       
                           
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
                .post('http://localhost:9597/api/classes/create', data)
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
                <Form onSubmit={onSubmit} initialValuesEqual={() => true} initialValues={{ name:clas?.name, grade:grades.find(s=>s.gradeId == clas?.grade), quantity:props?.clas?.clas ==null?0:props?.clas?.clas?.quantity, status: props?.clas?.clas ==null ?true:props?.clas?.clas?.status}} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">

                        <Field name="grade" render={({ input, meta }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <Dropdown id="grade" {...input} options={grades} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="grade" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Grade*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />

                        <br></br>

                        <Field name="name" render={({ input, meta }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="firstName" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                    <label htmlFor="firstName" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Class Name*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />





                        <br></br>
                        <Button type="submit" label={props.username != "" ? "Update" : "Add"} className="mt-2" />
                    </form>
                )} />
            </div>
        </div>


    )
}


