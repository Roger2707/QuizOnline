import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Sidebar } from "../Layouts/Student/Sidebar";
import { Dashboard } from "../Content/Student/Dashboard";
import { ListExams } from "../Content/Student/ListExams";
import { ExamDetail } from "../Content/Student/ExamDetail";
import { DoExam } from "../Content/Student/DoExam";
import { ResultTable } from "../Content/Student/ResultTable";
import { fetchUserData } from "../../api/authenticationService";
import { Header } from "../Layouts/Student/Header";
import { Profile } from "../Content/Student/Profile";
import ModalSubmit from "../../UI/ModalSubmit";
import ModalChangePassword from "../../UI/ModalChangePassword";
import { History } from "../Content/Student/History";
import { Footer } from "../Layouts/Footer";

export const HomeStudent = () => {
    const [account, setAccount] = useState([]);
    const [scoreFromDoExam, setScoreFromDoExam] = useState(0);
    const [exam, setExam] = useState(null);

    // Modal
    const [modalOpen, setModalOpen] = useState(false);
    const [modalChangePasswordOpen, setModalChangePasswordOpen] = useState(false);

    useEffect(()=>{
        fetchUserData().then((response)=>{
            setAccount(response.data);
        }).catch((e)=>{
            localStorage.clear();
            console.log(e);
        })
    },[])
    const dataFromResult = (score, exam) => {
        setScoreFromDoExam(score);
        setExam(exam);
      }
    return (
        <Wrapper>
            <>
            {modalOpen && <ModalSubmit setOpenModal={setModalOpen} scoreFromDoExam={scoreFromDoExam} exam={exam} account={account} />}
            {modalChangePasswordOpen && <ModalChangePassword setModalChangePasswordOpen={setModalChangePasswordOpen} account={account} />}
                <Header account={account} />

                <div className="container_content" >
                    <Sidebar/>
                    <div className="content" style={{width: '100%'}} >
                        <Switch>
                            <Route exact path="/student" component={Dashboard} />

                            <Route path="/student/listexam/:username" >
                                <ListExams/>
                            </Route>
                            
                            <Route path='/student/examination/:id/:username' children={<ExamDetail/>} />

                            <Route path='/student/doExam/:id/:subjectId' children={ <DoExam setModalOpen={setModalOpen} dataFromResult={dataFromResult} account={account} />} />
                        
                            <Route path="/student/result/:examId/:score/:username" children={<ResultTable account={account} />} />
                        
                            <Route path="/student/profile" >
<Profile account={account} setModalChangePasswordOpen={setModalChangePasswordOpen} />
                            </Route>

                            <Route path='/student/history/:username'>
                                <History username={account.username} />
                            </Route>
                        </Switch>
                    </div>
                </div>

                <Footer/>
            </>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    .container_content {
        margin-top: 70px;
        display: flex;

        .content {
            margin: 0;
            background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%);
        }
    }
`