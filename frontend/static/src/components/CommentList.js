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
//how to get correct recipe id in get request url
  componentDidMount() {
    console.log('this', this.props);
    axios.get(`${BASE_URL}/api/v1/recipes/comments/2`)
    .then(res => this.setState({comments: res.data}))
    .catch(err => console.log(err));
  }

  render() {
    let comments = this.state.comments.map(comment => (
      <div className="card">
          <div className="card-title">
            <h4>{comment.author.username}</h4>
              <p>{comment.date_published}</p>
          </div>
          <div className="card-body">
            <p>{comment.body}</p>
          </div>
        </div>
    ))
    return (


          <div>{comments}</div>



    )
  }
}
export default CommentList;
