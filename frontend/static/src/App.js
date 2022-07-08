import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import BadRequest from './social-components/TagSearch400.js';
import ListFollowing from './user-profile-components/ListFollowing.js';
import ListFollowers from './user-profile-components/ListFollowers.js';
import ProfileDetail from './user-profile-components/ProfileDetail.js';
import Dashboard from './social-components/Dashboard.js';
import ProfileUpdate from './user-profile-components/ProfileUpdate.js';
import ProfileCreate from './user-profile-components/ProfileCreate.js';
import MyProfile from './user-profile-components/MyProfile.js';
import RecipeUpdate from './recipe-components/RecipeUpdate.js';
import RecipeDetail from './recipe-components/RecipeDetail.js'
import RecipeCreate from './recipe-components/RecipeCreate.js';
import ExploreRecipeList from './social-components/Explore.js';
import Signup from './authentication/Signup.js';
import Login from './authentication/Login.js';
import Home from './containers/Home.js';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';


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
          <Route path="/oops/" component={BadRequest} />
          <Route path="/dashboard/" exact component={Dashboard} />
          <Route path="/users/profile/:id" exact component={ProfileDetail} />
          <Route path="/profile/followers/" exact component={ListFollowers} />
          <Route path="/profile/following/" exact component={ListFollowing} />
          <Route path="/profile/update/:id" component={ProfileUpdate} />
          <Route path="/profile/create/" component={ProfileCreate} />
          <Route path="/profile/" component={MyProfile} />
          <Route path="/add/recipe/" component={RecipeCreate} />
          <Route path="/recipes/" exact component={ExploreRecipeList}/>
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
