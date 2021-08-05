import logo from './logo.svg';
import React from 'react';
import Movie from './pages/movie.component';
import TvSHow from './pages/tvshow.component';
import Coming from './pages/coming.component';
import Error from './pages/error.component';
import Login from './pages/signin.component';
import SignUp from './pages/signup.component';
import Profile from './pages/profile.component';
import AuthService from './services/auth.service';
import { Switch, Route, Link } from "react-router-dom";
import './App.css';
import Details from './pages/detail.component';
import axios from 'axios';
import icon from './logo192.png'
import config from './config/api.config'
import Welcome from './pages/welcome.component';
import ActorDetails from './pages/actor.detail.component';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        movies: [],
        categories:[],
        search:null,
        guest:[],
    }
  }
  componentDidMount(){
    const user = AuthService.fetchCurrentUser();
    if(user){
      this.setState({
        guest: user,
      })
    }
  }
  logOut() {
    AuthService.signout();
    window.location.href = "/movies";
  }
  render(){
    const user = AuthService.fetchCurrentUser();
    const {guest} = this.state;
    console.log(guest.success)
    return (
      <div className="App bg-dark">
          <div>   
              
                <div style={{marginTop:'56px'}}>
                    <Switch>
                    <Route exact path={["/register"]} component={SignUp} />
                    <div>
                    <nav style={{boxShadow:'4px 3px 10px 1px', color:'black'}} className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                            <Link to="/welcome" class="navbar-brand" href="#">
                              <img src={icon} width="30" height="30" class="d-inline-block align-top" alt=""/>
                              Film-Junkies
                            </Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/movies">Movies</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/tv-show">TV</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link" to="/coming-soon">Coming Soon</Link>
                                </li>
                                {user!=null && <li className="nav-item">
                                  <Link className="nav-link" to="/profile">Profile</Link>
                                </li>}
                                {user===null && <li className="nav-item">
                                  <Link className="nav-link" to="/register">Register</Link>
                                </li>}
                               
                                </ul>
                            </div>
                        </nav>
                        {/* <Route exact path={["/"]} component={Home} /> */}
                        <Route exact path={["/","/movies"]} component={Movie} />
                        <Route exact path={["/tv", "/tv-show"]} component={TvSHow} />
                        <Route exact path={["/:type/:id"]} guest={guest} component={Details} />
                        <Route exact path={["/v1/actor/:id"]} guest={guest} component={ActorDetails}/>
                        <Route exact path={["/coming-soon"]} component={Coming} />
                        <Route exact path={["/welcome"]} component={Welcome} />
                        <Route exact path="/profile">
                          <Profile guest={guest}/>
                        </Route>
                       
                        </div>
                    </Switch>
                </div>
                <div className="container">
                  <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col-md-4 mb-0 text-muted">© 2021 FilmJunkies, by <a href="https://github.com/acamara2016">acamara</a></p>

                    <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                      <img src={icon} width="42" height="30" className="d-inline-block align-top" alt=""/>
                    </a>

                  </footer>
                </div>
                
                
            </div>
      </div>
    );
  }
}

export default App;
