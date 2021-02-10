
import React from "react";

import { withAsyncAction } from "../../redux/HOCs";

import"./Username.css";



class Username extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        username: "",
      };
    }
    
    handleLogin = e => {
        e.preventDefault();
        this.props.login(this.state);
      };

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value });
      };

render() {
    const { loading, error } = this.props;
    return (
      <div className="Username">
          <form id="login-form" onSubmit={this.handleLogin}>
        
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            autoFocus
            required
            onChange={this.handleChange}
          />
          </form>

        </div>

    );

}

}

export default withAsyncAction("profile", "all")(Username);
