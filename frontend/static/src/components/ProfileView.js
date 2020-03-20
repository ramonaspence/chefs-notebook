import React, {Component} from 'react';
import '../App.css';

import { NavLink } from 'react-router-dom';

import ListFollowers from './ListFollowers.js';
import ListFollowing from './ListFollowing.js';
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
    console.log(this.props);

    axios.get(`${BASE_URL}/api/v1/profiles/user`,
    {
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.getItem('current-user')).token}`}
    })
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


          </div>

          <div className='card-footer'>
            <p>Member since: {this.state.date_joined}</p>
              </div>
              </div>
              <div className='col-9'>
                  <button className='btn btn-outline-info' onClick={this.handleRecipes}>Recipes</button>
                  <button className='btn btn-outline-info' onClick={this.handleFollowing}>Following</button>
                  <button className="btn btn-outline-info" onClick={this.handleFollowers}>Followers</button>
                  <NavLink to='/add/recipe/' className='btn btn-outline-info mr-auto'>Start a New Recipe</NavLink>

                { this.state.toggle === 'following'
                ?
                <ListFollowing hidenav={this.state.hidenav} />
                :
                this.state.toggle === 'followers'
                ?
                <ListFollowers hidenav={this.state.hidenav} />
                :
                <RecipeList hidenav={this.state.hidenav} />
                }

              </div>
          </div>
          </React.Fragment>


    )
  }
}
export default ProfileView;