import React, {Component} from 'react';
import '../App.css';

import ListFollowing from './ListFollowing.js';
import ListFollowers from './ListFollowers.js';
import UserRecipeList from './UserRecipeList.js';

import Nav from '../containers/Nav.js';

import moment from 'moment';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileDetail extends Component {
  constructor() {
    super();
      this.state = {
        profile: {},
        hidenav: true,
        hidesearch: true,
        following: null,
        connections: []
      }

      this.removeFollow = this.removeFollow.bind(this);
      this.addFollow = this.addFollow.bind(this);
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

  removeFollow(e) {
    e.preventDefault();

    let userid = JSON.parse(localStorage.getItem('currentUser')).userid

    this.state.profile.followers.map(connection => {
      if (connection.owner.id === userid) {
        let conid = connection.id
        axios.delete(`${BASE_URL}/api/v1/profiles/connections/${conid}`, {
          headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
        })
      .then(res => console.log(res))
      .catch(err => console.log(err))

      } else {
        console.log('if clause failed')

      }})

  }




  addFollow(e) {

    e.preventDefault();
    axios.post(`${BASE_URL}/api/v1/profiles/connections/`, {following: this.state.profile.owner.id},{
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(res => this.setState({profile: res.data}))
    .then(res => console.log(res.data))
    .catch(err => console.log(err));

  }



  componentDidMount() {

    axios.get(`${BASE_URL}/api/v1/profiles/${this.props.match.params.id}`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(res => this.setState({profile: res.data}))
    .catch(err => console.log(err))

  }


  render() {

    const owner = JSON.parse(localStorage.getItem('currentUser')).userid;
    let button = <div><button className="btn btn-outline-primary" onClick={this.addFollow}>Follow</button></div>;

    if (this.state.profile.followers) {
      this.state.profile.followers.map(follower => {
        if (follower.owner.id === owner) {
          button = <div><button className="btn btn-outline-primary" onClick={this.removeFollow}>UnFollow</button></div>
        }

      });
    }


    return(
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
              <div className="follow-btn">
                {button}
              </div>

            </div>

            <div className='card-footer profile-bio-footer'>
              <div className="profile-date-joined">
                <p>Member since: {moment(this.state.profile.date_joined).format("MMM Do YYYY")}</p>
              </div>
            </div>
          </div>

        <div className='col-md-8 col-12'>
          <div className='profile-nav'>
            <button className='btn btn-outline-info' onClick={this.handleRecipes}>Recipes</button>
            <button className='btn btn-outline-info' onClick={this.handleFollowing}>Following</button>
            <button className="btn btn-outline-info" onClick={this.handleFollowers}>Followers</button>
          </div>
            { this.state.toggle === 'following'
            ?
            <ListFollowing profile={this.state.profile} hidenav={this.state.hidenav} />
            :
            this.state.toggle === 'followers'
            ?
            <ListFollowers hidenav={this.state.hidenav} />
            :
            this.state.profile.owner && <UserRecipeList hidesearch={this.state.hidesearch} profile={this.state.profile.owner} hidenav={this.state.hidenav} />
            }
            {/* uses inline if with && operator to wait until this.state.profile.user is updated, to render the recipe list
            this forces the parent component (profiledetail) to NOT pass state until the state is defined */}

        </div>
      </div>
    </React.Fragment>

    )
  }


}
export default ProfileDetail;
