import React, { Component } from "react";
import { stockArray } from "./stocks.js";

const localStocks = stockArray;
function getTotal(acc, stockPrice) {
  return acc + stockPrice.Price;
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { buying: [], selling: [], sArray: localStocks };
    this.emptyBuyArray = this.emptyBuyArray.bind(this);
    this.emptySellArray = this.emptySellArray.bind(this);
  } // end constructor

  comparePrice(stock1, stock2) {
    let comparison = 0;
    if (stock1.Price > stock2.Price) comparison = 1;
    else if (stock1.Price < stock2.Price) comparison = -1;
    else comparison = 0;
    return comparison;
  }

  addToBuyArray(stock) {
    let foundStock = this.state.sArray.filter(this.findObjectBySymbol(stock));
    this.setState({ buying: this.state.buying.concat(foundStock) });
  }
  addToSellArray(stock) {
    let foundStock = this.state.sArray.filter(this.findObjectBySymbol(stock));
    this.setState({ selling: this.state.selling.concat(foundStock) });
  }
  findObjectBySymbol(atSymbol) {
    return function (companySymbol) {
      return companySymbol.Symbol === atSymbol;
    };
  }
  emptyBuyArray() {
    this.setState({ buying: [] });
  }
  emptySellArray() {
    this.setState({ selling: [] });
  }

  render() {
    return (
      <div className="App">
        <h1>CS385 Stocks and Shares</h1>
        <ul>
          {this.state.sArray.map((s) => (
            <li key={s.Symbol}>
              <b>{s.Symbol}</b>, <i>{s.Company}</i> ${s.Price} &nbsp;
              <button onClick={() => this.addToBuyArray(s.Symbol)}>Buy</button>
              &nbsp;
              <button onClick={() => this.addToSellArray(s.Symbol)}>
                Sell
              </button>
            </li>
          ))}
        </ul>

        <hr />
        <p>
          Total stock objects (BUY): {this.state.buying.length}
          <button onClick={this.emptyBuyArray}>Empty buys</button>
          <br />
          {this.state.buying.sort(this.comparePrice).map((s) => (
            <li key={s.Symbol}>
              {s.Symbol}, {s.Company}, ${s.Price}
            </li>
          ))}
          Total value of buys: ${this.state.buying.reduce(getTotal, 0)}
          <br />
          Total stock objects (SELL): {this.state.selling.length}
          <button onClick={this.emptySellArray}>Empty sells</button>
          <br />
          {this.state.selling.sort(this.comparePrice).map((s) => (
            <li key={s.Symbol}>
              {s.Symbol}, {s.Company}, ${s.Price}
            </li>
          ))}
          Total value of sells: ${this.state.selling.reduce(getTotal, 0)}
        </p>
      </div>
    ); // end of return statement
  } // end of render function
} // end of class

export default App;
