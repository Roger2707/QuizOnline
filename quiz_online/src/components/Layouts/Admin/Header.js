import React, {useState} from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";

import quizLogo from '../../../assets/quizLogo.png'
import ava from '../../../assets/logoMain.png';

const nav = [
    {
        id: 0,
        name: 'Home',
        link: '/home/dashboard',
    },
    {
        id: 1,
        name: 'About Us',
        link: '/aboutus',
    },
    {
        id: 2,
        name: 'Contact',
        link: '/contact',
    }
]

export const Header = (props) => {
    const [navActive, setNavActive] = useState(0);
    const account = props.account;
    return (
        <Wrapper>
            <img className="logo" src={quizLogo} alt="logo" />

            <ul className='nav-router'>
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
            </ul>
            
            <div className="nav-account-login" >
                <img className="avatar" src={ava} alt="avatar"/>
                <div className="account-info" >
                    <h3>{account.username}</h3>
                    <p>Phone: {account.phone}</p>
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
    background: radial-gradient(1002px at -0.1% 47%, rgb(53, 92, 125) 0%, rgb(108, 91, 123) 51.2%, rgb(192, 108, 132) 100.2%);
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
            color: #333;
            border-bottom: 2px solid #333;
            font-weight: 700;
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
    }
`