import React, { Component } from "react";

import Spinner from "../spinner";
import SwapiService from "../../services/swapi-service";
import ErrorComponent from "../error-component";
import ErrorButton from "../error-button";

import "./item-details.css";

class ItemDetails extends Component {
  state = { item: null, loading: false, error: false };

  swapiService = new SwapiService();

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(props) {
    if (props.itemId !== this.props.itemId) {
      this.updateItem();
    }
  }

  updateItem = () => {
    const { itemId, getDataDitails } = this.props;
    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    });

    getDataDitails(itemId).then(this.onItemLoaded).catch(this.onError);
  };

  onItemLoaded = (item) => {
    this.setState({
      item,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      item: null,
      loading: false,
    });
  };

  render() {
    const { item, loading, error } = this.state;
    const { getImage, children } = this.props;

    const errorMessage = error ? <ErrorComponent /> : null;
    const spinner = loading ? <Spinner /> : null;

    if (!this.state.item) {
      return (
        <div className="select-item card">
          Please select a {this.props.title}
        </div>
      );
    }

    const content = !(loading || error) ? (
      <ItemView item={item} getImage={getImage} children={children} />
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

const ItemView = ({ item, getImage, children }) => {
  return (
    <div className="item-details card">
      <img className="item-image" src={getImage(item)} />
      <div className="card-body">
        <h4>{item.name}</h4>
        <ul className="list-group list-group-flush">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { item });
          })}
          <li className="block-btn">
            <ErrorButton />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ItemDetails;
