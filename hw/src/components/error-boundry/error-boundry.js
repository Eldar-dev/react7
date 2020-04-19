import React, { Component } from "react";
import ErrorIndicator from "../error-indicator";

class ErrorBoundry extends Component {
  state = {
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }
  render() {
    if (this.state.error) {
      return <ErrorIndicator />;
    }
    return this.props.children;
  }
}

export default ErrorBoundry;
