import {useState} from 'react';
import {useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, authFailure, authSuccess } from '../redux/authActions';
import './loginpage.css';
import {userLogin} from '../api/authenticationService';
import {Alert,Spinner} from 'react-bootstrap';

import {AiOutlineUser} from 'react-icons/ai'
import {RiLockPasswordLine} from 'react-icons/ri'

import logo from '../assets/edulogo.png'

import styled from 'styled-components';

const LoginPage=({loading,error,...props})=>{
   let history = useHistory();
    const [values, setValues] = useState({
        userName: '',
        password: ''
        });

    const handleSubmit=(evt)=>{
        evt.preventDefault();
        authenticate();

        userLogin(values).then((response)=>{

            console.log("response",response);
            if(response.status===200){
                console.log(props.user);
                props.setUser(response.data);

                console.log(response.data);

                history.push("/role");
            }
            else{
               props.loginFailure('Something Wrong!Please Try Again'); 
            }


        }).catch((err)=>{

            if(err && err.response){
            
            switch(err.response.status){
                case 401:
                    console.log("401 status");
                    props.loginFailure("Authentication Failed.Bad Credentials");
                    break;
                default:
                    props.loginFailure('Something Wrong!Please Try Again'); 

            }

            }
            else{
                //props.loginFailure('Something Wrong!Please Try Again');
            }
                

            

        });
        //console.log("Loading again",loading);

        
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({
        ...values,
        [e.target.name]: e.target.value
        }));
    };

    return (
        <Wrapper >
            <div className="login-page" >              
                   <section className="h-100">
                   <div className="container h-100">
                  
                       <div className="row justify-content-md-center h-100">
                           <div className="card-wrapper">
           
                               <div className="card fat">
                                   <div className="card-body" style={{padding: '50px'}} >
                                       {/* <h4 className="card-title">Login</h4> */}
                                       <div className='card_photo' >
                                           <img src={logo} alt='avalogo' className='login_photo' />
                                       </div>
                                       
                                       <form className="my-login-validation" onSubmit={handleSubmit} noValidate={false}>
                                           <div className="form-group">
                                               <label htmlFor="email"><span><AiOutlineUser/>Username : </span></label>
                                               <input id="username" type="text" className="form-control" minLength={5} value={values.userName} onChange={handleChange} name="userName" required />
                                               
                                                   <div className="invalid-feedback">
                                                       UserId is invalid
                                                   </div>
                                               
                                        
                                           </div>
           
                                           <div className="form-group">
                                               <label><span><RiLockPasswordLine/>Password :</span>
                                                   {/* <a href="forgot.html" className="float-right">
                                                       Forgot Password?
                                                   </a> */}
                                               </label>
                                               <input id="password" type="password" className="form-control" minLength={8} value={values.password} onChange={handleChange} name="password" required/>
                                               <div className="invalid-feedback">
                                                   Password is required
                                               </div>
                                           </div>
           
                                           <div className="form-group">
                                               <div className="custom-control custom-checkbox">
                                                   <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                                   <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                                                </div>
                                           </div>
                                           
           
                                           <div className="form-group m-0">
                                               <button type="submit" className="btn btn-primary">
                                                   Login
                                                   {loading && (
                                                       <Spinner
                                                       as="span"
                                                       animation="border"
                                                       size="sm"
                                                       role="status"
                                                       aria-hidden="true"
                                                     />
                                                   )}
                                                   {/* <ClipLoader
                                                   //css={override}
                                                   size={20}
                                                   color={"#123abc"}
                                                   loading={loading}
                                                   /> */}
                                               </button>
                                           </div>
                                       </form>
                                       { error &&
                                       <Alert style={{marginTop:'20px'}} variant="danger">
                                               {error}
                                           </Alert>
           
                                       }
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </section>
                   </div>
        </Wrapper>
        
    )


    
}

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    
`

const mapStateToProps=({auth})=>{
    console.log("state ",auth)
    
    return {
        loading:auth.loading,
        error:auth.error
}}


const mapDispatchToProps=(dispatch)=>{

    return {
        authenticate :()=> dispatch(authenticate()),
        setUser:(data)=> dispatch(authSuccess(data)),
        loginFailure:(message)=>dispatch(authFailure(message))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(LoginPage);