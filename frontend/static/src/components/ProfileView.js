import React, {Component} from 'react';
import '../App.css';

import { NavLink } from 'react-router-dom';

import ListFollowers from './ListFollowers.js';
import ListFollowing from './ListFollowing.js';
import UserRecipeList from './UserRecipeList.js'
import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileView extends Component {
  constructor() {
    super();

    this.state = {
      profile: {},
      hidenav: true,
      toggle: 'recipe'
    }


    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleFollowers = this.handleFollowers.bind(this);
    this.handleFollowing = this.handleFollowing.bind(this);
    this.handleRecipes = this.handleRecipes.bind(this);
  }

  handleRecipes(e) {
    e.preventDefault();
    this.setState({toggle: 'recipes'})
  }

  handleFollowing(e) {
    e.preventDefault();
    this.setState({toggle: 'following'})
  }

  handleFollowers(e) {
    e.preventDefault();
    this.setState({toggle: 'followers'})
  }

  getFollows() {
    console.log(this.props);
    axios.get(`${BASE_URL}/api/v1/profiles/follows/`, {
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.setItem('current-user')).token}`}
    })
    .then(res => this.setState({follows: res.data}))
    .catch(err => console.log(err))
  }



  componentDidMount() {

    axios.get(`${BASE_URL}/api/v1/profiles/user`,
    {
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.getItem('current-user')).token}`}
    })
    .then(response => this.setState({profile: response.data}))
    .catch(err => console.log(err));

  }

  render() {

    return (
      <React.Fragment>
      <Nav />
      <div className='row no-gutters'>
        <div className='col-4 card profile-body'>
          <div className='card-body'>
            <NavLink to='/profile/update/:userid'>Update Profile</NavLink>
            <h2>{this.state.profile.display_name}</h2>

              <img src={this.state.profile.avatar} alt="don't know about that" />
              <p>{this.state.profile.bio}</p>
              <p>{this.state.profile.follows}</p>


          </div>

          <div className='card-footer'>
            <p>Member since: {this.state.profile.date_joined}</p>
              </div>
              </div>
              <div className='col-8'>
                <div className='profile-nav'>
                  <button className='btn btn-outline-info' onClick={this.handleRecipes}>Recipes</button>
                  <button className='btn btn-outline-info' onClick={this.handleFollowing}>Following</button>
                  <button className="btn btn-outline-info" onClick={this.handleFollowers}>Followers</button>
                  <NavLink to='/add/recipe/' className='add-recipe-btn btn btn-outline-info mr-auto'>Start a New Recipe</NavLink>
                </div>
                { this.state.toggle === 'following'
                ?
                <ListFollowing hidenav={this.state.hidenav} />
                :
                this.state.toggle === 'followers'
                ?
                <ListFollowers hidenav={this.state.hidenav} />
                :
                this.state.profile.owner && <UserRecipeList profile={this.state.profile.owner} hidenav={this.state.hidenav} />
                }

              </div>
          </div>
          </React.Fragment>


    )
  }
}
export default ProfileView;
