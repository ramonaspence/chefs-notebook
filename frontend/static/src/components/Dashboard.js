import React, {Component} from 'react';
import '../App.css';

import { NavLink } from 'react-router-dom';
import moment from 'moment';

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
    axios.get(`${BASE_URL}/api/v1/recipes/dashboard/`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`}
    })
    .then(res => this.setState({recipes: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    let recipes = this.state.recipes.map(recipe => {
      return (
        <div className="row no-gutters">
          <div className="col-md-8 col-sm-12 ml-auto card d-flex">
            <div className="title card-body">
              <div className="card-title">
                <h2>{recipe.owner.username}</h2>
                <img src={recipe.image} alt="oh no!" />

              </div>
              <div className="">
                <NavLink className="btn btn-outline-secondary" to={`/recipes/${recipe.id}`}>View Recipe</NavLink>
                //toggle from recipes to followers? Get profile from followers??
                <p>{recipe.description}</p>
                <p>{moment(recipe.date_updated).fromNow()}</p>
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

          <div>{recipes}</div>
      </React.Fragment>
    )
  }
}
export default Dashboard;
