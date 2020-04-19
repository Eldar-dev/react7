import React from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";
import Record from "../record";

class StarshipList extends React.Component {
  swapiService = new SwapiService();

  state = {
    selectedItem: null,
    starships: {},
    loading: true,
    error: false,
  };

  onSelectedItem = (id) => {
    this.setState({
      selectedItem: id,
    });
  };

  render() {
    const {
      getAllStarships,
      getStarship,
      getStarshipImage,
    } = this.swapiService;

    const starshipsList = (
      <ItemList
        getDataList={getAllStarships}
        renderItem={(item) => `${item.name}`}
        onSelectedItem={this.onSelectedItem}
      />
    );

    const starshipsDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedItem}
          getDataDitails={getStarship}
          getImage={getStarshipImage}
          title="Starships"
        >
          <Record label="Name" field="name" />
          <Record label="Model" field="model" />
          <Record label="Manufacturer" field="manufacturer" />
          <Record label="Cost In Credits" field="costInCredits" />
          <Record label="Length" field="length" />
          <Record label="Crew" field="crew" />
          <Record label="Passengers" field="passengers" />
          <Record label="Cargo Capacity" field="cargoCapacity" />
        </ItemDetails>
      </ErrorBoundry>
    );

    return <Row left={starshipsList} right={starshipsDetails} />;
  }
}

export default StarshipList;
