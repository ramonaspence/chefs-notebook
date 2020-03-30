import React, {Component} from 'react';
import '../App.css';

import { NavLink } from 'react-router-dom';


import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class Dashboard extends Component {
  constructor() {
    super();
      this.state = {
        recipes: [],
        hidenav: true
      }


    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/recipes/`)
    .then(res => this.setState({users: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    let users = this.state.users.map(user => {
      return (
        <div className="row no-gutters">
          <div className="col-8 ml-auto card d-flex">
            <div className="title card-body">
              <div className="card-title">
                <h2>{user.display_name}</h2>
                <img src={user.avatar} alt="oh no!" />
                <NavLink to={`/users/profile/${user.id}`} className="btn btn-outline-primary">View Profile</NavLink>

              </div>
              <div>
                <p>{user.bio}</p>

              </div>

            </div>
          </div>
        </div>
      )
    })
    return(
      <React.Fragment>
      { this.props.hidenav
        ?
        null
        :
        <Nav />
      }

          <div>{users}</div>
      </React.Fragment>
    )
  }
}
export default Dashboard;
