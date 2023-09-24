import React, { useEffect, useState } from "react";

import styled from "styled-components";

export const Question = ({question, answers, number, position, dataFromQuestion}) => {
    const {questionId, name, content, type} = question;
    const [btnChoose, setBtnChoose] = useState(null);
    const [btnMul, setBntMul] = useState([]);
    const [btnMulStatus, setBtnMulStatus] = useState(['false', 'false', 'false', 'false']);
    //const [btnMulStatus, setBtnMulStatus] = useState([]);


    const handleChoose = (status, number, index, contentAnswer) => {
        if(type === 'One Choice') {
            setBtnChoose(index)
            if(status === 'true') {
                dataFromQuestion('true', number, 'One Choice');
            } else {
                dataFromQuestion('false', number, 'One Choice');
            }
        } else {
            let index = btnMul.indexOf(contentAnswer);
            console.log(index);
                console.log(contentAnswer);
                if(index !== -1) {
                    setBntMul(prev => {
                        const new_arr = prev.filter(p => p !== contentAnswer)
                        return [...new_arr]
                    })
    
                    //TH Click lại
                    setBtnMulStatus(prev => {
                        if(status === 'true') prev[index] = 'false';
                        else if(status === 'false') prev[index] = 'false';
                        else if(status === 'abc') prev[index] = 'false';
                        return [...prev];
                    })
                } 
                else {
                    setBntMul(prev => [...prev, contentAnswer])
                    //setBtnMulStatus(prev => [...prev, status]);
                    let length = btnMul.length;
                    console.log(length);
                    setBtnMulStatus(prev => {
                        prev[length] = status === 'false' ? 'abc' : status
                        return [...prev];
                    })
                }
        }
    }


    const renderAnswer = (questionId) => {
        const answerByQuestion = answers && 
            answers
                .filter((a, i) => a.questionId === questionId)
                .map((a, index) => {
                    if(type === 'One Choice') {
                        return (
                            <button className={`${index === btnChoose ? 'btn-active': null}`} 
                                    key={a.answerId} value={a.status} 
                                    onClick={(e) => handleChoose(e.target.value, number, index, a.content)} 
                            >
                                {a.content}
                            </button>
                        )
                    }

                    else {
                        return (
                            <button className={`${btnMul.find(b => b === `${a.content}`) ? 'btn-active' : null}`}
                                    key={a.answerId} value={a.status} 
                                    onClick={(e) => handleChoose(e.target.value, number, index, a.content)}
                            >
                                {a.content}
                            </button>
                        )
                    }
                }
                    )
        return answerByQuestion;
    }

    let isApiSubscribed = true;
    useEffect(() => {
        if(isApiSubscribed) {
            console.log(btnMul);
            console.log(btnMulStatus);
            dataFromQuestion(btnMul, number, 'Multiple Choice', btnMulStatus)
        }

        return () => {
            isApiSubscribed = false;
        }

    }, [btnMul, btnMulStatus])

    return (
        <Wrapper>
            {
                <div key={questionId} className={`question_container ${position}`} >
                    <p>{`${number} - / ${name}`}</p>
                    <p>{content}</p>
                    <div className="answer_container" >
                        {renderAnswer(questionId)}
                    </div>
                </div>
            }
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .question_container {
        background: linear-gradient(180.2deg, rgb(30, 33, 48) 6.8%, rgb(74, 98, 110) 131%);
        padding: 20px 50px;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: ll 0.3s linear;

        p {
            margin: 2px 0;
            color: #fff;
        }
        
        & p:first-child {
            font-size: 2.5rem;
            font-weight: 600;
        }

        & p:nth-child(2) {
            font-size: 2rem;
            margin-left: 80px;
        }

        &.activeQuestion {
            opacity: 1;
            transform: translateX(0);
        }

        &.lastQuestion {
            transform: translateX(-100%);
        }

        &.nextQuestion {
            transform: translateX(100%);
        }

        .answer_container {
            padding: 20px 50px;
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 25px 50px;
            margin-top: 30px;

            button {
                padding: 15px;
                border-radius: 20px;
                background-color: #fff;
                font-size: 1.5rem;
                border: none;

            }

            button.btn-active {
                background: linear-gradient(109.6deg, rgb(102, 203, 149) 11.2%, rgb(39, 210, 175) 98.7%);
            }
        }
    }
`