import React, {Component} from 'react';
import '../App.css';

import ListFollowing from './ListFollowing.js';
import ListFollowers from './ListFollowers.js';
import RecipeList from './RecipeListView.js';
import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileDetail extends Component {
  constructor() {
    super();
      this.state = {
        profile: {},
        hidenav: true

      }
      this.onFollow = this.onFollow.bind(this);
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

  onFollow(e) {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/v1/profiles/connections/`, {following: this.state.profile.user}, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err));
  }

  componentDidMount() {

    axios.get(`${BASE_URL}/api/v1/profiles/${this.props.match.params.id}`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
    })
    .then(res => this.setState({profile: res.data}))
    .catch(err => console.log(err))
  }


  render() {
    return(
      <React.Fragment>
      <Nav />
      <div className='row no-gutters'>
        <div className='col-3 card'>
          <div className='profile-body card-body'>
            <h2>{this.state.profile.display_name}</h2>

              <img src={this.state.profile.avatar} alt="don't know about that" />
              <p>{this.state.profile.bio}</p>
              <p>{this.state.profile.follows}</p>
              <div className='follow'>
                <button onClick={this.onFollow}>Follow {this.state.profile.display_name}</button>
              </div>

          </div>

          <div className='card-footer'>
            <p>Member since: {this.state.profile.date_joined}</p>
              </div>
              </div>

              <div className='col-9'>
              <button className='btn btn-outline-info' onClick={this.handleRecipes}>Recipes</button>
              <button className='btn btn-outline-info' onClick={this.handleFollowing}>Following</button>
              <button className="btn btn-outline-info" onClick={this.handleFollowers}>Followers</button>

              { this.state.toggle === 'following'
              ?
              <ListFollowing profile={this.state.profile} hidenav={this.state.hidenav} />
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
export default ProfileDetail;
