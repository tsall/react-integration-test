import {Task} from '@acamica/task';
import * as React from 'react';
import {range} from 'rxjs';

import { map } from '@acamica/task/dist/lib/src/operators/basic';
import './App.css';
import { Hello } from './components/Hello';
import logo from './logo.svg';

// Test that we can integrate with RxJs
range(1, 5).subscribe(x => console.log(x));


interface IState {
  enthusiasmLevel: number;
}
class App extends React.Component<{}, IState> {
  public readonly state = {
    enthusiasmLevel: 1
  }
  public componentDidMount() {
    // Test that we can integrate with Task
    new Task(resolve => setTimeout(resolve, 4000))
      .map(_ => 1)
      .pipe(map(x => x + 4))
      .fork(
        _ => this.setState({enthusiasmLevel: 2}),
        val => this.setState({enthusiasmLevel: val})
      )
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">

          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React :D</h1>
        </header>
        <Hello name="Javier" enthusiasmLevel={this.state.enthusiasmLevel} />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.

        </p>
      </div>
    );
  }
}

export default App;
