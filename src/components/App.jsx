import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      asdasd: 1,
    };
  }

  render() {
    return (
      <div>HELLO WORLD! {this.state.asdasd} </div>
    );
  }
}

export default App;
