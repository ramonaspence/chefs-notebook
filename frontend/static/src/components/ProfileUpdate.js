import React, {Component} from 'react';
import '../App.css';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import UserRecipeList from './UserRecipeList.js';
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
    this.handleImage = this.handleImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  handleChange(e) {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})

  }

  handleImage(e) {
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


    if (this.state.image === File) {
      formData.append('avatar', this.state.avatar)
    } else

    axios.patch(`${BASE_URL}/api/v1/profiles/${this.props.match.params.id}/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Token ${JSON.parse(localStorage.getItem('current-user')).token}`


      }
    })
    .then(res => this.setState({redirect: true}))
    .catch(err => console.log(err));
  }

  componentDidMount() {

    axios.get(`${BASE_URL}/api/v1/profiles/${this.props.match.params.id}`, {
      headers: {'Authorization': `Token ${JSON.stringify(localStorage.getItem('current-user')).token}`}
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
            <div className='row no-gutters'>
              <div className='col-4 card'>
                <div className='profile-body card-body'>
                <form type='submit' onSubmit={this.handleSubmit}>
                  <button>Save Profile</button>
                    <div className="update-display-name">
                      <label htmlFor='display_name'>New Display Name: </label>
                      <input type='text' name='display_name' defaultValue={this.state.display_name} onChange={this.handleChange} />
                    </div>
                    <div className="update-avatar">
                      <img src={this.state.avatar} alt="don't know about that" />
                      <label htmlFor='avatar'>Choose New Avatar: </label>
                      <input type='file' name='avatar' defaultValue={this.state.avatar} onChange={this.handleImage}/>
                    </div>

                    <div className="update-bio">
                      <input type='text' name='bio' defaultValue={this.state.bio} onChange={this.handleChange} />
                      <p>{this.state.bio}</p>
                    </div>
                </form>

                    <div className='follows'>


                    </div>

                </div>

                <div className='card-footer'>
                  <p>Member since: {moment(this.state.date_joined).format("MMM Do YYYY")}</p>
                    </div>
                    </div>
                    <div className='col-9'>
                      <UserRecipeList hidenav={this.state.hidenav} />
                    </div>
                </div>
                </React.Fragment>
    )
  }
}
export default ProfileUpdate;
