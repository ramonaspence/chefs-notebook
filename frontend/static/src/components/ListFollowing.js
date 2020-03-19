import React, {Component} from 'react';
import '../App.css';

import {Link} from 'react-router-dom';
import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ListFollowing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      connections: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/profiles/following/`, {
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.getItem('current-user')).token}`}
    })
    .then(res => this.setState({connections: res.data}))
    .catch(err => console.log(err));
  }


  render() {
    console.log(this.props.profile);
    let following = this.state.connections.map(connection => (
      <div className="row no-gutters">
        <div className="col-8 ml-auto card d-flex">
          <div className="title card-body">
            <div className="card-title">
              <Link to={`/users/profile/${connection.following}/`}><h3>{connection.following.username}</h3></Link>
              <p>since {connection.created}</p>

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
