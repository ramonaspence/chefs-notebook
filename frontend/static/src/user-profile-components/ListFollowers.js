import React, {Component} from 'react';
import '../App.css';
import {NavLink} from 'react-router-dom'
import Nav from '../containers/Nav.js';

import moment from 'moment';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ListFollowers extends Component {
  constructor() {
    super();

    this.state = {
      followers: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/profiles/followers/${this.props.profile.owner.id}/`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(res => this.setState({followers: res.data}))
    .catch(err => console.log(err));
  }

  render() {
      let followers = this.state.followers.map(follower => {
        if (follower.following.id === this.props.profile.owner.id) {
          return (
          <div key={follower.id} className="row">
            <div className="col-md-8 col-12 ml-auto card d-flex">
              <div className="title card-body">
                <div className="card-title">
                <NavLink to={`/users/profile/${follower.owner.profile.id}/`}><h3>{follower.owner.username}</h3></NavLink>

                  <p>since {moment(follower.owner.created).format("MMM Do YYYY")}</p>


                </div>
              </div>
            </div>
          </div>
        )
        }
      });


    return (
      <React.Fragment>
      { this.props.hidenav ?
        null
        :
      <Nav /> }
      <div>{followers}</div>
      </React.Fragment>
      );
    }
}
export default ListFollowers;
