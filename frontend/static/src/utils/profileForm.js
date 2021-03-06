import React, { Component } from 'react';

class ProfileForm extends Component {
    
    render() {
        console.log('props', this.props)
        return (
            <form type='submit' method="post" onSubmit={this.handleSubmit}>
                <button>Save Profile</button>
                    <div className="create-display-name col-md-12 col-7 mr-auto">
                        <label htmlFor="display_name">
                            Display Name
                        </label>
                        <input type='text' name="display_name" defaultValue={this.props.profile.display_name ? this.props.profile.display_name : ''} onChange={this.handleChange} />
                    </div>

                    <div className="create-avatar col-md-12 col-5">
                        { this.props.preview
                        ?
                        <div className="create-avatar-preview">
                            <img src={this.props.preview} alt="don't know about that" />
                        </div>
                        :
                        <div className="create-avatar-preview">
                        </div>
                        }
                        <label htmlFor="avatar">
                            Upload an Avatar
                        </label>
                        <input type="file" name="avatar" onChange={this.handleImage} />
                    </div>

                    <div className="create-bio col-12 mr-auto">
                        <label htmlFor="bio">
                            Add Bio:
                        </label>
                        <textarea type='text' name="bio" defaultValue={this.props.profile.bio ? this.props.profile.bio : ''} onChange={this.handleChange} />
                    </div>

            </form>
        )
    }
    

};
export default ProfileForm;