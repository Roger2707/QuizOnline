import React, { useEffect, useState } from "react";

import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FaBars , FaHackerrank} from "react-icons/fa";
import {MdDashboard, MdAccountCircle, MdClass} from "react-icons/md"
import {GrLogout, GrHistory} from 'react-icons/gr'
import { fetchUserData } from "../../../api/authenticationService";


export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [navActive, setNavActive] = useState(0);
    const [account, setAccount] = useState([]);

    useEffect(()=>{
        fetchUserData().then((response)=>{
            setAccount(response.data);
        }).catch((e)=>{
            localStorage.clear();
            console.log(e);
        })
    },[])

    const sidebars = [
        {
            id: 0,
            name: "DashBoards",
            link: '/student',
            icon: <MdDashboard/>
        },
        {
            id: 1,
            name: "Examination",
            link: `/student/listexam/${account.username}`,
            icon: <MdClass/>
        },
        {
            id: 2,
            name: "History",
            link: `/student/history/${account.username}`,
            icon: <GrHistory/>
        },
        {
            id: 3,
            name: "Profile",
            link: '/student/profile',
            icon: <FaHackerrank/>
        }
    ]


    
      const showAnimation = {
        hidden: {
          width: 0,
          opacity: 0,
          transition: {
            duration: 0.5,
          },
        },
        show: {
          opacity: 1,
          width: "auto",
          transition: {
            duration: 0.5,
          },
        },
      };

    return (
        <>
            <div className="main-container" >
                <motion.div
                    animate={{
                        width: isOpen ? "300px" : "50px",

                        transition: {
                        duration: 0.5,
                        type: "spring",
                        damping: 10,
                        },
                    }}
                    className={`sidebar `}
                >

                        <div className="top_section">
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.h1
                                        variants={showAnimation}
                                        initial="hidden"
                                        animate="show"
                                        exit="hidden"
                                        className="logo"
                                    >
                                        <h1>Quiz Online</h1>
                                    </motion.h1>
)}
                            </AnimatePresence>

                            <div className="bars">
                                <div className="icon" >
                                    <FaBars onClick={toggle} />
                                </div>
                            </div>

                        </div>
                    <section className="routes" >
                        {
                            sidebars.map((route, index) => {
                                const {id, name, link, icon} = route;

                                return (
                                    <NavLink key={id} to={link} className={`${index === navActive ? 'link active': 'link'}`} onClick={() => setNavActive(index)}>
                                        <div className="icon">{icon}</div>
                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    variants={showAnimation}
                                                    initial="hidden"
                                                    animate="show"
                                                    exit="hidden"
                                                    className="link_text"
                                                >
                                                    {name}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </NavLink>
                                )
                            })
                        }
                    </section>
                </motion.div>


            </div>
        </>
    )
}