import React, {Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import BadRequest from './components/TagSearch400.js';
import ListFollowing from './components/ListFollowing.js';
import ListFollowers from './components/ListFollowers.js';
import ProfileDetail from './components/ProfileDetail.js';
import Dashboard from './components/Dashboard.js';
import ProfileUpdate from './components/ProfileUpdate.js';
import ProfileCreate from './components/ProfileCreate.js';
import ProfileView from './components/ProfileView.js';
import RecipeUpdate from './components/RecipeUpdate.js';
import RecipeDetail from './components/RecipeDetail.js'
import RecipeCreate from './components/RecipeCreate.js';
import ExploreRecipeList from './components/ExploreRecipeListView.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
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
          <Route path="/profile/" component={ProfileView} />
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
