import React, {Component} from 'react';
import '../App.css';
import {Link} from 'react-router-dom'
import Nav from '../containers/Nav.js';

import moment from 'moment';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ListFollowers extends Component {
  constructor() {
    super();

    this.state = {
      followers: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/profiles/followers`,{
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.getItem('current-user')).token}`}
    })
    .then(res => this.setState({followers: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    console.log(this.state)

    let followers = this.state.followers.map(follower => (

      <div className="row">
        <div className="col-md-8 col-12 ml-auto card d-flex">
          <div className="title card-body">
            <div className="card-title">
            <Link to={`/users/profile/${follower.following.profile}/`}><h3>{follower.following.username}</h3></Link>

              <p>since {moment(follower.following.created).format("MMM Do YYYY")}</p>


            </div>
          </div>
        </div>
      </div>
    ))
    return (
      <React.Fragment>
      { this.props.hidenav ?
        null
        :
      <Nav /> }
      <div>{followers}</div>
      </React.Fragment>
    )
  }
}
export default ListFollowers;
