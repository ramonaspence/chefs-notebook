import React, {Component} from 'react';
import '../App.css';
import { NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;

class RecipeDetail extends Component {
  constructor() {
    super();

    this.state = {
      recipe: {}

    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }



  handleDelete(e) {
    axios.delete(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`)
    .then(response => console.log(response))
    .catch(err => console.log(err));


  }

  componentDidMount() {


    // get request to pull in single recipe
    axios.get(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/`)
    .then(response => this.setState(response.data))
    .catch(err => console.log(err));



  }

  render() {
    return (
      <div className="row no-gutters">
        <div className="col-8 offset-2 mr-auto card">
          <div className="card-body">
            <div className="card-title">
              <h2>{this.state.title}</h2>

            </div>

                <div onClick={this.handleDelete} className="btn btn-outline-danger">Delete Recipe</div>


              <NavLink to={`/update/${this.state.id}`}><button className="btn btn-outline-primary">Edit Recipe</button></NavLink>

              <p>{this.state.description}</p>

              <p>{this.state.ingredients}</p>

              <p>{this.state.instructions}</p>

              <p>{this.state.date_published}</p>

          </div>
        </div>
          <div className="col-4 ml-auto">
            <img src="" alt="Whoops! Sorry! No can do."/>
          </div>
      </div>
    )
  }

}
export default RecipeDetail;
