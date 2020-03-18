import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";

import ListFollowers from './components/ListFollowers.js';
import ProfileDetail from './components/ProfileDetail.js';
import UserProfiles from './components/UserProfiles.js';
import ProfileUpdate from './components/ProfileUpdate.js';
import ProfileCreate from './components/ProfileCreate.js';
import ProfileView from './components/ProfileView.js';
import RecipeUpdate from './components/RecipeUpdate.js';
import RecipeDetail from './components/RecipeDetail.js'
import RecipeCreate from './components/RecipeCreate.js';
import RecipeList from './components/RecipeListView.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import Nav from './containers/Nav.js';
import Home from './containers/Home.js';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class App extends Component {
  constructor() {
    super();

    this.state = {
      recipe: '',
    }


  }

  getRecipe() {
    this.setState()
  }



  render() {

    return(

      <Router>
        <div className='container-fluid'>


          <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/" exact component={UserProfiles} />
          <Route path="/users/profile/:id" exact component={ProfileDetail} />
          <Route path="/profile/followers/" component={ListFollowers} />
          <Route path="/profile/update/:id" component={ProfileUpdate} />
          <Route path="/profile/create/" component={ProfileCreate} />
          <Route path="/profile/" component={ProfileView} />
          <Route path="/add/recipe/" component={RecipeCreate} />
          <Route path="/recipes/" exact component={RecipeList}/>
          <Route path="/recipes/:id" component={RecipeDetail} />
          <Route path="/update/:id/" component={RecipeUpdate} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />

          </Switch>
        </div>
      </Router>
    )
  }
}

export default App;
