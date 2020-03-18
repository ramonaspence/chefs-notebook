import React, {Component} from 'react';
import '../App.css';

import { Redirect, NavLink } from 'react-router-dom';

import RecipeList from './RecipeListView';
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



  }

  onFollow(e) {
    e.preventDefault();
    console.log('fire!!');
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
    console.log(this.state);
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
                <RecipeList hidenav={this.state.hidenav} />
              </div>
          </div>
          </React.Fragment>

    )
  }


}
export default ProfileDetail;
