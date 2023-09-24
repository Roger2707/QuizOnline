import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

export const ResultTable = ({account}) => {
    const {examId, score, username} = useParams();


    const [exam, setExam] = useState([]);
    const url = `http://localhost:9597/api/exam/find/${examId}`;
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

    useEffect(() => {
        getExam();
    }, [])


    return (
        <Wrapper>
            <div className="result-form" >
                <h1>Result:</h1>
                <ul>
                    <li>
                        <p>Exam Name:</p>
                        <p>{exam.name}</p>
                    </li>

                    <li>
                        <p>Participant Name:</p>
                        <p>{`${account.firstName} ${account.lastName}`.toUpperCase()}</p>
                    </li>

                    <li>
                        <p>Username:</p>
                        <p>{account.username}</p>
                    </li>

                    <li>
                        <p>Class:</p>
                        <p>{account.classes}</p>
                    </li>

                    <li>
                        <p>Score:</p>
                        <p>{score}</p>
                    </li>

                    <li>
                        <p>Total:</p>
                        <p>{(score / (exam.easy + exam.medium + exam.hard))*100}%</p>
                    </li>

                    <li>
                        <p>Rank:</p>
                        <p>
                            {
                                (score / (exam.easy + exam.medium + exam.hard))*100 <= 50 ? 'Fail' : 'Pass'
                            }
                        </p>
                    </li>
                </ul>
            </div>
            <Link to='/student' className="btn-back" >
                Back to Dashboard
            </Link>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    margin-top: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;


    .btn-back {
        margin-top: 50px;
        display: inline-block;
        padding: 15px 25px;
        color: #fff;
        background: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
        font-size: 1.2rem;
        border-radius: 20px;

        &:hover {
            cursor: pointer;
            text-decoration: none;
        }
    }

    .result-form {
        border: 2px solid #333;
        padding: 50px 20px;
        width: 700px;
        background: radial-gradient(circle at 10% 20%, rgb(254, 255, 165) 0%, rgb(255, 232, 182) 90%);
        color: #333;
h1 {
            font-size: 2.4rem;
            font-style: italic;
            font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
            text-align: center;
            margin-bottom: 20px;
        }

        ul {
            list-style: none;
            padding: 0;
            margin: 0;

            li {
                padding: 0;
                margin: 0;
                display: flex;
                justify-content: space-between;
                align-items: center;

                p {
                    font-size: 1.6rem;
                }
            }
        }
    }
`