import React, { useEffect, useRef, useState } from "react";
import styled from 'styled-components'
import { Dialog } from 'primereact/dialog';
import bg1 from '../../../assets/bg1.jpg'
import { IoIosContact } from 'react-icons/io'
import { AiFillPhone } from 'react-icons/ai'
import { MdEmail } from 'react-icons/md'
import { FaAddressCard } from 'react-icons/fa'
import { GrStatusCriticalSmall } from 'react-icons/gr'
import { AiOutlineCheck } from 'react-icons/ai'
import { FaKey } from 'react-icons/fa'
import UploadService from "../../../services/file-upload-service";
import axios from "axios";
import { Toast } from 'primereact/toast';

import { Form, Field } from 'react-final-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Password } from 'primereact/password';

import { Divider } from 'primereact/divider';
import { classNames } from 'primereact/utils';


export const Profile = ({ account, setModalChangePasswordOpen }) => {
    const [displayBasic, setDisplayBasic] = useState(false);
    const [position, setPosition] = useState('center');
    const [currentFile, setCurrentFile] = useState(undefined);
    const [previewImage, setPreviewImage] = useState(undefined);
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("");
    const [imageInfos, setImageInfos] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [formData, setFormData] = useState({});
    const toast = useRef(null);
    const handleChangePassword = () => {
        setModalChangePasswordOpen(true);
    }
    const dialogFuncMap = {
        'displayBasic': setDisplayBasic
    }

    const onClick = (name, position) => {
        dialogFuncMap[`${name}`](true);

        if (position) {
            setPosition(position);
        }
    }
    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const selectFile = (event) => {
        setCurrentFile(event.target.files[0]);
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setProgress(0);
        setMessage("");
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
    const upload = () => {
        setProgress(0);
        let avatar = makeid(20);
        UploadService.upload(currentFile, (event) => {
            setProgress(Math.round((100 * event.loaded) / event.total));
        }, avatar)
            .then((response) => {
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

                setCurrentFile(undefined);
            });
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(currentFile.name)[1];
        avatar = avatar + '.' + ext;
        axios.get('http://localhost:9597/api/account/updateAvatar/' + account.username + '/' + avatar).then((res) => {
            if (res.status === 200) {
                if (res?.data.result == true) {
                    account.avatar = avatar;
                    showSuccess();
                    setPreviewImage(undefined);
                } else {
                    showError();
                    setPreviewImage(undefined);
                }
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    const showSuccess = () => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: '', life: 3000 });
    }

    const showError = (a) => {
        toast.current.show({ severity: 'error', summary: 'Error', detail: a, life: 3000 });
    }

    const validate = (data) => {
        let errors = {};

        if (!data.password) {
            errors.password = 'Password is required.';
        }

        if (!data.newPassword) {
            errors.newPassword = 'New Password is required.';
        }

        if (!data.confirmPassword) {
            errors.confirmPassword = 'Confirm Password is required.';
        } else if (data.newPassword != data.confirmPassword) {
            errors.confirmPassword = 'Confirm Password not match.';
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
        const change = {
            username: account.username,
            password: data.password,
            newPass: data.newPassword
        }

        axios.put("http://localhost:9597/api/account/changePassword", change).then((res) => {
           if (res.status === 200) {
              let status = res?.data.result;
              if (status===0) {
                showError('Wrong Password');
              }else if (status===1) {
                showError('');
              }else if (status===2) {
                showSuccess();
                onHide('displayBasic');
                form.restart();
              }
           }

         }).catch((err) => console.log(err))
      
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
        <Wrapper>
            <Dialog header="Change Password" visible={displayBasic} style={{ width: '30vw' }} onHide={() => onHide('displayBasic')}>
                <div className="flex justify-content-center">
                    <div className="card">
                        <Form onSubmit={onSubmit} initialValues={{ password: '', username: account.username }} validate={validate} render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">

                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} feedback={false} autoFocus />
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <br></br>

                                <Field name="newPassword" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="newPassword" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                            <label htmlFor="newPassword" className={classNames({ 'p-error': isFormFieldValid(meta) })}>New Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <br></br>
                                <Field name="confirmPassword" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="confirmPassword" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} feedback={false} />
                                            <label htmlFor="confirmPassword" className={classNames({ 'p-error': isFormFieldValid(meta) })}  >Confirm Password*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />

                                <br></br>


                                <Button type="submit" label="Submit" className="mt-2" />
                            </form>
                        )} />
                    </div>
                </div>

            </Dialog>
            <Toast ref={toast} />
            <div className="profile_left" >
                <div className="background_cover" ></div>

                <div className="profile_left_content" >
                    <div className="img_wrapper" >
                        <img className="avatar" src={previewImage === undefined ? "http://localhost:9597/files/" + account.avatar : previewImage} alt='avatar' />
                        <div className="change-avatar" >
                            <label className="input-file-btn">
                                <input type="file" accept="image/*" onChange={selectFile} />
                                Choose Image
                            </label>

                            <button
                                disabled={!currentFile}
                                onClick={upload}>
                                Upload
                            </button>
                        </div>
                    </div>

                    <div className="profile_detail" >
                        <h1>{`${account.firstName} ${account.lastName}`.toUpperCase()}</h1>
                        <div className="profile_detail_sub">
                            <div className="profile_detail_row" >
                                <p>Class:</p>
                                <p>{account.classes}</p>
                            </div>

                            <div className="profile_detail_row" >
                                <p>Birthday:</p>
                                <p>{account.dob}</p>
                            </div>

                            <div className="profile_detail_row" >
                                <p>Gender:</p>
                                <p>{account.gender === false ? 'Male' : 'Female'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile_right" >

                <div className="profile_edit_wrapper" >
                    <button className="btn_edit" onClick={() => onClick('displayBasic')}  ><span style={{ marginRight: '10px' }} ><FaKey /></span>Change Password</button>
                </div>

                <div className="profile_contact" >
                    <h2><span><IoIosContact /></span>Contact Info</h2>
                    <div className="profile_contact_container" >
                        <div className="profile_contact_row" >
                            <p><span><AiFillPhone /></span> Phone:</p>
                            <p>{account.phone}</p>
                        </div>

                        <div className="profile_contact_row" >
                            <p><span><MdEmail /></span>Email:</p>
                            <p>{account.email}</p>
                        </div>

                        <div className="profile_contact_row" >
                            <p><span><FaAddressCard /></span>Address:</p>
                            <p>{account.address}</p>
                        </div>

                        <div className="profile_contact_row" >
                            <p><span><GrStatusCriticalSmall /></span>Status:</p>
                            <p>{account.status}</p>
                        </div>
                    </div>
                </div>

                <div className="profile_intro" >
                    <h2>About {`${account.firstName} ${account.lastName}`.toUpperCase()}</h2>
                    <div className="quotes_container" >
                        <p>
                            <span><AiOutlineCheck /></span>
                            <span>
                                “I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.”
                            </span>
                        </p>

                        <p>
                            <span><AiOutlineCheck /></span>
                            <span>
                                “You know you're in love when you can't fall asleep because reality is finally better than your dreams.”
                            </span>
                        </p>

                        <p>
                            <span><AiOutlineCheck /></span>
                            <span>
                                “If you want to know what a man's like, take a good look at how he treats his inferiors, not his equals.”
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .profile_left {
        position: relative;
        height: 100vh;
        .background_cover {
            height: 100%;
            width: 100%;
            background: url(${bg1}) top center / cover no-repeat;
            filter: blur(8px);
            -webkit-filter: blur(8px);
        }

        .profile_left_content {
            position: absolute;
            top: 0%;
            left: 0%;
            width: 100%;
            height: 100%;

            background-color: rgba(0, 0, 255, 0.2);
            background-color: rgba(0, 0, 0, 0.5);

            .img_wrapper {
                width: 100%;
                text-align: center;
                padding: 50px 0;
                .avatar {
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    box-shadow: 0 0 5px 5px #ccc;
                }

                .change-avatar {
                    margin-top: 25px;
                    padding: 0 25%;

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    label {
                        border: 1px solid #ccc;
                        border-radius: 10px;
                        display: inline-block;
                        padding: 12px 20px;
                        cursor: pointer;
                        color: #fff;
                        background-color: #537895;

                        input[type="file"] {
                            display: none;
                        }
                    }

                    button {
                        padding: 10px 25px;
                        font-size: 1.4rem;
                        background-color: #0ba360;
                        color: #fff;
                        border: none;
                        border-radius: 10px;
                    }
                }
            }
    
            .profile_detail {
                h1 {
                    text-align: center;
                    color: wheat;
                }
                .profile_detail_sub {
                    padding: 30px 180px;
                    .profile_detail_row {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        & p:first-child {
                            font-size: 1.5rem;
                            line-height: 1;
                            color: #ccc;
                            font-style: italic;
                            font-weight: 500;
                        }
    
                        & p:last-child {
                            font-size: 1.2rem;
                            line-height: 1;
                            background: linear-gradient(310.6deg, rgba(100, 0, 233, 0.94) 6.8%, rgba(166, 0, 188, 0.66) 57.8%);
                            padding: 5px;
                            color: white;
                            font-style: italic;
                            font-weight: 500;
                            width: 150px;
                            text-align: right;
                            border-radius: 2px;
                        }
                    }
                }
            }
        }
    }

    .profile_right {
        background: radial-gradient(circle at 0% 0.5%, rgb(241, 241, 242) 0.1%, rgb(224, 226, 228) 100.2%);

        .profile_edit_wrapper {
            display: flex;
            justify-content: flex-end;
            padding: 50px;

            button {
                padding: 20px 25px;
                color: #fff;
                background: radial-gradient(circle at 10% 20%, rgb(0, 107, 141) 0%, rgb(0, 69, 91) 90%);
                font-size: 1.5rem;
                border: none;
                border-radius: 20px;

                &:hover {
                    cursor: pointer;
                }
            }
        }

        .profile_contact {
            padding: 0 50px;

            h2 {
                font-size: 2.2rem;
                display: flex;
                place-items: center;
                line-height: 2.2rem;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
                padding: 7px;
                color: #fff;
                margin: 0;

                span {
                    display: inline-block;
                    margin-right: 10px;
                }
            }

            .profile_contact_container {

                padding: 20px;
                background: radial-gradient(circle at 10% 20%, rgb(255, 252, 214) 0%, rgba(255, 102, 102, 0.44) 90%);

                .profile_contact_row {

                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    & p:first-child {

                    }

                    & p:last-child {

                    }

                    & p {
                        display: flex;
                        place-items: center;
                        font-size: 1.4rem;
                        line-height: 1.4;
                        margin: 0;
                        margin-bottom: 5px;

                        span {
                            display: inline-block;
                            margin-right: 5px;
                        }
                    }
                }
            }
        }


        .profile_intro {
            padding: 50px;

            h2 {
                background: linear-gradient(to top, #09203f 0%, #537895 100%);
                padding: 10px;
                color: #fff;
                margin: 0;
            }

            .quotes_container {
                padding: 15px;
                color: #333;
                background: linear-gradient(99.6deg, rgb(112, 128, 152) 10.6%, rgb(242, 227, 234) 32.9%, rgb(234, 202, 213) 52.7%, rgb(220, 227, 239) 72.8%, rgb(185, 205, 227) 81.1%, rgb(154, 180, 212) 102.4%);
                
                p {
                    font-size: 1.2rem;
                    line-height: 1.2rem;
                    padding: 0;
                    margin: 0;
                    margin-bottom: 20px;
                    display: flex;
                    justify-content: space-between;
    
                    & span:first-child {
                        display: inline-block;
                        margin-right: 5px;
                        font-size: 1.3rem;
                    }
    
                    & span:last-child {
                        display: inline-block;
                        font-style: italic;
                    }
                }
            }

        }
    }
    
`

