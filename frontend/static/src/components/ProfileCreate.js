import React, {Component} from 'react';
import '../App.css';


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

  handleSubmit(e, profile) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('display_name', profile.display_name)
    formData.append('bio', profile.bio)
    formData.append('avatar', profile.avatar)

    const user = this.request.user


    axios.post(`${BASE_URL}/api/v1/profiles/${user.id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => console.log(response.data))
    .catch(error => console.log(error));
  }

  render() {
    return(
      <div className="row no-gutters">
        <div className="col-10 offset-1 card">
          <div className="card-body">
            <form type='submit' method="post" onSubmit={(e) => this.handleSubmit(this.state)}>
            <label htmlFor="display_name">Choose a display name.</label>
            <input type='text' name="display_name" defaultValue='' onChange={this.handleChange} />

            <label htmlFor="avatar">Choose an Avatar</label>
            <input type="file" name="avatar" defaultValue="" onChange={this.handleImage} />

            <label htmlFor="bio">Add Bio:</label>
            <input type='text' name="bio" defaultValue='' onChange={this.handleChange} />

            <button>Save Profile</button>
            </form>
          </div>
        </div>
      </div>

    )
  }
}
export default ProfileCreate;
