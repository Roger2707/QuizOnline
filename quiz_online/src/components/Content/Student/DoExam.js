import axios from "axios";
import React, { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import styled from "styled-components";
import { Question } from "./Question";
import {FiClock} from 'react-icons/fi'
import {GrFormNextLink, GrFormPreviousLink} from 'react-icons/gr'

export const DoExam = ({setModalOpen, dataFromResult, account}) => {

    const {id, subjectId} = useParams();
    const history = useHistory();

    const [exam, setExam] = useState([]);
    const urlExam = `http://localhost:9597/api/exam/find/${id}`;

    const [questions, setQuestions] = useState([]);
    const urlQuestions = `http://localhost:9597/api/question/findBySubject/${subjectId}`;

    const [answers, setAnswers] = useState([]);
    const urlAnswers = `http://localhost:9597/api/answer/findAll`;

    const [currentQuestion, setCurrentQuestion] = useState(0);
    
    const [answersResult, setAnswersResult] = useState([]);

    // Binding data children component
    const [data, setData] = useState('');
    const [dataMul, setDataMul] = useState([]);

    // Score
    const [score, setScore] = useState(0);

    // Timer
    const [countdown, setCountDown] = useState(1000);
    const timeId = useRef();

    const getExam = async () => {
        axios
            .get(urlExam)
            .then((response) => {
                if (response.status === 200) {
                    setExam(response?.data);
                    setCountDown(response?.data.time*60)
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getQuestions = async () => {
        axios
            .get(urlQuestions)
            .then((response) => {
                if (response.status === 200) {
                    setQuestions(response?.data); 
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAnswers = async () => {
        axios
            .get(urlAnswers)
            .then((response) => {
                if (response.status === 200) {
                    setAnswers(response?.data); 
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getExam();
        getQuestions();
        getAnswers();
    }, [])


    // Handle Click Next Prev Question
    useEffect(() => {
        const lastQuestion = questions.length - 1;
        if (currentQuestion < 0) {
          setCurrentQuestion(lastQuestion);
        }
        if (currentQuestion > lastQuestion) {
          setCurrentQuestion(0);
        }
      }, [currentQuestion, questions]);


      // Data from children
      const dataFromQuestion = (data, number, typeQuestion, dataMul) => {

        console.log(typeQuestion);
        console.log(`dataMulStatus: ${dataMul}`);

        if(typeQuestion === 'One Choice') {
            if(answersResult.length === 0) {
                setData(data);
                setAnswersResult(prevState => [...prevState, data]);
            }
            else if(number > answersResult.length ) {
                setData(data);
                setAnswersResult(prevState => [...prevState, data]);
            } 
            else if(number <= answersResult.length) {
                setAnswersResult(prevState => {
                    const tempArr = [...prevState];
                    setData(data);
                    tempArr[number - 1] = data;
                    return tempArr;
                })
            }
        } else {

            const valueMul = dataMul.filter(d => d === 'true');
            const valueMul2 = dataMul.filter(d => d === 'false');
            const valueMul3 = dataMul.filter(d => d === 'abc');

            if(valueMul) {

                console.log("True []: " + valueMul);
                console.log("False []: "+valueMul2);
                console.log("avc []: " + valueMul3);

                if(valueMul) {
                    if(valueMul2.length > 0 && valueMul3.length === 0) {
                        if(answersResult.length === 0) {
                            if(valueMul.length === 3) {
                             setAnswersResult(prev => {
                                 return [...prev, 'true'];
                             })
         
                            } else {
                             setAnswersResult(prev => {
                                 return [...prev, 'false'];
                             })
                            }
                         } else {
                             if(valueMul.length === 3) {
                                 setAnswersResult(prev => {
                                     prev[number - 1] = 'true';
                                     return [...prev];
                                 })
                             } else {
                                 setAnswersResult(prev => {
                                     prev[number - 1] = 'false';
                                     return [...prev];
                                 })
                             }
                         }
                    } else if(valueMul3.length > 0) {
                        if(answersResult.length === 0) {
                            setAnswersResult(prev => {
                                return [...prev, 'false'];
                            })
                         } else {
                            setAnswersResult(prev => {
                                prev[number - 1] = 'false';
                                return [...prev];
                            })
                         }
                    }
                }
            }
        }
    }

    let status = true;
    useEffect(() => {

        if(status) {
            console.log(answersResult);
            console.log(currentQuestion);
        
            setScore(answersResult.filter(a => a === 'true').length);
        }
        return () => {
            status = false;
        }
    }, [answersResult, currentQuestion, score]);

    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let second = Math.floor(time - minutes * 60)

        if(minutes <= 10) minutes = '0' + minutes;
        if(second <= 10) second = '0' + second;

        return minutes + ':' + second;
    }

    useEffect(() => {
        timeId.current = setInterval(() => {
            setCountDown(prev => prev - 1)
        }, 1000)

        return () => clearInterval(timeId.current)
    }, [])
    useEffect(() => {
        if(countdown <= 0) {
            clearInterval(timeId.current);
            const re = {
                idExam: exam.examId,
                username: account.username,
                numberCorrect: score
              }
        
              axios.post('http://localhost:9597/api/result/create', re).then((res) => {
                     
              }).catch((er) => {
                console.log(er);
              })
            history.push(`/student/result/${exam.examId}/${score}/${account.username}`);
        }
    }, [countdown])


    const calcScore = () => {
        setModalOpen(true);
        dataFromResult(score, exam);
    }

    return (
        <Wrapper>
            <div className="title-container">
                <h1>{exam.name}</h1>
                <h2><span><FiClock/></span> {formatTime(countdown)}</h2>
            </div>

            <div className="exam_container" >
                {
                    questions &&
                    questions.map((q, i) => {

                        let position = 'nextQuestion';
                        if(i === currentQuestion) {
                            position = 'activeQuestion';
                        }
                        if(
                            i === currentQuestion - 1 ||
                            (currentQuestion ===0 && i === questions.length - 1 )
                        ) {
                            position = 'lastQuestion';
                        }

                        return (
                            <Question
                                key={i}
                                question = {q}
                                answers = {answers}
                                number = {i+1}
                                position = {position}
                                dataFromQuestion = {dataFromQuestion}
                            />
                        )
                    })
                }
            </div>
            <div className="action_container" >
                {
                    currentQuestion !== 0 &&
                    <button onClick={() => setCurrentQuestion(currentQuestion - 1)} >
                        <span><GrFormPreviousLink style={{fontSize: '4rem'}} /></span>
                    </button>
                }

                {
                    currentQuestion < questions.length - 1 &&
                    <button onClick={() => setCurrentQuestion(currentQuestion + 1)} >
                        <span><GrFormNextLink style={{fontSize: '4rem'}} /></span>
                    </button>
                }
                {
                    currentQuestion < questions.length - 1 ||
                    <button className="openModalBtn btn-finish" onClick={calcScore} >FINISH</button>
                }
            </div>

            <span>Score: {score} / {questions.length}</span>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    padding: 50px;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 24.1% 68.8%, rgb(50, 50, 50) 0%, rgb(0, 0, 0) 99.4%);
    color: #fff;

    .title-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h1 {
            font-size: 2.8rem;
            font-family: Georgia, 'Times New Roman', Times, serif;
            font-style: italic;
        }
        h2 {
            line-height: 1.8rem;
            font-size: 1.8rem;

            display: flex;
            align-items: center;

            span {
                display: inline-block;
                margin-right: 10px;
            }
        }
    }


    .exam_container {

        position: relative;
        border: 5px solid #ccc;
        border-radius: 10px;
        width: 100%;
        height: 450px;
        overflow: hidden;
        margin-top: 30px;
    }

    .action_container {
        width: 100%;
        margin-top: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;

        button {
            padding: 0px 35px;
            border: none;
            border-radius: 5px;
            font-weight: 700;
            background: radial-gradient(755px at 10.1% 95.3%, rgb(242, 188, 141) 0%, rgb(242, 159, 141) 100.2%);

            span {
                display: inline-block;
            }
        }

        .btn-finish {
            background: linear-gradient(102.2deg, rgb(250, 45, 66) 9.6%, rgb(245, 104, 104) 96.1%);
            color: #fff;
            padding: 15px 35px;
            font-size: 1.6rem;
        }
    }
    
`