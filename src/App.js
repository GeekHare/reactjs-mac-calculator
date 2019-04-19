/* eslint no-eval: 0 */

import React, { Component } from "react"
import { Button } from "./components/Button/"
import "./index.css"

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0,
      lastInput: "",
      buffer: 0,
      ac: "AC",
      setNew: false,
      lastOperator: ""
    }
  }

  handleSymbol = (val) => {
    let newVal = ((this.state.input === 0 || this.state.setNew) && val !== ".") ? val : this.state.input + val;
    let newLastVal = (this.state.lastInput !== "") ? this.state.lastInput + val : newVal;
    this.setState({ input: newVal, lastInput: newLastVal });

    if (this.state.ac === "AC") {
      this.setState({ ac: "C" })
    }

    this.setState({ setNew: false });
  };

  handleAC = (val) => {
    if (val === "AC") {
      this.setState({ input: 0, buffer: "", lastInput: "" });
    }
    if (val === "C") {
      this.setState({ input: 0 });
      this.setState({ ac: "AC" });
    }
  };

  handleOperator = (val) => {
    this.setState((state) => ({ lastInput: val }));

    if (this.state.buffer !== 0 && this.state.buffer !== "") {

      // if (!this.state.calcStatus) {
      //   this.handleResult();
      //   this.setState((state) => ({ buffer: state.buffer + val }));
      // } else {
      //   this.setState((state) => ({ calcStatus: false, buffer: val }));
      // }

      if (this.state.lastOperator === "%") {
        this.setState((state) => ({ buffer: state.input + val }));
      } else {
        this.handleResult();
        this.setState((state) => ({ buffer: state.buffer + val }));
      }

    } else {
      this.setState((state) => ({ buffer: state.input + val }));
    }

    this.setState({ setNew: true, lastOperator: val });
  };

  handleResult = () => {
    let result = 0;

    if (this.state.input === this.state.buffer) {
      result = eval(this.state.buffer +  this.state.lastInput);
    } else {
      result = eval(this.state.buffer +  this.state.input);
    }

    this.setState((state) => ({ input: result, buffer: result, setNew: true, calcStatus: true }));
  };

  handleTogglePosNeg = () => {
    if (Math.sign(this.state.input) !== -1) {
      this.setState((state) => ({ input: "-" + state.input }));
    } else {
      this.setState((state) => ({ input: Math.abs(state.input) }));
    }
  };

  handlePercent = () => {
    console.log(this.state.lastInput);

    let lastOperator = this.state.buffer.replace(/[0-9]/g, '');

    let stateBuffer = (this.state.buffer !== 0);
    let number = (stateBuffer) ? Number.parseInt(this.state.buffer) : this.state.input;
    let percent = (stateBuffer) ? this.state.input : 1;
    let result = ((number/100) * percent).toString();

    this.setState((state) => ({ buffer: number + lastOperator, input: result, lastInput: lastOperator + result, lastOperator: "%" }));
  };

  componentDidUpdate() {
    console.log(this.state);
  };

  render() {
    return (
      <div className="App">
        <div className="wrapper">
          <div>{ this.state.input }</div>
          <div className="controls">
            <div className="row">
              <Button handleClick={ this.handleAC }>{ this.state.ac }</Button>
              <Button handleClick={ this.handleTogglePosNeg }>+/-</Button>
              <Button handleClick={ this.handlePercent }>%</Button>
              <Button handleClick={ this.handleOperator }>/</Button>
            </div>
            <div className="row">
              <Button handleClick={ this.handleSymbol }>7</Button>
              <Button handleClick={ this.handleSymbol }>8</Button>
              <Button handleClick={ this.handleSymbol }>9</Button>
              <Button handleClick={ this.handleOperator }>*</Button>
            </div>
            <div className="row">
              <Button handleClick={ this.handleSymbol }>4</Button>
              <Button handleClick={ this.handleSymbol }>5</Button>
              <Button handleClick={ this.handleSymbol }>6</Button>
              <Button handleClick={ this.handleOperator }>-</Button>
            </div>
            <div className="row">
              <Button handleClick={ this.handleSymbol }>1</Button>
              <Button handleClick={ this.handleSymbol }>2</Button>
              <Button handleClick={ this.handleSymbol }>3</Button>
              <Button handleClick={ this.handleOperator }>+</Button>
            </div>
            <div className="row">
              <Button handleClick={ this.handleSymbol }>0</Button>
              <Button handleClick={ this.handleSymbol }>.</Button>
              <Button handleClick={ this.handleResult }>=</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
}

export default App;