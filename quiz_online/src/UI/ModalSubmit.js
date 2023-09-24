import React from "react";
import "./Modal.css";
import { Link } from "react-router-dom";
import {AiFillCloseCircle} from 'react-icons/ai'
import question from '../assets/question.png'
import axios from "axios";


function ModalSubmit({ setOpenModal, exam, scoreFromDoExam, account }) {

    const insertScore = () => {
      const re = {
        idExam: exam.examId,
        username: account.username,
        numberCorrect: scoreFromDoExam
  
      }

      axios.post('http://localhost:9597/api/result/create', re).then((res) => {
             
      }).catch((er) => {
        console.log(er);
      })
      setOpenModal(false);
    }

    return (
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
            >
              <AiFillCloseCircle/>
            </button>
          </div>

          <div className="title">
            <h1>Sure submit exam ?</h1>
            <span>Note: This action won't be return</span>
          </div>

          <div className="body">
            <p>
                <img src={question} alt="student-logo" width="300px" height="200px" />
            </p>
          </div>
          <div className="footer">
            <button
              onClick={() => {
                setOpenModal(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            {/* <button
                onClick={handleContinue}
            >Continue</button> */}
            <Link to={`/student/result/${exam.examId}/${scoreFromDoExam}/${account.username}`} onClick={() => {insertScore()}} 
                  className='btn-continue'
            >
                   Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default ModalSubmit;


