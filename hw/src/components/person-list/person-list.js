import React from "react";
import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundry from "../error-boundry";
import Record from "../record";

class PersonList extends React.Component {
  swapiService = new SwapiService();

  state = {
    selectedItem: null,
    people: {},
    loading: true,
    error: false,
  };

  onSelectedItem = (id) => {
    this.setState({
      selectedItem: id,
    });
  };

  render() {
    const { getAllPeople, getPerson, getPersonImage } = this.swapiService;

    const peopleList = (
      <ItemList
        getDataList={getAllPeople}
        renderItem={(item) => `${item.name}`}
        onSelectedItem={this.onSelectedItem}
      />
    );

    const personDetails = (
      <ErrorBoundry>
        <ItemDetails
          itemId={this.state.selectedItem}
          getDataDitails={getPerson}
          getImage={getPersonImage}
          title="Peson"
        >
          <Record label="Name" field="name" />
          <Record label="Gender" field="gender" />
          <Record label="Birth Year" field="birthYear" />
          <Record label="Eye Color" field="eyeColor" />
        </ItemDetails>
      </ErrorBoundry>
    );

    return <Row left={peopleList} right={personDetails} />;
  }
}

export default PersonList;
