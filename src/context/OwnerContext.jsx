import React from "react";

const initialOwnerContext = {
  id: "",
  username: "",
};

const ownerContextWrapper = (component) => ({
  ...initialOwnerContext,
  setOwner: (data) => {
    const { id, username } = data;
    initialOwnerContext.id = id;
    initialOwnerContext.username = username;
    component?.setState({ context: ownerContextWrapper(component) });
  },
  getOwner: () => initialOwnerContext,
  resetOwner: () => {
    initialOwnerContext.id = "";
    initialOwnerContext.username = "";
    component?.setState({ context: initialOwnerContext(component) });
  },
});

export const OwnerContext = React.createContext(ownerContextWrapper());

export class OwnerContextProvider extends React.Component {
  state = {
    context: ownerContextWrapper(this),
  };

  render() {
    return (
      <OwnerContext.Provider value={this.state.context}>
        {this.props.children}
      </OwnerContext.Provider>
    );
  }
}
