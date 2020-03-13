import React, {Component} from 'react';
import '../App.css';

import RecipeList from './RecipeListView.js'

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileView extends Component {
  constructor() {
    super();

    this.state = {
      profile: ''
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    console.log(this);
    axios.get(`${BASE_URL}/api/v1/profiles/`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
    })
    .then(response => this.setState(response.data[0]))
    .catch(err => console.log(err))
  }

  render() {

    console.log('state', this.state);
    return (

      <div className='row no-gutters'>
        <div className='col-4 offset-1 card'>
          <div className='profile-body card-body'>
            <h1>static</h1>
            <h2>{this.state.display_name}</h2>

              <img src={this.state.avatar} alt="don't know about that" />
              <p>{this.state.bio}</p>

          </div>

          <div className='card-footer'>
            <p>Member since: {this.state.date_joined}</p>
              </div>
              </div>
              <div className='col-7'>
                <RecipeList />
              </div>
          </div>


    )
  }
}
export default ProfileView;
