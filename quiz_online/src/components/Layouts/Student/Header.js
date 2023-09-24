import React, {useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import styled from "styled-components";

import logo from '../../../assets/edulogo.png'
import {GrLogout} from 'react-icons/gr'

const nav = [
    {
        id: 0,
        name: 'Home',
        link: '/student/home/dashboard',
    },
    // {
    //     id: 1,
    //     name: 'About Us',
    //     link: '/aboutus',
    // },
    // {
    //     id: 2,
    //     name: 'Contact',
    //     link: '/contact',
    // }
]

export const Header = (props) => {
    const [navActive, setNavActive] = useState(0);
    const account = props.account;
    const history = useHistory();

    const handleLogOut = () => {
        localStorage.removeItem('USER_KEY');
        history.replace('/');
    }

    return (
        <Wrapper>
            <img className="logo" src={logo} alt="logo" />

            {/* <ul className='nav-router'>
                {
                    nav.map((item, index) => {
                        const {id, name, link} = item;
                        return (
                            <Link key={id} to={link} className={`${index === navActive ? 'nav-active': null}`} 
                            onClick={() => setNavActive(index)}>
                                {name}
                            </Link>
                        )
                    })
                }
            </ul> */}

            <div className="nav_title" >
                <h1>Quiz Online App</h1>
            </div>
            
            <div className="nav-account-login" >
                <img className="avatar" src={`http://localhost:9597/files/${account.avatar}`} alt="avatar"/>
                <div className="account-info" >
                    <h3>{account.username}</h3>
                    <p>Phone: {account.phone}</p>
                </div>

                <div className="nav_action" >
                    <button onClick={handleLogOut} ><span><GrLogout/></span></button>
                </div>
            </div>


        </Wrapper>
    )
}

const Wrapper = styled.header`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 2; 
    background: radial-gradient(circle at 10% 20%, rgb(0, 0, 0) 0%, rgb(64, 64, 64) 90.2%);
    width: 100%;
    height: 70px;
    box-shadow: 0px 0px 1px 1px #ccc;

    display: flex;
    justify-content: space-around;
    align-items: center;

    .logo {
        width: 150px;
        height: 100%;
        padding: 10px;
    }

    .nav-router {
        display: flex;
        justify-content: space-between;
        align-items: center;
        a {
            display: inline-block;
            margin: 0 10px;
            color: #fff;
            text-decoration: none;
            cursor: pointer;
            padding: 5px;
            text-transform: capitalize;
            position: relative;
            &:hover .sub-products {
                display: block;
            }
        }
        .nav-active {
            color: orangered;
            border-bottom: 2px solid orangered;
            font-weight: 700;
        }
    }

    .nav_title {
        h1 {
            color: #fff;

        }
    }

    .nav-account-login {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
        }

        .account-info {
            margin-left: 10px;
            color: #fff;

            h3 {
                font-size: 1.2rem;
                margin: 0;
                padding: 0;
            }

            p {
                font-size: 1.1rem;
                margin: 0;
            }
        }

        .nav_action {
            margin-left: 50px;

            button {
                padding: 15px 15px;
                border-radius: 50%;

                display: flex;
                justify-content: center;
                align-items: center;

                background: darkgoldenrod;
                border: none;

                span {
                    display: block;
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    color: #fff;
                }
            }
        }
    }
`