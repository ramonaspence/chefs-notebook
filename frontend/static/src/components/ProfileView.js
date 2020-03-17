import React, {Component} from 'react';
import '../App.css';

import { Redirect, NavLink } from 'react-router-dom';

import RecipeList from './RecipeListView.js'
import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileView extends Component {
  constructor() {
    super();

    this.state = {
      profile: '',
      follows: '',
      hidenav: true
    }

    this.getFollows = this.getFollows.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);

  }

  getFollows() {
    console.log(this.props);
    axios.get(`${BASE_URL}/api/v1/profiles/follows/`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
    })
    .then(res => this.setState({follows: res.data}))
    .catch(err => console.log(err))
  }

  handleFollow(e) {
    e.preventDefault();

  }

  componentDidMount() {
    console.log(this.props);

    axios.get(`${BASE_URL}/api/v1/profiles/user`)
    .then(response => this.setState(response.data))
    .catch(err => console.log(err));
    console.log(this.state);

  }

  render() {
    return (
      <React.Fragment>
      <Nav />
      <div className='row no-gutters'>
        <div className='col-3 card'>
          <div className='profile-body card-body'>
            <NavLink to='/profile/update/:userid'>Update Profile</NavLink>
            <h2>{this.state.display_name}</h2>

              <img src={this.state.avatar} alt="don't know about that" />
              <p>{this.state.bio}</p>
              <p>{this.state.follows}</p>
              <div className='follow'>
                <button type='submit' onSubmit={this.handleFollow}>Follow {this.state.display_name}</button>
              </div>

          </div>

          <div className='card-footer'>
            <p>Member since: {this.state.date_joined}</p>
              </div>
              </div>
              <div className='col-9'>
                <div className="card profile-add-recipe col-6 ml-auto">
                  <NavLink to='/add/recipe/' className='btn btn-outline-info'>Start a New Recipe</NavLink>
                </div>
                <RecipeList hidenav={this.state.hidenav} />
              </div>
          </div>
          </React.Fragment>


    )
  }
}
export default ProfileView;
