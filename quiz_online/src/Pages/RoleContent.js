import React, { useEffect, useState } from "react";
import {BrowserRouter as Router, Switch, Route, useHistory} from 'react-router-dom'

import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons
import { fetchUserData } from "../api/authenticationService";

export const RoleContent = () => {

    let history = useHistory();
    const [account, setAccount] = useState([]);
    const [roleId, setRoleId] = useState(0);

    useEffect(()=>{
        fetchUserData().then((response)=>{
            console.log(response);
            setAccount(response.data);

            console.log(response.data.role);
            setRoleId(response.data.role);
        }).catch((e)=>{
            localStorage.clear();
            console.log(e);
        })
    },[])

    if(roleId === 1) {
        history.push('/admin');
    }
    else if(roleId === 3) {
        history.push('/student');
    }

    return (
       <div>Loading</div>
    )
}