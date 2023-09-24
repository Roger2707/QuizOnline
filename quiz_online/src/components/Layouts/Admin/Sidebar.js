import React, { useState } from "react";

import { SidebarMenu } from "./SidebarMenu";
import {NavLink} from 'react-router-dom';
import { AnimatePresence, motion } from "framer-motion";
import { FaBars , FaHackerrank} from "react-icons/fa";
import {MdDashboard, MdAccountCircle, MdClass, MdSubject} from "react-icons/md"
import {BsQuestionCircleFill} from "react-icons/bs"
import {GrTest} from 'react-icons/gr'
import {CgProfile} from 'react-icons/cg'
import {GrLogout} from 'react-icons/gr'

const sidebars = [
    {
        id: 0,
        name: "DashBoards",
        link: '/admin',
        icon: <MdDashboard/>
    },
    {
        id: 1,
        name: "Question",
        link: '/admin/question',
        icon: <BsQuestionCircleFill/>
    },
    {
        id: 3,
        name: "Exam",
        link: '/admin/exam',
        icon: <GrTest/>
    },
    {
        id: 4,
        name: 'Account',
        icon: <MdAccountCircle/>,
        link: '/admin/account'
    },
    {
        id: 5,
        icon: <FaHackerrank/>,
        name: 'Ranking',
        link: '/admin/ranking',
    },
    {
        id: 6,
        icon: <MdClass/>,
        name: 'Class',
        link: '/admin/class'
    },
    {
        id: 7,
        icon: <MdSubject/>,
        name: 'Subject',
        link: '/admin/subject'
    },
    {
        id: 8,
        icon: <CgProfile/>,
        name: 'Profile',
        link: '/admin/profile'
    },

   
]

export const Sidebar = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    
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
                            style={{fontSize:'24px'}}
                            >
                            
                                Quiz Online

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

                            if(route.subRoutes) {
                                return (
                                    <SidebarMenu
                                        setIsOpen={setIsOpen}
                                        route={route}
                                        isOpen={isOpen}
                                        showAnimation={showAnimation}
                                        key={id}
                                    />
                                );
                            }

                            return (
                                <NavLink key={id} to={link} className="link" activeClassName="active">
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