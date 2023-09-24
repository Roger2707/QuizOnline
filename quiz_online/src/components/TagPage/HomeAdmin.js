import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import styled from "styled-components";
import {Dashboard} from "../Content/Admin/Dashboard";
import {Question} from "../Content/Admin/Question/Question";
import {Answer} from "../Content/Admin/Answer";
//import {Exam} from "../Content/Admin/Exam";
import {Student} from "../Content/Admin/Student";
import {Teacher} from "../Content/Admin/Teacher";
//import {Ranking} from "../Content/Admin/Ranking";
import {Class} from "../Content/Admin/Class/Class";
import {Subject} from "../Content/Admin/Subject/Subject";
import { Sidebar } from "../Layouts/Admin/Sidebar";
import { Account } from "../Content/Admin/Account/Account";
import { Profile } from "../Content/Admin/Profile";
import ImageUpload from "../Content/Admin/ImageUpload";
import { AnimatePresence } from "framer-motion";
import { Header } from "../Layouts/Student/Header";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUserData } from "../../api/authenticationService";
import ModalChangePassword from "../../UI/ModalChangePassword";

import { Exam } from "../Content/Admin/Exam/Exam";
import { AddQuestion } from "../Content/Admin/Question/AddQuestion";
import { Ranking } from "../Content/Admin/Result/Ranking"
import { Footer } from "../Layouts/Footer";

export const HomeAdmin = () => {
    const [account, setAccount] = useState([]);
    const [modalChangePasswordOpen, setModalChangePasswordOpen] = useState(false);
  
      useEffect(()=>{
          fetchUserData().then((response)=>{
              setAccount(response.data);
          }).catch((e)=>{
              localStorage.clear();
              console.log(e);
          })
      },[])
    return (
        <Wrapper>
            <>
            {modalChangePasswordOpen && <ModalChangePassword setModalChangePasswordOpen={setModalChangePasswordOpen} account={account} />}

                <Header account={account} />
                <div className="container_content" >
                    <Sidebar/>
                    <div className="content" style={{width: '100%'}} >
                        <AnimatePresence exitBeforeEnter>
                            <Switch>
                                <Route exact path="/admin" >
                                    <Dashboard/>
                                </Route>

                                <Route exact path="/admin/question" >
                                    <Question />
                                </Route>

                                <Route exact path="/admin/answer" >
                                    <Answer/>
                                </Route>

                                <Route exact path="/admin/exam" >
                                    <Exam/>
                                </Route>

                                <Route exact path="/admin/account" >
                                    <Account/>
                                </Route>

                                <Route exact path="/admin/ranking" >
                                    <Ranking/>
                                </Route>

                                <Route exact path="/admin/addQuestion" >
                                    <AddQuestion/>
                                </Route>

                                <Route exact path="/admin/updateQuestion/:id" >
                                    <AddQuestion/>
                                </Route>
                                <Route exact path="/admin/class" >
                                    <Class/>
                                </Route>

                                <Route exact path="/admin/subject" >
                                    <Subject/>
                                </Route>

                                <Route exact path="/admin/profile" >
                                    <Profile account={account} setModalChangePasswordOpen={setModalChangePasswordOpen} />
                                </Route>

                                <Route exact path="/admin/upload" >
                                    <ImageUpload/>
                                </Route>

                                <Route path="*" element={<> not found</>} />
                            </Switch>
                        </AnimatePresence>
                    </div>
                </div>
                <Footer/>
            </>
        </Wrapper>
    )
}

const Wrapper = styled.div`
   .container_content {
        margin: 0;
        margin-top: 70px;
        display: flex;

        .content {
            margin: 0;
            background: radial-gradient(circle at 10% 20%, rgb(90, 92, 106) 0%, rgb(32, 45, 58) 81.3%);
        }
    }
`
