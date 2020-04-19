import React, { Component } from "react";

import SwapiService from "../../services/swapi-service";
import Spinner from "../spinner";
import ErrorComponent from "../error-component";

import "./item-list.css";

export default class ItemList extends Component {
  swapiService = new SwapiService();

  state = {
    data: {},
    loading: true,
    error: false,
  };

  onDataLoaded = (data) => {
    this.setState({
      data,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  componentDidMount() {
    this.props.getDataList().then(this.onDataLoaded).catch(this.onError);
  }

  render() {
    const { data, loading, error } = this.state;
    const { renderItem, onSelectedItem } = this.props;

    const errorMessage = error ? <ErrorComponent /> : null;
    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error) ? (
      <ListItemView
        data={data}
        onSelectedItem={onSelectedItem}
        renderItem={renderItem}
      />
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

const ListItemView = ({ data, onSelectedItem, renderItem }) => {
  const listName = data.map((item) => {
    return (
      <li
        className="list-group-item"
        key={item.id}
        onClick={() => onSelectedItem(item.id)}
      >
        {renderItem(item)}
      </li>
    );
  });

  return <ul className="item-list list-group">{listName}</ul>;
};
