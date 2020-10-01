import React, {Component} from 'react';
import '../App.css';

import {Redirect} from 'react-router-dom';

import ProfileForm from '../utils/profileForm.js';

import Nav from '../containers/Nav.js';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileCreate extends Component {
  constructor() {
    super();

    this.state = {
      profile: {},
      preview: '',

    }

    this.handleImage = this.handleImage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleImage(e) {
    e.preventDefault();
    let file = e.target.files[0]
    this.setState({[e.target.name]: file});

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({preview: reader.result});
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})

  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('display_name', this.state.display_name)
    formData.append('bio', this.state.bio)
    formData.append('avatar', this.state.avatar)

    // Do I want a post request template broken out like the get requests?
    axios.post(`${BASE_URL}/api/v1/profiles/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
      }
    })
    .then(response => this.setState({redirect: true}),
    )
    .catch(error => console.log(error));
  }

  render() {
    if (this.state.redirect) {
      return(<Redirect to="/profile/:id" />)
    }
    else
    return(
      <React.Fragment>
      <Nav />
      <div className="row">
        <div className="col-md-4 col-12 card profile-create-body">
          <div className="card-body row">

            <ProfileForm profile={this.state.profile} preview={this.state.preview}/>

          </div>
        </div>
      </div>
      </React.Fragment>
    )
  }
}
export default ProfileCreate;
