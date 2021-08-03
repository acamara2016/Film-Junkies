import React from 'react';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input"; 
import CheckButton from "react-validation/build/button";
import {Link} from "react-router-dom"
import Animate from "../animation/index";
import animation from "../animation/account";
import "./style.css";

import AuthService from "../services/auth.service";

const required = value => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
};

export default class SignUp extends React.Component{
    constructor(props){
        super(props);
            this.handleSignup = this.handleSignup.bind(this);
            this.onChangeCity = this.onChangeCity.bind(this);
            this.onChangeName = this.onChangeName.bind(this);
            this.onChangeRole = this.onChangeRole.bind(this);
            this.onChangeUsername = this.onChangeUsername.bind(this);
            this.onChangePassword = this.onChangePassword.bind(this);
        
            this.state = {
              username: "",
              password: "",
              role: "",
              city:"",
              name:"",
              loading: false,
              message: "",
              redirect: "",
            }; 
    }
    onChangeUsername(e) {
        this.setState({
          username: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
    onChangeName(e) {
        this.setState({
          name: e.target.value
        });
    }
    onChangeCity(e) {
        this.setState({
          city: e.target.value
        });
    }
    onChangeRole(e) {
        this.setState({
          role: e.target.value
        });
    }
    handleSignup(e) {
        e.preventDefault();
    
        this.setState({
          message: "",
          loading: true
        });
    
        this.form.validateAll();
    
        if (this.checkBtn.context._errors.length === 0) {
            AuthService.create_guest_account()
            .then((response)=>{
                console.log(response.success)
                 if(response.success === true) {
                    window.location.href = "http://localhost:3000/movies"
                 }
            },
            error => {
                const resMessage =
                  (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                  error.message ||
                  error.toString();
      
                this.setState({
                  loading: false,
                  message: resMessage
                });
              }
            )
        } else {
          this.setState({
            loading: false
          });
        }
      }
render() {
    return (
      <div className="col-md-12">
        <div style={{background:'transparent', marginBottom: '50px', textAlign:'-webkit-center', marginTop: '90px'}}>
            <Animate lottie={animation}  lottie={animation} width={400} height={400}/>  
          <Form
            onSubmit={this.handleSignup}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">

              <button
              style={{width: '300px', height:'58px', marginTop:'20px'}}
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Guest Account</span>
              </button>
            </div>
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
          <Link to={"/movies"} className="nav-link">
                  Continue without an account.
            </Link>
        </div>
      </div>
    );
  }
}
