import React, { Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";

import { render } from "react-dom";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      seacrchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((Response) => {
        return Response.json();
      })
      .then((users) => {
        this.setState({ robots: users }); //Updated the state so it render again
        //if the state is empty it will show Loading message
      });
  }

  onSearchChange = (event) => {
    this.setState({ seacrchfield: event.target.value });
    //console.log(event.target.value);
  };
  render() {
    const { robots, seacrchfield } = this.state;
    const filterRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(seacrchfield.toLowerCase());
    });
    //console.log(filterRobots);

    //if (robots.length === 0) {
    // or (!robots.length)
    return !robots.length ? (
      <h1>Loading</h1>
    ) : (
      <div className="tc">
        <h1 className="f1">RoboFriends</h1>
        <SearchBox searchChange={this.onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardList robots={filterRobots} />
          </ErrorBoundry>
        </Scroll>
        );
      </div>
    );
  }
}

export default App;
