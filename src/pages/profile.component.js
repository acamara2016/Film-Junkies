import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import "./style.css";
import Animate from "../animation/index";
import animation from "../animation/account.json";
import {Link} from 'react-router-dom'
import {Row, Col} from 'react-bootstrap/'
import "./profile.css"
import AuthService from "../services/auth.service";
 

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" }
    };
  }
  logOut() {
    AuthService.signout();
    window.location.href = "/movies";
  }

  render() {

    const {guest} = this.props;
    console.log(guest.guest_session_id);
    return (
      <div style={{color:'black'}}>
        {guest!=null && 
        <div style={{marginTop:'150px', background:'transparent', marginBottom:'200px'}} className="card">
        <h2 style={{textAlign:"center", color:"black"}}>Guest account</h2>
          <Animate lottie={animation}  lottie={animation} width={100} height={100}/>  
          <p>Session: {guest.guest_session_id}</p>
          <p>Expires: {guest.expires_at}</p>
          <br/>
          <button style={{width:'min-content', alignSelf:'center', marginBottom:'50px'}} className="btn btn-danger"onClick={this.logOut}>Logout</button>
        </div>}
        {guest===null && 
          <Link style={{width:'min-content', alignSelf:'center', marginTop:'150px'}} className="btn btn-danger" to="../register">Register</Link>}
      </div>
    );
  }
}
