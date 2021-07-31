import React from 'react';
import Animate from '../animation/index'
import Lottie from 'react-lottie';
import {Link} from 'react-router-dom';
import animation from '../animation/community.json'
export default class Welcome extends React.Component {
    render(){
        return (
            <div class="container col-xxl-8 px-4 py-5">
                <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
                <div class="col-10 col-sm-8 col-lg-6">
                    <Animate lottie={animation}  lottie={animation} width={700} height={500}/>
                    {/* Lottie animation from https://assets1.lottiefiles.com/packages/lf20_ghfpce1h.json */}
                    {/* <Lottie lottie={animation} options={options} height={height} width={width}/> */}
                    {/* <img src="bootstrap-themes.png" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/> */}
                </div>
                <div style={{textAlign:'start'}} class="col-lg-6">
                    
                    <h1 class="display-5 fw-bold lh-1 mb-3">Join our Community</h1>
                    <p class="lead">Here a FilmJunkies, we provide all information about actors, directors and their works. Our community rank the movie by posting votes and comments.</p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-start">
                    <button style={{color: 'white'}} type="button" class="btn  btn-lg px-4 me-md-2"><Link to="/">GET STARTED</Link></button>
                    </div>
                </div>  
                </div>
            </div>
        );
    }
}