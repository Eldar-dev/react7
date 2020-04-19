import React, { Component } from "react";

import Spinner from "../spinner";
import SwapiService from "../../services/swapi-service";
import ErrorComponent from "../error-component";

import "./starship-details.css";

class StarshipDetails extends Component {
  state = { starship: {}, loading: false, error: false };

  swapiService = new SwapiService();

  componentDidUpdate(props) {
    const id = this.props.selectedItem;

    if (props.selectedItem !== id) {
      this.setState({ loading: true });
      this.swapiService
        .getStarship(id)
        .then(this.onStarshipLoaded)
        .catch(this.onError);
    }
  }

  onStarshipLoaded = (starship) => {
    this.setState({
      starship,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  render() {
    const { starship, loading, error } = this.state;

    const errorMessage = error ? <ErrorComponent /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? (
      <StarshipView starship={starship} />
    ) : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}

const StarshipView = ({ starship }) => {
  const {
    id,
    name,
    model,
    manufacturer,
    costInCredits,
    length,
    crew,
    passengers,
    cargoCapacity,
  } = starship;

  if (id) {
    return (
      <div className="starship-details card">
        <img
          className="starship-image"
          src={`https://starwars-visualguide.com/assets/img/starships/${
            id + 20
          }.jpg`}
        />
        <div className="card-body">
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Model: </span>
              <span>{model}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Manufacturer: </span>
              <span>{manufacturer}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Cost in Credits: </span>
              <span>{costInCredits}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Length: </span>
              <span>{length}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Crew: </span>
              <span>{crew}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Passengers: </span>
              <span>{passengers}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Cargo Capacity: </span>
              <span>{cargoCapacity}</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  return <div className="select-starship card">Please select a starship</div>;
};

export default StarshipDetails;
