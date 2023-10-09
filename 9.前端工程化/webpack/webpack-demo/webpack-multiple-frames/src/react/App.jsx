import React, { Component } from 'react';

class App extends Component {
  state = {
    list: [1, 2, 3],
  };

  componentDidMount() {
    this.setState({
      list: [1, 2, 3, 4],
    });

    window.eventEmitter.on('list', (list) => {
      // some code...
      this.setState({
        list: list,
      });
    });
  }

  inputChange(e) {
    this.setState(
      {
        list: [...this.state.list, e.target.value],
      },
      () => {
        window.eventEmitter.emit('list', this.state.list);
      },
    );
  }

  render() {
    return (
      <div className="react">
        <h2> React </h2>
        <ul>
          {this.state.list.map((i, index) => (
            <li key={index}>{index}</li>
          ))}
        </ul>

        <input type="text" onBlur={(e) => this.inputChange(e)} placeholder="react修改数据源" />
      </div>
    );
  }
}

export default App;
