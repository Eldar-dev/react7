import React from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";
import Record from "../record";

import "./planet-list.css";

class PlanetList extends React.Component {
  swapiService = new SwapiService();

  state = {
    selectedItem: null,
    planet: {},
    loading: true,
    error: false,
  };

  onSelectedItem = (id) => {
    this.setState({
      selectedItem: id,
    });
  };

  render() {
    const { getAllPlanets, getPlanet, getPlanetImage } = this.swapiService;

    const planetList = (
      <ItemList
        getDataList={getAllPlanets}
        renderItem={(item) => `${item.name}`}
        onSelectedItem={this.onSelectedItem}
      />
    );

    const palnetDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedItem}
          getDataDitails={getPlanet}
          getImage={getPlanetImage}
          title="Planet"
        >
          <Record label="Name" field="name" />
          <Record label="Population" field="population" />
          <Record label="Rotation Period" field="rotationPeriod" />
          <Record label="Diameter" field="diameter" />
        </ItemDetails>
      </ErrorBoundry>
    );

    return <Row left={planetList} right={palnetDetails} />;
  }
}

export default PlanetList;
