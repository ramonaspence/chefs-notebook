import React, {Component} from 'react';
import '../App.css';



import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class CommentCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: {}
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

    handleChange(e) {
      e.preventDefault();
      this.setState({[e.target.name]: e.target.value});

    }

    handleSubmit(e) {
      e.preventDefault();

      axios.post(`${BASE_URL}/api/v1/recipes/${this.props.match.params.id}/comments/`, this.state)
      .then(res => console.log(res))
      .catch(err => console.log(err));
    }


  render() {

    return(
      <div className="card">
        <div className="card-body">
        <form method="post" type='submit' onSubmit={this.handleSubmit}>
          <input type='text' name="body" defaultValue='' className="form-control" onChange={this.handleChange} />
          <div className="input-group-append">
            <button className="input-group-text">Leave Comment</button>
          </div>
        </form>
        </div>
      </div>
    )
  }
}

export default CommentCreate;
