import React, {Component} from 'react';
import '../App.css';

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
      connections: [],
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/profiles/followers`,{
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.getItem('current-user')).token}`}
    })
    .then(res => this.setState({connections: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    let followers = this.state.connections.map(follower => (

      <div className="row no-gutters">
        <div className="col-8 ml-auto card d-flex">
          <div className="title card-body">
            <div className="card-title">
              <h3>{follower.owner.username}</h3>
              <p>since {moment(follower.created).format("MMM Do YYYY")}</p>


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
