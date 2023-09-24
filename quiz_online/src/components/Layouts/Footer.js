import React from "react";

import styled from "styled-components";

import {AiFillFacebook, AiFillInstagram, AiFillYoutube} from 'react-icons/ai'

export const Footer = () => {
    return (
        <Wrapper>
            <footer>
                <div className="footer_item" >
                    <h1>About Us</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium dolores alias ipsa vel hic tempore exercitationem ipsam explicabo repudiandae ut consectetur qui, earum at nostrum perspiciatis asperiores necessitatibus facilis esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia id possimus quibusdam nihil earum in provident enim animi commodi quisquam!
                    </p>

                </div>

                <div className="footer_item" >
                    <h1>Router</h1>
                    <p>Dashboard</p>
                    <p>About Us</p>
                    <p>Contact</p>
                    <ul className="social_list" >
                        <li><AiFillFacebook/></li>
                        <li><AiFillInstagram/></li>
                        <li><AiFillYoutube/></li>
                    </ul>
                </div>

                <div className="footer_item" >
                    <h1>More Info</h1>
                    <p>Address: Ho Chi Minh City, VietNam</p>
                    <p>Phone: 0776193347</p>
                    <p>email: roger@gmail.com</p>
                </div>
            </footer>
            <div className="last" >
                <p>
                    @Copyright Design 12/2022 by DT Team from Aptech 
                </p>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    //background: linear-gradient(112.1deg, rgb(32, 38, 57) 11.4%, rgb(63, 76, 119) 70.2%);
    background: #333;
    color: #fff;
    padding: 50px 100px 20px;
    footer {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 50px;

        .footer_item {
            h1 {
                font-size: 1.8rem;
            }

            p {
                font-size: 1.3rem;
                line-height: 1.3rem;
                letter-spacing: 1px;

                margin-top: 20px;
            }

            .social_list {
                display: flex;
                align-items: center;
                list-style: none;

                li {
                    font-size: 2.2rem;
                    margin-right: 10px;
                }
            }
        }
    }

    .last {
        p {
            text-align: center;
            font-size: 1.4rem;
            font-style: italic;
        }
    }
`