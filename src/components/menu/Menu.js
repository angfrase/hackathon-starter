import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";
import { withAsyncAction } from "../../redux/HOCs";



class Menu extends React.Component {
   

  handleLogout = event => {
    event.preventDefault();
    this.props.logout();
  };

  
  
  render() {
    return (
      <div className="Menu">
        <h1> DEV TALK</h1>
        {this.props.isAuthenticated && (
          <div id="menu-links">
            <Link to="/" onClick={this.handleLogout}>
              Logout
            </Link>  

            <div id="menu-links">
            <Link to ="/"onClick={this.handleUsername}>
            MockUser2_Team3
            </Link>

           </div>
          </div>
        )}
      </div>
    );

  }

}

export default withAsyncAction("auth", "logout")(Menu);
