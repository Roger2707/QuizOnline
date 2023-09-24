
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { Form, Field } from 'react-final-form';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { classNames } from 'primereact/utils';

import axios from 'axios';
import { InputNumber } from 'primereact/inputnumber';
import { find } from 'quill';

export const SaveExam = (props) => {
    const [position, setPosition] = useState('center');
    const [grades, setGrades] = useState([]);
    const [subjects, setSubjects] = useState([]);


    const [exam, setExam] = useState(props?.exam?.exam);


    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    let es = exam?.easy == null?0:exam.easy;
    let md = exam?.medium == null?0:exam.medium;
    let hd = exam?.hard == null?0:exam.hard;
    let countEz = 0;
    let countMd = 0;
    let countHd = 0;
    let subject = null;
    let grade = null;


    useEffect(() => {
        getGrades();
        getSubjects();
        check();
        if (exam != null) {
            let sub = props?.subjects?.subjects;
            subject = sub?.find(s => s.subjectId === exam.subjectId);

            let grs = props?.grades?.grades;
            grade = grs?.find(s => s.gradeId === exam.gradeId);

            es = exam?.easy;
            md = exam?.medium;
            hd = exam?.hard;
        }
        check();
    }, []);
    const getGrades = () => {
        axios
            .get('http://localhost:9597/api/grade/findAllGrade')
            .then((response) => {
                if (response.status === 200) {


                    setGrades(response?.data);
                    let grs = response?.data
                    if (exam != null) {
                        grade = grs.find(s => s.gradeId === exam?.gradeId);
                        check();
                    }


                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getSubjects = () => {
        axios
            .get('http://localhost:9597/api/subject/findAllSubject')
            .then((response) => {
                if (response.status === 200) {
                    setSubjects(response?.data);
                    let subs = response?.data
                    if (exam != null) {
                        subject = subs.find(s => s.subjectId === exam?.subjectId);
                        check();
                    }


                }
            })
            .catch((error) => {
                console.log(error);
            });
    };



    const validate = (data) => {
        let errors = {};

        if (!data.name) {
            errors.name = 'Name is required.';
        }
        if (data.easy + data.medium + data.hard < 3) {
            errors.total = 'Total must be greater than 3'
        }
        return errors;
    };
    const show = (bol) => props.showSuccess(bol);
    const onSubmit = (data, form) => {
        setFormData(data);
        setShowMessage(true);
        data.created = new Date;
        if (exam != null) {
            data.examId = exam.examId;
            axios
                .put('http://localhost:9597/api/exam/update', data)
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
                .post('http://localhost:9597/api/exam/create', data)
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

    const check = () => {
        if (exam != null) {

            const ck = {
                leverId: 0,
                subjectId: exam?.subjectId,
                gradeId: exam?.gradeId,
            }
            ck.leverId = 1;
            axios
                .post('http://localhost:9597/api/question/countCheck', ck)
                .then((response) => {
                    if (response.status === 200) {
                        countEz = response?.data.count


                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            ck.leverId = 2;
            axios
                .post('http://localhost:9597/api/question/countCheck', ck)
                .then((response) => {
                    if (response.status === 200) {
                        countMd = response?.data.count


                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            ck.leverId = 3
            axios
                .post('http://localhost:9597/api/question/countCheck', ck)
                .then((response) => {
                    if (response.status === 200) {
                        countHd = response?.data.count


                    }
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        if (grade != null && subject != null) {
            const ck = {
                leverId: 0,
                subjectId: subject == null ? 0 : subject.subjectId,
                gradeId: grade == null ? 0 : grade.gradeId,
            }
            ck.leverId = 1;
            axios
                .post('http://localhost:9597/api/question/countCheck', ck)
                .then((response) => {
                    if (response.status === 200) {
                        countEz = response?.data.count


                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            ck.leverId = 2;
            axios
                .post('http://localhost:9597/api/question/countCheck', ck)
                .then((response) => {
                    if (response.status === 200) {
                        countMd = response?.data.count


                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            ck.leverId = 3
            axios
                .post('http://localhost:9597/api/question/countCheck', ck)
                .then((response) => {
                    if (response.status === 200) {
                        countHd = response?.data.count


                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    return (


        <div className="flex justify-content-center">
            <div style={{ padding: "30px" }}>
                <Form onSubmit={onSubmit} initialValues={{ name: exam?.name, grade: grades.find(s => s.gradeId === exam?.gradeId), subject: subjects.find(s => s.subjectId === exam?.subjectId), time: exam == null ? 5 : exam?.time, easy: exam == null ? 0 : exam?.easy, medium: exam == null ? 0 : exam?.medium, hard: exam == null ? 0 : exam?.hard, status: true }} validate={validate} render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit} className="p-fluid">
                        {check()}
                        <Field name="name" render={({ input, meta }) => (
                            <div className="field">
                                <span className="p-float-label">
                                    <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} maxLength={100} />
                                    <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name*</label>
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                        <br /> <br />
                        <div className='row'>
                            <div className='col-4'>
                                <Field name="grade" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="lever" {...input} options={grades} onChange={(e) => { input.onChange(e.value); grade = e.value; check() }} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="lever" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Grade*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className='col-4'>
                                <Field name="subject" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="subject" {...input} options={subjects} onChange={(e) => { input.onChange(e.value); subject = e.value; check() }} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} filter filterBy="name" />
                                            <label htmlFor="subject" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Subject*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className='col-4'>
                                <Field name="time" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputNumber onKeyDown={(e) => { e.preventDefault(); }} id="time" {...input} ref={input.ref} value={input.value} onBlur={input.onBlur} onChange={(e) => { input.onChange(e.value == null || e.value < 5 ? 5 : e.value) }} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} showButtons min={5} max={120} />
                                            <label htmlFor="hard" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Time*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                        </div>
                        <br /> <br />
                        <div className='row'>
                            <div className='col-4'>
                                <div className='row'><div className='col-4'></div> <div className='col-4'>Quesion: {countEz}</div><div className='col-4'></div></div>
                                <Field name="easy" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputNumber onKeyDown={(e) => { e.preventDefault(); }} id="easy" {...input} ref={input.ref} value={input.value} onBlur={input.onBlur} onChange={(e) => { input.onChange(e.value == null ? 0 : e.value); es = e.value }} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} showButtons min={0} max={countEz} />
                                            <label htmlFor="easy" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Easy*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className='col-4'>
                                <div className='row'><div className='col-4'></div> <div className='col-4'>Quesion: {countMd}</div><div className='col-4'></div></div>
                                <Field name="medium" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputNumber id="medium" onKeyDown={(e) => { e.preventDefault(); }} {...input} ref={input.ref} value={input.value} onBlur={input.onBlur} onChange={(e) => { input.onChange(e.value == null ? 0 : e.value); md = e.value }} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} showButtons min={0} max={countMd} />
                                            <label htmlFor="medium" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Medium*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                            <div className='col-4'>
                                <div className='row'><div className='col-4'></div> <div className='col-4'>Quesion: {countHd}</div><div className='col-4'></div></div>
                                <Field name="hard" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputNumber id="hard" onKeyDown={(e) => { e.preventDefault(); }} {...input} ref={input.ref} value={input.value} onBlur={input.onBlur} onChange={(e) => { input.onChange(e.value == null ? 0 : e.value); hd = e.value }} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} showButtons min={0} max={countHd} />
                                            <label htmlFor="hard" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Hard*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                            </div>
                        </div>
                        <br /> <br />

                        <div className='row'>
                            <div className='col-4'></div>
                            <div className='col-4'> <Field name="total" render={({ input, meta }) => (
                                <div className="field">

                                    {/* <span>Total Quesion : {exam != null ? exam?.easy : es + exam != null ? exam?.medium : md + exam != null ? exam?.hard : hd}</span> <br /> */}

                                    <span>Total Quesion : { es + md + hd}</span> <br />
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} /></div>
                            <div className='col-4'></div>
                        </div>
                        <br></br>


                        <Button type="submit" label={props?.exam?.exam != null ? "Update" : "Add"} className="mt-2" />
                    </form>
                )} />
            </div>
        </div>


    )
}


