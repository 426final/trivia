import React, { Component, createContext } from "react";
import { auth, generateUserDocument } from "../firebase";


export const UserContext = createContext({ user: null, loaded: false });

class UserProvider extends Component {
  state = {
    user: null,
    loaded: false
  };

  
  
  componentDidMount = async () => {
    auth.onAuthStateChanged(async userAuth => {
      const user = await generateUserDocument(userAuth);
      let loaded = true;
      this.setState({ user, loaded });
    });
  };

  render() {
    const { user, loaded } = this.state;
    console.log(loaded);
    return (
      <UserContext.Provider value={ {user, loaded} }>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}

export default UserProvider;