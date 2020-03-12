import React, {Component} from 'react';
import '../App.css';


import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileView extends Component {
  constructor() {
    super();

    this.state = {
      profile: {}
    }

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {

    axios.get(`${BASE_URL}/api/v1/profiles/${this.props.match.params.id}`)
    .then(response => this.setState({profile: response.data}))
    .catch(err => console.log(err))
  }

  render() {
    console.log('state', this.state);
    return (

      <div className='row no-gutters'>
        <div className='col-10 offset-1 card'>
          <div className='card-body'>
            <h2>{this.state.profile.display_name}</h2>


          </div>
        </div>
      </div>
    )
  }
}
export default ProfileView;
