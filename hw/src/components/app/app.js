import React, { Component } from "react";

import Header from "../header";
import RandomPlanet from "../random-planet";
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PersonList from "../person-list";
import PlanetList from "../planet-list";
import StarshipList from "../starship-list";

import "./app.css";

export default class App extends Component {
  state = {
    showRandomPlanet: true,
    error: false,
    component: "",
  };

  toggleRandomPlanet = () => {
    this.setState((state) => {
      return {
        showRandomPlanet: !state.showRandomPlanet,
      };
    });
  };

  /*onSelectedItem = (id) => {
    this.setState({
      selectedItem: id,
    });
  };*/

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  getComponent = (title) => {
    this.setState({
      component: title,
    });
  };

  renderComponent(component) {
    if (component === "Planets") {
      return <PlanetList />;
    } else if (component === "Starships") {
      return <StarshipList />;
    }
    return <PersonList />;
  }

  render() {
    if (this.state.error) {
      return <ErrorIndicator />;
    }

    const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;
    const component = this.renderComponent(this.state.component);

    return (
      <div>
        <Header getComponent={this.getComponent} />
        {planet}
        <button
          className="toggle-planet btn btn-warning btn-lg"
          onClick={this.toggleRandomPlanet}
        >
          Toggle Random Planet
        </button>
        <ErrorButton />
        {component}
      </div>
    );
  }
}
