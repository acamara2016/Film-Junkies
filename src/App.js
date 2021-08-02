import logo from './logo.svg';
import React from 'react';
import Movie from './pages/movie.component';
import TvSHow from './pages/tvshow.component';
import Coming from './pages/coming.component';
import Error from './pages/error.component';
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
        search:null
    }
}

  render(){
    return (
      <div className="App bg-dark">
          <div>   
                <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
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
                      </ul>
                  </div>
              </nav>
              
                <div style={{marginTop:'56px'}}>
                    <Switch>
                        {/* <Route exact path={["/"]} component={Home} /> */}
                        <Route exact path={["/","/movies"]} component={Movie} />
                        <Route exact path={["/tv", "/tv-show"]} component={TvSHow} />
                        <Route exact path={["/:type/:id"]} component={Details} />
                        <Route exact path={["/v1/actor/:id"]} component={ActorDetails} />
                        <Route exact path={["/coming-soon"]} component={Coming} />
                        <Route exact path={["/welcome"]} component={Welcome} />
                        <Route component={Error} />
                    </Switch>
                </div>
                <footer class="text-muted py-5 bg-dark navbar-dark">
                <div class="container">
                  <p class="float-end mb-1">
                    <a href="#">Back to top</a>
                  </p>
                  <p class="mb-1">FilmJunkies © 2021</p>
                  <p class="mb-0">Want to join our Community? <a href="/">Visit the homepage</a> or read our <a href="https://www.themoviedb.org/">getting started guide</a>.</p>
                </div>
              </footer>
            </div>
      </div>
    );
  }
}

export default App;
