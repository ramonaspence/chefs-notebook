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
      <div className='row no-gutters'>
        <div className='col-4 card profile-body'>
          <div className='card-body'>

            <div className="profile-username">
                <h2>{this.state.profile.display_name}</h2>
              </div>
              <div className="profile-avatar">
                <img src={this.state.profile.avatar} alt="don't know about that" />
              </div>
              <div className="profile-bio">
                <p>{this.state.profile.bio}</p>
              </div>



          </div>

          <div className='card-footer'>
            <div className="profile-date-joined">
              <p>Member since: {moment(this.state.profile.date_joined).format("MMM Do YYYY")}</p>
            </div>
            <div className="profile-update">
              <NavLink to={`/profile/update/${this.state.profile.id}`}>Update Profile</NavLink>
            </div>
              </div>
              </div>
              <div className='col-8'>
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
                this.state.profile.owner && <UserRecipeList profile={this.state.profile.owner} hidenav={this.state.hidenav} />
                }

              </div>
          </div>
          </React.Fragment>


    )
  }
}
export default ProfileView;
