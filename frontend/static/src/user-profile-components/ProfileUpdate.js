import React, {Component} from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import Nav from '../containers/Nav.js';

import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileUpdate extends Component {
  constructor() {
    super();

    this.state = {
      recipes: [],
      preview: '',
      hidenav: true
    }

    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.onImageChange = this.onImageChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
    

  }

  onImageChange(e) {
    e.preventDefault();
    let file = e.target.files[0]
    this.setState({[e.target.name]: file});
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => this.setState({preview: reader.result});
  }

  handleSubmit(e) {
    e.preventDefault();
    let formData = new FormData()
    formData.append('display_name', this.state.display_name)
    formData.append('bio', this.state.bio)


    if (this.state.avatar.type.startsWith('image/')) {
      formData.append('avatar', this.state.avatar)
    }
    axios.patch(`${BASE_URL}/api/v1/profiles/user/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`
      }
    })
    .then(res => this.setState({redirect: true}))
    .catch(err => console.log(err));
  }

  async componentDidMount() {

    await axios.get(`${BASE_URL}/api/v1/profiles/${this.props.match.params.id}/`, {
      headers: {'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).key}`}
    })
    .then(response => this.setState(response.data))
    .catch(err => console.log(err))
  }


  render() {
    if (this.state.redirect) {
      return (<Redirect to="/profile/" />)
    }
    else
    return (
      <React.Fragment>
        <Nav />
          <div className='row'>
            <div className='col-md-6 col-12 card profile-update-body'>
              <div className='card-body row'>

              <form method="post" onSubmit={this.handleSubmit}>
                
                <div className="create-display-name col-md-12 col-7 mr-auto">
                    <label htmlFor="display_name">
                        Display Name
                    </label>
                    <input type='text' name="display_name" defaultValue={this.state.display_name ? this.state.display_name : ''} onChange={this.handleChange} />
                </div>

                <div className="create-avatar col-md-12 col-5">
                    { this.state.preview
                    ?
                    <div className="create-avatar-preview">
                        <img src={this.state.preview} alt="don't know about that" />
                    </div>
                    :
                    <div className="create-avatar-preview">
                    </div>
                    }
                    <label htmlFor="avatar">
                        Upload an Avatar
                    </label>
                    <input type="file" name="avatar" onChange={this.onImageChange} />
                </div>

                <div className="create-bio col-12 mr-auto">
                    <label htmlFor="bio">
                        Add Bio:
                    </label>
                    <textarea type='text' name="bio" defaultValue={this.state.bio ? this.state.bio : ''} onChange={this.handleChange} />
                </div>
                <button>Save Profile</button>
        </form>
              </div>

              <div className='card-footer profile-bio-footer'>
                <p>Member since: {moment(this.state.date_joined).format("MMM Do YYYY")}</p>
              </div>
            </div>
          </div>
        </React.Fragment>
    )
  }
}
export default ProfileUpdate;
