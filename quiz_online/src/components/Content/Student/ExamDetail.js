import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from 'styled-components'
import axios from 'axios';

export const ExamDetail = () => {
    const {id, username} = useParams();

    const [exam, setExam] = useState([]);
    const url = `http://localhost:9597/api/exam/find/${id}`;

    const [subjects, setSubjects] = useState([]);
    const url2 = `http://localhost:9597/api/subject/findAllSubject`;

    const [results, setResults] = useState([]);
    const url3 = `http://localhost:9597/api/result/findResultByUsername/${username}`;

    const [loading, setLoading] = useState(true);

    const getExam = async () => {
        axios
            .get(url)
            .then((response) => {
                if (response.status === 200) {
                    setExam(response?.data); 
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getSubjects = async () => {
        axios
            .get(url2)
            .then((response) => {
                if (response.status === 200) {
                    setSubjects(response?.data); 
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getResults = async () => {
        axios
            .get(url3)
            .then((response) => {
                if (response.status === 200) {
                    setResults(response?.data);
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getSubjects();
        getExam();
        getResults();
    }, [])

    const renderGrade = () => {
        if(exam.gradeId === 1) {
            return <span>10</span>
        } else if(exam.gradeId === 2) {
            return <span>11</span>
        } else if(exam.gradeId === 3) {
            return <span>12</span>
        }
    }

    const formatDate = () => {
        var date = new Date(exam.created);
        return date.toLocaleDateString('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        })
    }

    const renderSubject = () => {
        const subjectId = exam.subjectId;
        const subject = subjects.find(s => s.subjectId === subjectId)
        if(subject) return subject.name;
    }

    const renderFetchExam = () => {
        const result = results.find(r => r.examId === id);

        if(!result)
        return (
            <Link to={`/student/doExam/${id}/${exam.subjectId}`} className='btn_exam_detail' >
                Do Exam
            </Link>
        )
    }

    return (
        <Wrapper>
        <h1>Welcome to {exam.name} Exam - {id}</h1>
        {
            loading === false ? 

           <div className="details" >
                <div className="row_detail">
                    <p>Name:</p>
                    <p>{exam.name}</p>
                </div>

                <div className="row_detail">
                    <p>Subject:</p>
                    <p>{renderSubject()}</p>
                </div>

                <div className="row_detail">
                    <p>Time:</p>
                    <p>{exam.time} minutes</p>
                </div>

                <div className="row_detail">
                    <p>Grade:</p>
                    <p>{renderGrade()}</p>
                </div>

                <div className="row_detail">
                    <p>Quantity Questions:</p>
                    <p>{exam.easy + exam.medium + exam.hard} questions</p>
                </div>

                <div className="row_detail">
                    <p>Created:</p>
                    <p>{formatDate()}</p>
                </div>

                <div className="row_detail">
                    <p>Type:</p>
                    <p>Quiz</p>
                </div>

                <div className="row_detail">
                    <p>Explain:</p>
                    <p>No Explain</p>
                </div>

                <div className="row_action" >
                    {
                        renderFetchExam()
                    }

                    <Link to={`/student/listexam/${username}`} className='btn_back_to_exams' >
                        Back
                    </Link>
                </div>


           </div>

           :

           ''
        }
        </Wrapper>
    )
}

const Wrapper = styled.div`

    display: flex;
    align-items: center;
    flex-direction: column;

    background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 5s ease infinite;

    min-height: 100vh;

    @keyframes gradient {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}

    h1 {
        font-style: italic;
        font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
        font-size: 2.5rem;
        margin-top: 50px;
    }

    .details {
        border: 3px solid #333;
        padding: 25px 40px;
        border-radius: 10px;
        width: 500px;
        margin-top: 25px;
        background: radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%);

        .row_detail {
            display: flex;
            justify-content: space-between;
            align-items: center;

            p {
                font-size: 1.2rem;
                line-height: 1.2rem;
                margin: 10px 0;
            }

            & p:first-child {
                font-weight: 700;
            }

            & p:last-child {
                font-size: 1.2rem;
            }
        }

        .row_action {
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;

            .btn_back_to_exams {
                padding: 10px;
                display: inline-block;
                background: linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%);
                color: #fff;
                border-radius: 5px;
                font-weight: 700;
                width: 100px;
                text-align: center;
            }
        }
    }

`