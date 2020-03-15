import React, {Component} from 'react';
import '../App.css';


import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class CommentList extends Component {
  constructor() {
    super();

    this.state = {
      comments: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);

  }

  componentDidMount() {
    axios.get(`${BASE_URL}/api/v1/recipes/comments/`)
    .then(res => this.setState({comments: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="card">
        <div className="card-body">


        </div>
      </div>
    )
  }
}
export default CommentList;
