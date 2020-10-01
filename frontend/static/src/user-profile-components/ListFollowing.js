import React, {Component} from 'react';
import '../App.css';

import {Link} from 'react-router-dom';
import Nav from '../containers/Nav.js';

import moment from 'moment';
import axios from 'axios';
import getAPICall from '../utils/makeAPICall';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

class ListFollowing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connections: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    getAPICall('profiles/following/')
    .then(res => this.setState({connections: res.data}))
    .catch(err => console.log(err));
  }


  render() {
    let following = this.props.profile.following.map(connection => (
      <div key={connection.id} className="row no-gutters">
        <div className="col-8 ml-auto card d-flex">
          <div className="title card-body">
            <div className="card-title">
              <Link to={`/users/profile/${connection.following.profile.id}/`}><h3>{connection.following.username}</h3></Link>
              <p>since {moment(connection.created).format("MMM Do YYYY")}</p>

            </div>
          </div>
        </div>
      </div>
    ))
    return(
      <React.Fragment>
      { this.props.hidenav ?
        null
        :
        <Nav /> }
        <div>{following}</div>
      </React.Fragment>
    )
  }
}
export default ListFollowing;
