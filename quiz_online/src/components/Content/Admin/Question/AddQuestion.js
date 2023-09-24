
import React, { useEffect, useRef, useState } from 'react';
import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';

import { Checkbox } from 'primereact/checkbox';

import { classNames } from 'primereact/utils';
import { Editor } from 'primereact/editor';
import { Panel } from 'primereact/panel';
import { FileUpload } from 'primereact/fileupload';
import { Toast } from 'primereact/toast';
import { Image } from 'primereact/image';
import axios from 'axios';

import UploadService from '../../../../services/file-upload-service';
import { useHistory, useParams } from 'react-router-dom';
const panelContainerStyle = {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "1rem"
};

export const AddQuestion = () => {
    const history = useHistory();
    const [message, setMessage] = useState("");
    const [imageInfos, setImageInfos] = useState([]);
    const [progress, setProgress] = useState(0);
    const [progress0, setProgress0] = useState(0);
    const [progress1, setProgress1] = useState(0);
    const [progress2, setProgress2] = useState(0);
    const [progress3, setProgress3] = useState(0);
    const [countries, setCountries] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const [text2, setText2] = useState('');
    const [expanded, setExpanded] = React.useState("");
    const [points, setPoints] = React.useState([]);
    const [gh, setGh] = useState(2);
    const [checkCorrect, setCheckCorrect] = useState();
    const [levers, setLevers] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [grades, setGrades] = useState([]);
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);
    // const [currentFile, setCurrentFile] = useState(undefined);
    // const [currentFile1, setCurrentFile1] = useState(undefined);
    // const [currentFile2, setCurrentFile2] = useState(undefined);
    // const [currentFile3, setCurrentFile3] = useState(undefined);
    // const [currentFile4, setCurrentFile4] = useState(undefined);
    let currentFile = undefined;
    let currentFile0 = undefined;
    let currentFile1 = undefined;
    let currentFile2 = undefined;
    let currentFile3 = undefined;


    //const [id, setId] = useState(1);
    const {id}= useParams();
    const toast = useRef(null);
    const handleChange = panel => (evt, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    const getQuestion = (id) => {
        axios
            .get('http://localhost:9597/api/question/findById/' + id)
            .then((response) => {
                if (response.status === 200) {


                    setQuestion(response?.data);

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const getAnswers = (id) => {
        axios
            .get('http://localhost:9597/api/answer/findByQuestion/' + id)
            .then((response) => {
                if (response.status === 200) {
                    var ans = null;
                    ans = response?.data;
                    setAnswers(response?.data);

                    setGh(ans?.length >= 2 ? ans?.length : 2);
                    ans.map(s => {
                        addPoint();
                    });

                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
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
    const getLevers = () => {
        axios
            .get('http://localhost:9597/api/lever/findAll')
            .then((response) => {
                if (response.status === 200) {
                    setLevers(response?.data);
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


                }
            })
            .catch((error) => {
                console.log(error);
            });
    };
    const addPoint = () => {
        const arr = points;

        arr.push(`dummy-${points.length + 1}`);
        setPoints([...arr]);

    };

    const removePoint = index => {
        setPoints(
            points.slice(0, index).concat(points.slice(index + 1, points.length))

        );

    };
    const PointPanel = props => (

        <div >
            <Panel
                header={`Anwser ${props.ley + 1}`}
                key={`p${props.ley}`}
                //expanded={props.expanded === `panel${props.ley}`}
                onChange={props.handleChange(`panel${props.ley}`)}

            >


                <div className='row'>
                    <div className='col-4'></div>
                    <div className='col-4'>  <Field name={`correct${props.ley}`} type="checkbox" render={({ input, meta }) => (
                        <div className="field-checkbox">
                            <Checkbox disabled={input.checked == true && checkCorrect == false ? 'disabled' : ''} inputId={`correct${props.ley}`} {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                            <label htmlFor={`correct${props.ley}`} className={classNames({ 'p-error': isFormFieldValid(meta) })}>Correct</label>
                        </div>
                    )} /></div>
                    <div className='col-4'></div>
                </div>


                <div className='row'>
                    <div className='col-11'>

{/* 
                        <Field name={`answerPhoto${props.ley}`} render={({ input, meta }) => (
                            <div className="field" style={{ textAlign: 'left' }}>

                                <label style={{ color: '#757575' }}>Photo</label>
                                <div className='row'>
                                    <div className='col-2'>
                                        <Image src={`http://localhost:9597/files/` + input.value} alt="Image" width="250" preview /> </div>
                                    <div className='col-10'> <span className="p-float-label p-input-icon-right">
                                        <FileUpload name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" onUpload={onUpload} accept="image/*" maxFileSize={1000000} onSelect={(event) => { eval(`currentFile${props.ley} ` + '=' + ' event.files[0]'); }} onRemove={() => { eval(`currentFile${props.ley} ` + '=' + ' undefined'); console.log(eval(`currentFile${props.ley} `)) }} onClear={() => { eval(`currentFile${props.ley} ` + '=' + ' undefined'); console.log(eval(`currentFile${props.ley} `)) }}
                                            uploadOptions={uploadOptions} customUpload={true}
                                            emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} />
                                    </span>
                                    </div>
                                </div>
                            </div>
                        )} /> */}


                        <Field name={`content${props.ley}`} render={({ input, meta }) => (
                            <div className="field" style={{ textAlign: 'left' }}>
                                <label style={{ color: '#757575' }}>Content</label>
                                <span className="p-float-label">

                                    <Editor id={`content${props.ley}`} headerTemplate={header} {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} style={{ height: '200px' }} onTextChange={(event) => { input.onChange(event.htmlValue); console.log(`content${props.ley}` + event.htmlValue); }} maxLength={150} />
                                </span>
                                {getFormErrorMessage(meta)}
                            </div>
                        )} />
                    </div>
                    <div className='col-1'>
                        <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center' }} >
                            <Button
                                icon="pi pi-trash"
                                disabled={gh == 2 ? "disabled" : ''}
                                className="p-button-raised p-button-danger"
                                onClick={event => {
                                    event.stopPropagation();
                                    removePoint(props.ley);
                                    setGh(gh - 1);
                                }}>
                            </Button>
                        </div>
                    </div>
                </div>

            </Panel>


        </div>
    );

    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }
    const header = renderHeader();
    let isApiSubscribed = true;
    useEffect(() => {
         console.log(id);

        if (isApiSubscribed) {
            if (id == null) {
                addPoint();
                addPoint();
            }
            getQuestion(id);
            getAnswers(id);
            getSubjects();
            getLevers();
            getGrades();


        }
        return () => {

            isApiSubscribed = false;
        };

    }, []);



    const validate = (data) => {
        let errors = {};
        let check = 0;

        if (data.correct0) {

            check++;
        }
        if (data.correct1) {

            check++;
        }
        if (data.correct2 && gh >= 3) {

            check++;
        } else {
            data.correct2 = false;
        }
        if (data.correct3 && gh == 4) {

            check++;
        } else {
            data.correct3 = false;
        }

        setCheckCorrect(check == 1 ? false : true);

        if (data.content == null) {
            errors.content = 'This content is required.';
        }

        if (!data.content0) {

            errors.content0 = 'This content is required.';
        }

        if (!data.content1) {

            errors.content1 = 'This content is required.';
        }

        if (!data.content2 && gh >= 3) {

            errors.content2 = 'This content is required.';
        }

        if (!data.content3 && gh == 4) {

            errors.content3 = 'This content is required.';
        }



        if (!data.name) {
            errors.name = 'Name is required.';
        } else if (data.name?.length > 100) {
            errors.name = 'Name cannot exceed 100 characters.';
        }
        if (!data.lever) {
            errors.lever = 'Lever is required.';
        }
        if (!data.grade) {
            errors.grade = 'Grade is required.';
        }
        if (!data.subject) {
            errors.subject = 'Subject is required.';
        }


        return errors;
    };
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    }
    const makeid = (length) => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const onSubmit = (data, form) => {
        // let filename = '';
        // let filename0 = '';
        // let filename1 = '';
        // let filename2 = '';
        // let filename3 = '';
        var re = /(?:\.([^.]+))?$/;
        if (currentFile != undefined) {
            setProgress(0);
            data.photo = makeid(10);
            UploadService.upload(currentFile, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            }, data.photo).then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
                .then((files) => {
                    setImageInfos(files.data);
                })
                .catch((err) => {
                    setProgress(0);

                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage("Could not upload the Image!");
                    }


                });
            var ext = re.exec(currentFile.name)[1];
            data.photo = data.photo + '.' + ext;
        }
        if (currentFile0 != undefined) {
            setProgress0(0);
            data.answerPhoto0 = makeid(10);

            UploadService.upload(currentFile0, (event) => {
                setProgress0(Math.round((100 * event.loaded) / event.total));
            }, data.answerPhoto0).then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
                .then((files) => {
                    setImageInfos(files.data);
                })
                .catch((err) => {
                    setProgress(0);

                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage("Could not upload the Image!");
                    }


                });
            var ext = re.exec(currentFile0.name)[1];
            data.answerPhoto0 = data.answerPhoto0 + '.' + ext;
        }
        if (currentFile1 != undefined) {




            setProgress1(0);
            data.answerPhoto1 = makeid(10);
            UploadService.upload(currentFile1, (event) => {
                setProgress1(Math.round((100 * event.loaded) / event.total));
            }, data.answerPhoto1).then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
                .then((files) => {
                    setImageInfos(files.data);
                })
                .catch((err) => {
                    setProgress(0);

                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage("Could not upload the Image!");
                    }


                });
                var ext = re.exec(currentFile1.name)[1];
                data.answerPhoto1 = data.answerPhoto1 + '.' + ext;
        }
      
        if (currentFile2 != undefined) {
            setProgress2(0);
            data.answerPhoto2 = makeid(10);
            UploadService.upload(currentFile2, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            }, data.answerPhoto2).then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
                .then((files) => {
                    setImageInfos(files.data);
                })
                .catch((err) => {
                    setProgress2(0);

                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage("Could not upload the Image!");
                    }


                });
            var ext = re.exec(currentFile2.name)[1];
            data.answerPhoto2 = data.answerPhoto2 + '.' + ext;
        }
        if (currentFile3 != undefined) {
            setProgress3(0);
            data.answerPhoto3 = makeid(10);
            UploadService.upload(currentFile3, (event) => {
                setProgress(Math.round((100 * event.loaded) / event.total));
            }, data.answerPhoto3).then((response) => {
                setMessage(response.data.message);
                return UploadService.getFiles();
            })
                .then((files) => {
                    setImageInfos(files.data);
                })
                .catch((err) => {
                    setProgress3(0);

                    if (err.response && err.response.data && err.response.data.message) {
                        setMessage(err.response.data.message);
                    } else {
                        setMessage("Could not upload the Image!");
                    }


                });
            var ext = re.exec(currentFile3.name)[1];
            data.answerPhoto3 = data.answerPhoto3 + '.' + ext;
        }


        const question = {
            questionId: data.idQuestion==undefined?null: data.idQuestion,
            lever: data.lever,
            grade: data.grade,
            subject: data.subject,
            name: data.name,
            content: data.content.replace('<p>', '').replace('</p>', ''),
            photo: data.photo==undefined?null: data.photo,
            created: new Date,
            type: checkCorrect == false ? 'One Choice' : 'Multiple Choice',
            status: true
        }

        let answers = [];

        if (gh == 2) {
            const answer1 = {
                answerId: data.idAns0==undefined?null:data.idAns0,
                photo: data.answerPhoto0==undefined?null: data.answerPhoto0,
                status: data.correct0,
                content: data.content0.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer1);
            const answer2 = {
                answerId: data.idAns1==undefined?null:data.idAns1,
                photo: data.answerPhoto1==undefined?null:data.answerPhoto1,
                status: data.correct1,
                content: data.content1.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer2);
        } else if (gh == 3) {
            const answer1 = {
                answerId: data.idAns0==undefined?null:data.idAns0,
                photo: data.answerPhoto0==undefined?null: data.answerPhoto0,
                status: data.correct0,
                content: data.content0.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer1);
            const answer2 = {
                answerId: data.idAns1==undefined?null:data.idAns1,
                photo: data.answerPhoto1==undefined?null:data.answerPhoto1,
                status: data.correct1,
                content: data.content1.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer2);
            const answer3 = {
                answerId: data.idAns2==undefined?null:data.idAns2,
                photo: data.answerPhoto2==undefined?null:data.answerPhoto2,
                status: data.correct2,
                content: data.content2.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer3);
        } else if (gh == 4) {
            const answer1 = {
                answerId: data.idAns0==undefined?null:data.idAns0,
                photo: data.answerPhoto0==undefined?null: data.answerPhoto0,
                status: data.correct0,
                content: data.content0.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer1);
            const answer2 = {
                answerId:data.idAns1==undefined?null:data.idAns1,
                photo: data.answerPhoto1==undefined?null:data.answerPhoto1,
                status: data.correct1,
                content: data.content1.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer2);
            const answer3 = {
                answerId: data.idAns2==undefined?null:data.idAns2,
                photo: data.answerPhoto2==undefined?null:data.answerPhoto2,
                status: data.correct2,
                content: data.content2.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer3);
            const answer4 = {
                answerId: data.idAns3==undefined?null:data.idAns3,
                photo: data.answerPhoto3==undefined?null:data.answerPhoto3,
                status: data.correct3,
                content: data.content3.replace('<p>', '').replace('</p>', '')
            }
            answers.push(answer4);
        }
        question.answers = answers;
        if (id == null) {
            console.log(question);
            axios.post('http://localhost:9597/api/question/create', question).then((response) => {
                if (response.status === 200) {
                    history.push("question")
                }
            }).catch((error) => {
                console.log(error);
            })
        } else if (id > 0) {
            console.log(question);
            axios.put('http://localhost:9597/api/question/update', question).then((response) => {
                if (response.status === 200) {
                    history.push("question")
                }
            }).catch((error) => {
                console.log(error);
            })
        }




        setFormData(data);
        setShowMessage(true);

        form.restart();
    };

    const isFormFieldValid = (meta) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };

    const dialogFooter = <div className="flex justify-content-center"><Button label="OK" className="p-button-text" autoFocus onClick={() => setShowMessage(false)} /></div>;
    const uploadOptions = { icon: 'pi pi-fw pi-cloud-upload', iconOnly: true, className: 'custom-upload-btn p-button-success p-button-rounded p-button-outlined none' };


    const selectFile = (event) => {
        currentFile = event.files[0];

    };
    let con;
    return (
        <div className="form-demo">

            <Toast ref={toast}></Toast>
            <div className="flex justify-content-center">
                <div className="card">
                    <Form onSubmit={onSubmit} initialValues={{ lever: levers.find(s => s.leverId === question?.leverId), grade: grades.find(s => s.gradeId === question?.gradeId), subject: subjects.find(s => s.subjectId === question?.subjectId), name: question?.name, content: question?.content, content0: answers[0]?.content, content1: answers[1]?.content, content2: answers[2]?.content, content3: answers[3]?.content, correct0: answers[0] != null ? answers[0]?.status : true, correct1: answers[1] != null ? answers[1]?.status : false, correct2: answers[2] != null ? answers[2]?.status : false, correct3: answers[3] != null ? answers[3]?.status : false, photo: question?.photo, answerPhoto0: answers[0]?.photo, answerPhoto1: answers[1]?.photo, answerPhoto2: answers[2]?.photo, answerPhoto3: answers[3]?.photo, idQuestion: question?.questionId, idAns0: answers[0]?.answerId, idAns1: answers[1]?.answerId, idAns2: answers[2]?.answerId, idAns3: answers[3]?.answerId }} validate={validate} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid">
                            <div className='row'>
                                <div className='col-4'>
                                    <Field name="lever" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown id="lever" {...input} options={levers} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="lever" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Lever*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                </div>
                                <div className='col-4'>
                                    <Field name="subject" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown id="subject" {...input} options={subjects} optionLabel="name" filter filterBy="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                                <label htmlFor="subject" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Subject*</label>
                                            </span>
                                            {getFormErrorMessage(meta)}
                                        </div>
                                    )} />
                                </div>
                                <div className='col-4'> <Field name="grade" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="grade" {...input} options={grades} optionLabel="name" className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="grade" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Grade*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} /></div>

                            </div>

                            <Field name="name" render={({ input, meta }) => (
                                <div className="field">
                                    <span className="p-float-label p-input-icon-right">
                                        <InputText id="name" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                        <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Name</label>
                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <Field name="photo" render={({ input, meta }) => (
                                <div className="field" style={{ textAlign: 'left' }}>

                                    <label style={{ color: '#757575' }}>Photo</label>
                                    <span className="p-float-label p-input-icon-right">
                                        <div className='row'>
                                            <div className='col-2'> <Image src={`http://localhost:9597/files/` + input.value} alt="Image" width="250" preview /></div>
                                            <div className='col-10'><FileUpload name="demo[]" onUpload={onUpload} accept="image/*" maxFileSize={1000000} onSelect={selectFile} onRemove={() => { currentFile = undefined; }} onClear={() => { currentFile = undefined; }}
                                                uploadOptions={uploadOptions} customUpload={true}
                                                emptyTemplate={<p className="m-0">Drag and drop files to here to upload.</p>} /></div>
                                        </div>

                                    </span>
                                </div>
                            )} />
                            <Field name="content" render={({ input, meta }) => (
                                <div className="field" style={{ textAlign: 'left' }}>
                                    <label style={{ color: '#757575' }}>Content</label>
                                    <span className="p-float-label">

                                        <Editor {...input} onTextChange={(event) => { input.onChange(event.htmlValue) }} id="content" headerTemplate={header} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} style={{ height: '200px' }} maxLength={300} size={30} />

                                    </span>
                                    {getFormErrorMessage(meta)}
                                </div>
                            )} />
                            <div className='card'>
                                <div className="flow">
                                    {points.map((point, index) => (
                                        <PointPanel
                                            key={index}
                                            ley={index}
                                            expanded={expanded}
                                            handleChange={handleChange}

                                        />
                                    ))}
                                    <div className='row'>
                                        <div className='col-5'></div>
                                        <div className='col-2'> <Button disabled={gh == 4 ? "disabled" : ''} className="add-waypoint" onClick={() => { addPoint(); setGh(gh + 1); console.log(gh) }}>
                                            Add
                                        </Button></div>
                                        <div className='col-5'></div>
                                    </div>

                                </div>

                            </div>
                            <div className='row'>
                                <div className='col-11'></div>
                                <div className='col-1'>  <Button type="submit" label="Save" className="mt-2" /></div>
                            </div>

                        </form>
                    )} />
                </div>
            </div>
        </div>
    );
}
