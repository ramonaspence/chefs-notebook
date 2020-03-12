import React, {Component} from 'react';
import '../App.css';


import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const BASE_URL = process.env.REACT_APP_BASE_URL;


class ProfileView extends Component {

  render() {
    return(
      <div className='row no-gutters'>
        <div className='col-10 offset-1 card'>
          <div className='card-body'>
            <h2></h2>


          </div>
        </div>
      </div>

    )
  }
}
export default ProfileView;
