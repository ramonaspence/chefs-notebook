import React, {Component} from 'react';
import '../App.css';


import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileCreate extends Component {
  constructor() {
    super();

  }


  render() {
    return(
      <div className="row no-gutters">
        <div className="col-10 offset-1 card">
          <div className="card-body">

            <label htmlFor="avatar">Choose an Avatar</label>
            <input type="file" name="avatar" defaultValue="" />

            <label htmlFor="bio">Add Bio:</label>
            <input type='text' name="bio" defaultValue='' />

          </div>
        </div>
      </div>

    )
  }
}
export default ProfileCreate;
