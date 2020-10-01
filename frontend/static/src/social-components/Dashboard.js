import React, {Component} from 'react';
import '../App.css';

import { NavLink, Link } from 'react-router-dom';
import moment from 'moment';

import Nav from '../containers/Nav.js';

import GetAPICall from '../utils/makeAPICall.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

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
    GetAPICall('recipes/dashboard/')
    .then(res => this.setState({recipes: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    let recipes;
    if (this.state.recipes) {
      recipes = this.state.recipes.map(recipe => {
      return (
        <div className="row">
          <div className="col-md-8 col-sm-12 ml-auto card d-flex">
            <div className="title card-body">
              <div className="card-title">
                <Link to={`/users/profile/${recipe.owner.profile.id}`}>
                  <h2>{recipe.owner.username}</h2>
                </Link>
                <img src={recipe.image} alt="oh no!" />

              </div>
              <div className="">
                <NavLink className="btn btn-outline-secondary" to={`/recipes/${recipe.id}`}>
                  View Recipe
                </NavLink>
                <p>{recipe.description}</p>
                <p>{moment(recipe.date_updated).fromNow()}</p>
              </div>

            </div>
          </div>
        </div>
      )
    })
  }
  else {
    return (
      <div className="row">
        <div className="no-followers col-lg-4 offset-lg-4 col-10 offset-1">
          <div className="card col-12">
            <span className="card-body col-12">
              Welcome to your dashboard! Once you follow other cooks, their activity will be shown here. <br />
              Until then check out the Explore page to find recipes by anyone!
            </span>
          </div>
        </div>
      </div>
    )}

    return(
      <React.Fragment>
      { this.props.hidenav
        ?
        null
        :
        <Nav />
      }
        
          <div>{recipes}</div>
      </React.Fragment>
    )

  }
}
export default Dashboard;
