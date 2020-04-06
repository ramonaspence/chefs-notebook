import React, {Component} from 'react';
import '../App.css';

import { NavLink } from 'react-router-dom';
import moment from 'moment';

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
      hidesearch: true,
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
      headers: {'Authorization': `Token ${JSON.parse(localStorage.setItem('current-user')).key}`}
    })
    .then(res => this.setState({follows: res.data}))
    .catch(err => console.log(err))
  }



  componentDidMount() {

    axios.get(`${BASE_URL}/api/v1/profiles/user`,
    {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => this.setState({profile: response.data}))
    .catch(err => {console.log(err.response)
      if (err.response.status === 404) {
        console.log(this.props.history.push('/profile/create/'));
      }
      });

  }

  render() {

    return (
      <React.Fragment>
      <Nav />
      <div className='row'>
        <div className='col-md-4 col-12 card profile-body'>
          <div className='card-body row'>

              <div className="profile-username col-md-12 col-7 mr-auto">
                <h2>{this.state.profile.display_name}</h2>
              </div>

              <div className="profile-avatar col-md-12 col-5">
                <img src={this.state.profile.avatar} alt="don't know about that" />
              </div>

              <div className="profile-bio col-12 mr-auto">
                <p>{this.state.profile.bio}</p>
              </div>
          </div>

          <div className='card-footer profile-bio-footer'>
            <div className="profile-date-joined">
              <p>Member since: {moment(this.state.profile.date_joined).format("MMM Do YYYY")}</p>
            </div>
            <div className="profile-update">
              <NavLink to={`/profile/update/${this.state.profile.id}`}>Update Profile</NavLink>
            </div>
          </div>
        </div>
        <div className='col-md-8 col-12'>
          <div className='profile-nav'>
            <button className='btn btn-outline-info' onClick={this.handleRecipes}>Recipes</button>
            <button className='btn btn-outline-info' onClick={this.handleFollowing}>Following</button>
            <button className="btn btn-outline-info" onClick={this.handleFollowers}>Followers</button>
            <NavLink to='/add/recipe/'><button className="btn btn-outline-info">Start a New Recipe</button></NavLink>
          </div>

        { this.state.toggle === 'following'
        ?
        <ListFollowing profile={this.state.profile} hidenav={this.state.hidenav} />
        :
        this.state.toggle === 'followers'
        ?
        <ListFollowers profile={this.state.profile} hidenav={this.state.hidenav} />
        :
        this.state.profile.owner && <UserRecipeList profile={this.state.profile.owner} hidesearch={this.state.hidesearch} hidenav={this.state.hidenav} />
        }

      </div>
  </div>
  </React.Fragment>


    )
  }
}
export default ProfileView;
