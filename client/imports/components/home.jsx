import React from 'react';
import { Meteor } from 'meteor/meteor';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }
  componentWillMount() {
    Meteor.call('getNearby', (error, result) => this.setState({ data: result }));
  }
  render() {
    return (
      <div>
        <h1>My App</h1>
        <hr />
        <div>{this.state.data}</div>
      </div>
    );
  }
}

export { Home };
